## 0.5.0 — 16 November 2026

- **Ranked candidate changes**, by a published rule (`3n + 2s + 2r - b`) whose inputs and arithmetic are
  printed in the report. Claim: "ranks the candidate changes by a published rule". "Finds the root cause"
  stays refused.
- **Build-derived provenance**: the report no longer prints `0.1.0-SNAPSHOT`; a test fails if a literal returns.
- **JSON schema 1** with a compatibility promise (`docs/REPORT-COMPATIBILITY.md`).
- **Diff refinements**: streams matched by `goID`/`APPID`, printed clock-drift tolerance, renames reported as
  renames, and a 50,000-frame path with the measured time.
- **Interface**: keyboard reachability, Enter/Escape dismissal, progress with Cancel, 1024×768 supported.
- **Packaged documents**: quickstart, troubleshooting and a rendered troubleshooting page inside the zip.
- **976 tests**, 0 failed, 1 skipped; 76.75% aggregate coverage, 92.06% in MMS.
- Package: 103,575,011 bytes, SHA-256 `2A8D9807B6418CC5F9755FA22E65B2B7CC07E7C65F3D599DDE243FECDE42F7B1`.
- Limits removed: the packaged build can run scenarios; the two cosmetic interface defects are fixed.
- Limits kept: one peer, no device, no MMS capture, no live simulation, English interface.
# Changelog

Documentation changes only. The product itself is unreleased, so this file does
not list product features as if they had shipped.

## 2026-11-17 — 0.8.0: the review package and the downloads page

- **`gridsight-cli review`** writes the seven files a service engagement delivers: `report.html`,
  `changes.md`, `changes.patch`, `procedure.md`, `package.md`, `manifest.json`, and
  `verification.html` when a second capture is supplied.
- **The package is reproducible.** Two runs on the same inputs are byte-identical except the
  manifest's `generatedAt`; a test runs the command twice into two folders and diffs every file.
- **The report is print-ready.** `@page` A4 rules, a page break before each section, a running
  header, and fixed-layout tables that wrap long identifiers. `review --print` opens it.
- **`review --all <folder>`** writes one package per `<name>.scd` + `<name>.pcap` pair plus an index,
  and refuses a pair whose capture does not name its SCL.
- **Measured:** 1073 tests, 0 failed, 1 skipped; 79.05% aggregate coverage (14,999 / 18,973),
  90.91% diagnostics, 92.06% MMS, 73.83% UI.
- **Artefacts:** light and field installers and ZIPs, both installers unsigned, certificate pending.
  New pages: `docs/RELEASE-NOTES-0.8.0.md`; `docs/STATUS.md` and `docs/KNOWN-LIMITATIONS.md`
  refreshed.

## 2026-11-16 — 0.7.0: the verification loop and the installable release

- **Combined remediation, measured:** the 1-, 2- and 3-edit combinations, bounded at 12 and printed,
  with prediction beside observation for the chosen patch; worse rows are printed.
- **`verify --before --after --changes`** reports resolved · still present · newly introduced in
  English, Persian and Turkish.
- **Per-user installers** for the light and field builds, with a manifest generated from the
  artefact and compared with the site fragment and `START-HERE.html`.
- **Signing fails loudly** without a certificate; both installers are unsigned, certificate pending.
- **Measured:** 1064 tests, 0 failed, 1 skipped; 78.58% aggregate coverage, 90.40% diagnostics,
  92.06% MMS, 73.83% UI.
- **Artefacts:** `GridSight-0.7.0-light-setup.exe` (103,967,232 bytes) and
  `GridSight-0.7.0-field-setup.exe` (103,968,768 bytes), each installed, started and uninstalled;
  the same two builds as ZIPs. New pages: `docs/RELEASE-NOTES-0.7.0.md`.

## 2026-11-15 (session 7) — G4 closed; G5 script and G7 documents

- **G4 is closed on 0.2.1**: Apache-2.0, tags `0.2.0` and `0.2.1`, a Windows x64 app image with
  its own runtime, and `START-HERE.html` generated from `QUICKSTART.md`. The owner followed it and
  reached exactly the sample's two findings. The artefact is **not published for download**.
