# Release notes — GridSight 0.5.0

**16 November 2026 · Windows 10/11 x64 · development build**

GridSight reads a substation configuration file (SCL), checks captured GOOSE and SV traffic against it,
writes a report with evidence for every finding, **ranks the concrete changes by a published rule**, replays
a scenario matrix inside the package, and shows what changed between two captures.

It is a development build: unsigned, no updater, no public download. Nothing here is a certification, a
conformance claim or evidence against any manufacturer's device. Prices and commercial terms are published
separately and are not part of this package.

## What changed since 0.4.0

1. **The report ranks the candidate changes.** The rule is published, with its weights, in the report
   itself: `score = 3n + 2s + 2r - b`, where `n` is findings closed, `s` the highest severity, `r`
   reversibility and `b` the number of affected objects. Every row prints the four inputs, and the
   finding-to-candidate mapping is shown so the arithmetic can be checked. It does not estimate cost and
   does not claim a change is sufficient to energise.
2. **The report's provenance line carries the real version.** It had printed `0.1.0-SNAPSHOT` since 0.2.x
   because the string was hardcoded. It now comes from the build, and a test fails if a literal returns.
3. **JSON schema version 1, with a compatibility promise.** `schemaVersion` is in the payload, the report
   declares the tool version, and `docs/REPORT-COMPATIBILITY.md` states what is guaranteed (field names,
   meaning, ordering of `issues[]`) and what may change (labels, section order, the ranked block).
4. **Capture diff refinements.** Multiple GOOSE streams in one capture are matched by `goID`/`APPID` rather
   than by order; a printed clock-drift tolerance; a renamed object is reported as a rename, not as a delete
   plus an insert. A 50,000-frame capture opens without freezing, with the measured time printed.
5. **Interface polish.** Every capture and diagnose action is reachable by Tab, dialogs dismiss on Enter or
   Escape, and a long load shows a progress bar with a working Cancel. 1024×768 is the supported minimum,
   measured.
6. **The buyer's documents ship inside the zip:** `QUICKSTART.md` (the five-minute path),
   `TROUBLESHOOTING.md` and a rendered `TROUBLESHOOTING.html`, linked from `START-HERE.html`.

## Numbers, measured on the packaged build

| Measure | Value |
| --- | --- |
| Tests | **976**, 0 failed, 1 skipped (the opt-in live-peer test) |
| Coverage | **76.75%** aggregate · 92.06% in MMS |
| Scenario matrix | **9 of 9** from the extracted package, no JDK on the machine |
| Report languages | English, Persian (right-to-left, embedded font), Turkish |
| Package | `GridSight-0.5.0-windows-x64.zip`, 103,575,011 bytes, SHA-256 `2A8D9807B6418CC5F9755FA22E65B2B7CC07E7C65F3D599DDE243FECDE42F7B1` |

## What still is not true

- One MMS peer (libiec61850 v1.6.2.1) and no physical device. "Multi-vendor" is not claimed.
- No conformance, certification or accreditation.
- No MMS capture or monitoring, and no live simulation of a substation.
- The interface is English only; the report is the localised part.