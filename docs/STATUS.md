# Status

Documentation snapshot: **2026-11-17**. Product version: **`0.8.0`**, a development build.
Both per-user installers are listed on the site's downloads page; they are **unsigned, certificate
pending**.

This page is written so that a reader can tell, in under a minute, what exists and what does not.
It is deliberately boring: no dates are promised, because none has been set.

## What exists

| Area | State | Basis |
| --- | --- | --- |
| SCL loading | Loads an ICD/SCD/CID/IID and the communication relationships between IEDs | Exercised end to end by the desktop app's tests on the committed sample |
| Captured-traffic analysis | Captured GOOSE traffic is analysed against that SCL and connected to the diagnostic engine; one independent SV publisher is pinned by tests | Analysis path tested on a four-frame synthetic capture; the SV witness proves one stream's fields, not conformance |
| Diagnostics | Produces findings with evidence: the frame, the field and the matching SCL object | Engine tested; eleven wire-format defects found by cross-implementation comparison and fixed |
| Reporting | One HTML report in English, Persian or Turkish plus `issues.json` (schema 1) and `testcases.json`, including the checks that did not run and a **ranked list of candidate changes**; from 0.8.0 a print-ready A4 stylesheet | Exported from the sample in all three languages from inside the package |
| Review package | `gridsight-cli review` writes `report.html`, `changes.md`, `changes.patch`, `procedure.md`, `package.md` and `manifest.json`, plus `verification.html` with a second capture; two runs on the same inputs are byte-identical except the manifest's assembly time | Seven files on the sample in all three languages; the reproducibility test diffs two runs |
| Batch review | `review --all` writes one package per `<name>.scd` + `<name>.pcap` pair and an index; a capture that does not name its SCL is refused with the reason | Three pairs produced three packages and one index; the mismatched pair produced none |
| Scenario replay | A synthetic network is replayed from files with declared changes; nine scenarios, deterministic, headless, **inside the package** | `gridsight-cli.bat scenario --all samples\scenarios` from the extracted zip; `normal` and `boundary` assert **no findings**; 9/9 in under a second |
| Desktop shell | Opens, loads the sample, monitors the capture and shows the two findings | End-to-end test plus a clean `git archive` build; the package opens on Windows 10/11 x64 |
| Command line | A headless front end for diagnose, report, scenario replay, diff, verify and review | 86.92% line coverage; the scenario matrix and the review package run there |
| Packaging | 0.8.0 per-user installers for the light and field builds, and the same two as ZIPs, each with its own Java runtime, `START-HERE.html`, `QUICKSTART.md`, `TROUBLESHOOTING.md`, Apache-2.0 `LICENSE`/`NOTICE` | The artefact check passes on each file; each installer was installed, started, checked for version and flavour, and uninstalled |
| Platform | Windows 10/11 x64 for these artefacts; no dongle, no telemetry, no cloud dependency | Built artefacts and a green build |

Two honesty notes on that table: "exists" means **built and tested**, not **shipped**; and no row
has been validated against real substation equipment. The one exception in the tests is a live
session against one named implementation over loopback, not a device.

## Measured on this build

**0.8.0, measured 17 November 2026:** **1073 tests, 0 failed, 1 skipped** (the opt-in live-peer
test); **79.12% aggregate line coverage (15,010 / 18,971)**, 90.91% diagnostics, 92.06% MMS,
73.83% UI. Test and coverage floors are enforced per module; none was lowered. The artefacts are
`GridSight-0.8.0-light-setup.exe`, `GridSight-0.8.0-field-setup.exe` and the same two builds as
ZIPs; both installers are unsigned.

## What does not exist

- **No signed installer.** Both 0.8.0 installers are published as **unsigned, certificate pending**;
  no update channel exists.
- **No physical device has been tested.** One implementation, **libiec61850 v1.6.2.1**, has been
  exercised end to end over loopback; no other implementation and no device â€” see
  [`WHAT-IS-PROVEN.md`](WHAT-IS-PROVEN.md).
- **No multi-vendor evidence.** SEL, ABB, Siemens and GE are untested; no compatibility claim is made.
- **No MMS capture or monitoring.** Out of scope by decision, not by oversight.
- **No certification, conformance or accreditation.** GridSight is not a laboratory and issues no
  certificate.
- **No live substation simulation.** Scenario replay replays files with declared changes; it cannot
  advance state over time or control anything.
- **No scheduling or automation of report delivery.**
- **No multi-user, server, or cloud mode.**
- **No Persian or Turkish interface.** The report and the review package are localised; the
  interface stays English.

## Release gates

The order is deliberate: the interface does not get more complete until interoperability is proven.

| Gate | Meaning | State |
| --- | --- | --- |
| G0 | Repository reconciled: clean tree, green build, test count recorded | **Closed** |
| G1 | Interoperability proven against an independent implementation | **Closed 14 Nov 2026** â€” a live session against libiec61850 v1.6.2.1: association, name lists, four reads, release. One peer, one model, five services |
| G2 | The interface runs end to end against a real SCD | **Closed 15 Nov 2026** â€” on the committed synthetic sample (`samples/`): open the SCD, browse the structure, run diagnostics, read the results list; two error paths assert user-facing text, and a clean `git archive` export builds and launches |
| G3 | One SCD produces one exported report with an issue list and test-case pack | **Closed 15 Nov 2026** â€” report, JSON issue list, test-case pack and the suggested-change table from the sample; a nine-scenario replay matrix, deterministic and headless under a minute |
| G4 | Package and licence: licence file, tagged version, installable artefact | **Closed 15 Nov 2026** â€” Apache-2.0, tags `0.2.0` and `0.2.1`, a Windows x64 app image with a bundled runtime, and a guide the owner followed to the sample's two findings |
| G5 | A ten-minute reproducible demo on a synthetic SCD, with no client data | **In progress** â€” the sample, the report and the ten-minute script exist; the second-person run remains |
| G6 | One external user runs it and pays â€” service or seat | **Ahead** |
| G7 | Public release: release notes, known-limits page, support route | **In progress** â€” the three documents exist; the site/docs sync and publication remain |

No date is attached to any open gate. A date would be a promise this project is not in a position
to keep.

## Support

Written questions to **hello@rezafarsi.com** are answered within **two working days**. There is no
phone support, no on-site work, no 24/7 cover and no service-level agreement under this development
build. See [`../SUPPORT.md`](../SUPPORT.md).

## What would change this page

A second person completing the demo, a published release, or a paid user would each move a specific
line above. A signed installer and additional interoperability peers would change the production
readiness statement, not just a gate. Until then, this page and the product page are the current
statement.