- **Release notes, a rewritten known-limits page and a support route** now exist:
  [release notes](docs/RELEASE-NOTES-0.2.1.md), [known limits](docs/KNOWN-LIMITATIONS.md), and
  [support](SUPPORT.md) — **hello@rezafarsi.com, answered within two working days**, email only.
- **Numbers re-measured on `main` at 0.2.1:** 900 tests (1 skipped), **75.99%** aggregate coverage,
  **92.06%** in MMS, **73.49%** in the UI. No other published number changed.
- `WHAT-IS-PROVEN.md` corrected: the live session **has** run, the response path **is** asserted
  against the peer, and there are **eleven** wire defects, not five.
- `STATUS.md` corrected: product `0.2.1`; G4 closed; G5 and G7 in progress; G6 ahead.
- Two cosmetic 0.2.1 interface defects are disclosed on the limits page and not yet fixed:
  unreadable Anomaly Timeline axis labels, and a status-bar memory figure about 1024× too large.
- **No price and no commercial licence term was published.** There is no download and no purchase
  path.

## 2026-11-15 (later) — G3 closed: the scenario run, the change, the test cases

- A scenario run replays a synthetic network with declared changes and reports **exactly** the
  findings that state must produce: nine scenarios, deterministic, headless, under a minute.
- The report gains a test-case pack and a per-class suggested change, and still states which checks
  did **not** run.
- **900 tests** (1 skipped), **75.95%** aggregate coverage, **92.06%** in MMS.
- G3 is **closed**; G4 is in progress — licence, a 0.2.0 artefact and a quickstart.

The harness is a replay, not a live simulation. Nothing here switches or controls a network.
## 2026-11-15 — G2 closed on a committed sample

The interface gate closed on evidence, not on a screenshot of a hand-built state:

- samples/ added: one SCD, one four-frame capture, and a README naming the two planted
  defects. A test drives the whole path over them on every build.
- Two error paths now say what went wrong instead of showing a stack trace.
- The app builds and launches from a clean git archive export.
- The report exports to a file a reader can open, with a JSON issue list and a
  statement of the checks that did not run.
- **851 tests** (1 skipped), **75.23%** aggregate coverage, **73.42%** in the UI module.
- G2 is **closed**; G3 is in progress — the scenario harness and the suggested-change
  table are not done and are not claimed.
## 2026-11-14 (later the same day) — G1 closed, numbers refreshed

The live session with libiec61850 v1.6.2.1 passed and the defects it exposed were
fixed, so the interoperability section stopped being a list of unknowns:

- **836 tests** (0 failed, 1 skipped — the opt-in live-peer test), **74.65%**
  aggregate coverage, **92.06%** in MMS, **73.32%** in the UI module.
- **Eleven** wire-format defects found and fixed; six against third-party
  captures, five against the live peer.
- docs/WHAT-IS-PROVEN.md, docs/KNOWN-LIMITATIONS.md, docs/STATUS.md and
  README.md now state exactly one proven peer (libiec61850 v1.6.2.1, one model,
  five services) and continue to refuse any device or vendor claim.
- G1 is **closed** on that evidence; G2 remains in progress.
## Unreleased — documentation snapshot 2026-11-14

First public documentation set for an in-development product.

- `README.md` — what the tool is for, what is measured, what is not proven, and
  where the source of truth lives.
- `docs/STATUS.md` — the eight release gates, each with its current state and no
  promised date.
- `docs/WHAT-IS-PROVEN.md` — the interoperability evidence: eight stages that
  decode from third-party captures, and the four that do not.
- `docs/HOW-WE-TEST.md` — why symmetric tests cannot find a shared encoder/decoder
  defect, and what replaced them (804 tests, 73.61% line coverage, 92.47% in the
  MMS module, measured 29 October 2026).
- `docs/KNOWN-LIMITATIONS.md` — every open defect and out-of-scope area,
  including the one encoder defect that is not fixed and why.
- `docs/GLOSSARY.md` — the vocabulary, one line per term.
- `docs/FAQ.md` — the buyer questions, answered without marketing.
- `examples/scl-fragment.xml` — a synthetic teaching fragment, explicitly not a
  valid SCD.
- `scripts/check-links.mjs` — dependency-free relative-link check for
  contributors.
- Licence: Apache-2.0 with a NOTICE, a trademark line, and an independence note.
