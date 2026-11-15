# Status

Documentation snapshot: **2026-11-15**. Product version: **`0.2.1`**, a development build.
It is **not published for download**.

This page is written so that a reader can tell, in under a minute, what exists and what does not.
It is deliberately boring: no dates are promised, because none has been set.

## What exists

| Area | State | Basis |
| --- | --- | --- |
| SCL loading | Loads an ICD/SCD/CID/IID and the communication relationships between IEDs | Exercised end to end by the desktop app's tests on the committed sample |
| Captured-traffic analysis | Captured GOOSE traffic is analysed against that SCL and connected to the diagnostic engine | Analysis path tested on a four-frame synthetic capture; no third-party SV capture exercised |
| Diagnostics | Produces findings with evidence: the frame, the field and the matching SCL object | Engine tested; eleven wire-format defects found by cross-implementation comparison and fixed |
| Reporting | One HTML report plus `issues.json` and `testcases.json`, including the checks that did not run | Exported from the sample and opened without the app |
| Scenario replay | A synthetic network is replayed from files with declared changes; nine scenarios, deterministic, headless | `gridsight-cli scenario`; `normal` and `boundary` assert **no findings**; matrix well under a minute |
| Desktop shell | Opens, loads the sample, monitors the capture and shows the two findings | End-to-end test plus a clean `git archive` build; the 0.2.1 package opens on Windows 10/11 x64 |
| Command line | A headless front end for diagnose, report and scenario replay | 81.96% line coverage; the scenario matrix runs there |
| Packaging | 0.2.1 app image with its own Java runtime, `START-HERE.html`, Apache-2.0 `LICENSE`/`NOTICE` | The owner followed the guide from a double-click to exactly the two documented findings |
| Platform | Windows 10/11 x64 for this artefact; no dongle, no telemetry, no cloud dependency | Built artefact and a green build |

Two honesty notes on that table: "exists" means **built and tested**, not **shipped**; and no row
has been validated against real substation equipment. The one exception in the tests is a live
session against one named implementation over loopback, not a device.

## What does not exist

- **No public release or download.** A 0.2.1 artefact exists for evaluation and the owner's checks;
  it is not published, and there is no purchase path.
- **No price and no commercial licence terms.** The code is Apache-2.0; the commercial terms are a
  draft and are not in force.
- **No physical device has been tested.** One implementation, **libiec61850 v1.6.2.1**, has been
  exercised end to end over loopback; no other implementation and no device — see
  [`WHAT-IS-PROVEN.md`](WHAT-IS-PROVEN.md).
- **No multi-vendor evidence.** SEL, ABB, Siemens and GE are untested; no compatibility claim is made.
- **No MMS capture or monitoring.** Out of scope by decision, not by oversight.
- **No certification, conformance or accreditation.** GridSight is not a laboratory and issues no
  certificate.
- **No live substation simulation.** Scenario replay replays files with declared changes; it cannot
  advance state over time or control anything.
- **No scheduling or automation of report delivery.**
- **No multi-user, server, or cloud mode.**
- **No signed installer, MSI or update channel.**

## Release gates

The order is deliberate: the interface does not get more complete until interoperability is proven.

| Gate | Meaning | State |
| --- | --- | --- |
| G0 | Repository reconciled: clean tree, green build, test count recorded | **Closed** |
| G1 | Interoperability proven against an independent implementation | **Closed 14 Nov 2026** — a live session against libiec61850 v1.6.2.1: association, name lists, four reads, release. One peer, one model, five services |
| G2 | The interface runs end to end against a real SCD | **Closed 15 Nov 2026** — on the committed synthetic sample (`samples/`): open the SCD, browse the structure, run diagnostics, read the results list; two error paths assert user-facing text, and a clean `git archive` export builds and launches |
| G3 | One SCD produces one exported report with an issue list and test-case pack | **Closed 15 Nov 2026** — report, JSON issue list, test-case pack and the suggested-change table from the sample; a nine-scenario replay matrix, deterministic and headless under a minute |
| G4 | Package and licence: licence file, tagged version, installable artefact | **Closed 15 Nov 2026** — Apache-2.0, tags `0.2.0` and `0.2.1`, a Windows x64 app image with a bundled runtime, and a guide the owner followed to the sample's two findings |
| G5 | A ten-minute reproducible demo on a synthetic SCD, with no client data | **In progress** — the sample, the report and the ten-minute script exist; the second-person run remains |
| G6 | One external user runs it and pays — service or seat | **Ahead** |
| G7 | Public release: release notes, known-limits page, support route | **In progress** — the three documents exist; the site/docs sync and publication remain |

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
