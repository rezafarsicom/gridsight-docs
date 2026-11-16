# 24 · Report compatibility — what a consumer may rely on

Written 16 November 2026, when report schema v1 was declared. This is the promise behind the three
files a report run writes: `report.html`, `issues.json` and `testcases.json`. It also records how the
golden fixtures are kept from churning on every source change.

Related: `GS-TEST-002` (issue-list schema), `GS-TEST-003` (scenario format), `GS-TEST-004`
(test-case pack), `GS-TEST-005` (suggested changes), `21-LOCALIZATION.md` (what translation may and
may not touch), `ReportWriter` (the producer).

---

## 1 · Version identifiers

A report carries its version in three places, and they answer two different questions.

| Artefact | Where | Meaning |
|---|---|---|
| `issues.json`, `testcases.json` | top-level `"schemaVersion": "1.0"` | **Schema v1.** This is the compatibility signal. `"1.0"` is schema v1; there is no separate integer form. |
| `issues.json`, `testcases.json` | `tool.version` | The **report version** — the build that wrote the file, e.g. `"0.4.0"`. Informational; it is not a schema signal. |
| `report.html` | `<meta name="report-version" content="0.4.0">` and the visible provenance line | The **report version**, for a person and for a quick machine check. |
| `report.html` | `<meta name="report-lang" content="fa">` | The language that produced the prose (`en` is recorded by `<html lang="en">`). |

The report version is generated from `build.gradle.kts` into `GridSightBuildInfo` and is never a
hand-typed string. A version bump changes `tool.version` and `report-version` only; it does not
change the schema and does not require a fixture regeneration.

## 2 · How a consumer detects a version

For automation, read `issues.json`:

1. Parse the top-level `schemaVersion`. If it is missing, the file is not a GridSight v1 issue list.
2. Accept `"1.0"`. A future `"2.0"` is a breaking change: stop, rather than guessing at the fields.
3. Within v1, ignore fields you do not know. New fields may appear; none is removed or renamed.
4. Treat `tool.version` as provenance only. Do not branch on it for field availability.

For a human-facing check of which build wrote an HTML file, read `<meta name="report-version">`.
The HTML structure is not the machine contract; a script that needs to read findings should use
`issues.json`, whose field names and ordering are guaranteed by §3.

`testcases.json` uses the same `schemaVersion` and `tool.version` and is versioned with
`issues.json`.

## 3 · Guaranteed in schema v1

These hold for every file a v1 writer produces, in every language:

- **Field names, types and meanings** as documented in `GS-TEST-002` (issues) and `GS-TEST-004`
  (test cases). A field is never removed, renamed or given a different meaning inside v1.
- **Additive change only.** A new field may appear; a consumer must ignore what it does not know.
- **Null means "not recorded", never a default.** For example `sclFile: null` means no SCL was
  loaded, not that an SCL was assumed.
- **`issues[]` ordering.** In a plain report: severity descending, then event time descending. In
  the stable form: `type`, then `object`, then `reference`, then `description`. The order is
  deterministic and is what makes two runs comparable.
- **One object per finding** in `issues[]`, and one case per finding in `cases[]`.
- **Language does not change the machine files.** `--lang` localises `report.html` only. Field
  names and enum values in `issues.json` and `testcases.json` are the API and stay English.
- **Identifiers are data.** SCL references, IED and data-set names, protocol field names, hex
  values, file names, hashes and version numbers are identical in all three languages.
- **The ranked-changes arithmetic is published.** The rule line, the four inputs (`n`, `s`, `b`,
  `r`), the score, the complete ranked list and the tie explanation are printed; no probability or
  confidence number is produced. The mapping from finding to candidate is visible.
- **The checks section is honest.** `checks.notRun` names every implemented rule this run did not
  exercise, with a reason. An absent finding is not silently "clean".
- **Determinism.** The same inputs produce the same document, byte for byte, except the values
  documented as run-specific (`generatedAt`, `reportId`, per-finding `id` and `time`).

## 4 · What may change without a schema bump

The following are presentation or product evolution, not API breaks:

- **Labels and prose.** Headings, severity words, suggested-change sentences, check reasons and
  limitation text may be reworded or re-translated. Only the HTML is translated; JSON enum values
  are not.
- **Section order and presence in `report.html`.** A new section may be added, moved or omitted
  (for example the diff section appears only on a diff run). Do not scrape HTML by position.
- **The ranked-changes block.** Its heading, columns, row set and tie sentences may change between
  report versions as the candidate model improves. A consumer that needs ranking data must read it
  from the HTML deliberately, or ask for a future machine block; it must not assume the table shape.
  `issues[]` remains the stable list of findings.
- **The `changes[]` block** is versioned separately by `changesSchemaVersion`; it may evolve ahead
  of report schema v2.
- **Health scores and summaries.** The score is a product judgement and may be tuned; the field
  remains present with the same type.
- **The report version itself** (`tool.version`, `report-version`), on every release.

## 5 · When a breaking change is required

Removing or renaming a guaranteed field, changing its meaning, changing the ordering rule of
`issues[]`, or changing a JSON enum's spelling is a **new schema version** — `"2.0"` — and a new
compatibility note. A new schema version is announced in the release notes; the old writer is not
silently changed in place.

## 6 · The golden-fixture rule

A fixture exists to catch an unintended change, not to force a regeneration on every commit. The
rule is:

1. **Assert shape and identifiers on every build.** `ReportGoldenTest` asserts that every language
   has the same sections, the same number of rows in each, and the same identifier set. This is the
   regression signal and does not depend on a stored byte stream.
2. **Treat the version line as data.** The build version is replaced with `{{BUILD_VERSION}}` before
   the byte comparison and inside the committed fixtures. `ReportProvenanceTest` separately asserts
   that `report-version` equals the build version. A version bump therefore changes no fixture.
3. **Keep one byte-identical fixture per released artefact, not per source change.** The three
   committed files — `report-en.html`, `report-fa.html`, `report-tr.html` — are the record of the
   report shape in an artefact. A session that deliberately changes that shape (this one added the
   `report-version` meta) regenerates the set once; a version bump, a label change or an unrelated
   commit does not. Regenerate them after the report shape is final, before the artefact is built.

Regenerate all three at a release:

```powershell
$env:GRIDSIGHT_WRITE_GOLDEN = '1'
.\gradlew.bat :gridsight-diagnostics:jvmTest --tests "*ReportGoldenTest*"
Remove-Item Env:\GRIDSIGHT_WRITE_GOLDEN
```

Then inspect the diff: only presentational changes should appear, and the version placeholders must
stay `{{BUILD_VERSION}}`. A fixture diff caused by a version bump alone is a failure of this rule,
not an expected update.

## 7 · The tests that hold this promise

| Claim | Test |
|---|---|
| The report prints the build version, not a hardcoded one | `ReportProvenanceTest.theDefaultProvenanceIsTheVersionTheBuildDeclares`, `theHtmlRecordsTheBuildVersionInTheMetaAndTheVisibleLine` |
| The old snapshot string cannot return | `ReportProvenanceTest.noKotlinSourceFileCarriesTheOldSnapshotVersion`, `theProvenanceDefaultIsNotAHandTypedString` |
| The JSON carries schema v1 and the build version | `ReportProvenanceTest.theIssueListRecordsTheBuildVersion`, `ReportWriterTest.theIssueListIsJsonWithOneObjectPerFinding` |
| Every language has the same shape and identifiers | `ReportGoldenTest.everyLanguageHasTheSameShape`, `everyLanguageCarriesTheSameIdentifiers` |
| A released-artefact fixture is byte-identical, version excepted | `ReportGoldenTest.theThreeLanguageReportsMatchOneReleasedArtefact` |
| The fixtures hold a placeholder, not a pinned version | `ReportGoldenTest.theFixturesHoldTheVersionPlaceholderRatherThanAPinnedNumber` |
| `issues[]` order and the ranked rule are deterministic | `ReportWriterTest`, `RemediationRankingTest`, `RankedChangesReportTest` |
