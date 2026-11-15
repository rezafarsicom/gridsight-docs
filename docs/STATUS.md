# Status

Documentation snapshot: **2026-11-14**. Product version: **`0.1.0`**, unreleased.

This page is written so that a reader can tell, in under a minute, what exists
and what does not. It is deliberately boring: no dates are promised, because
none has been set.

## What exists

| Area | State | Basis |
| --- | --- | --- |
| SCL loading | Loads an SCL export and the communication relationships between IEDs | Module built; exercised by the desktop application's tests |
| Captured-traffic analysis | Captured GOOSE/SV traffic is analysed and connected to the diagnostic engine | Analysis path tested; no third-party SV capture exercised yet |
| Diagnostics | Produces findings from the analysis; the intent is that each one carries its evidence | Engine module tested (83% line coverage) |
| Virtual IEDs | Built from the same SCL, with start, stop and scenario control in the simulation screen | Desktop tests cover the flow; the default setup is local simulation, not a physical network |
| Reporting | An HTML report is requested from the current analysis; existing report files can be exported | Desktop tests cover report handling; generation stays disabled until traffic has been analysed |
| Desktop shell | Compiles and runs its own UI test suite | 260 tests in the UI module |
| Command line | A CLI module exists alongside the desktop interface | 4 tests |
| Platform | Kotlin Multiplatform, Windows and Linux targets; no dongle, no telemetry, no cloud dependency | Build configuration and a green build |

Two honesty notes on that table: "exists" means **built and tested**, not
**shipped**; and no row here has been validated against real substation
equipment.

## What does not exist

- **No public release, installer, binary, or purchasable licence.**
- **No live session with a physical device (one implementation, libiec61850 v1.6.2.1, has been exercised end to end and nothing else)** — see [`WHAT-IS-PROVEN.md`](WHAT-IS-PROVEN.md).
- **No MMS capture or monitoring.** Out of scope by decision, not by oversight.
- **No vendor-specific support or compatibility claim.**
- **No scheduling or automation of report delivery.**
- **No multi-user, server, or cloud mode.**

## Release gates

The order is deliberate: the interface does not get more complete until
interoperability is proven.

| Gate | Meaning | State |
| --- | --- | --- |
| G0 | Repository reconciled: clean tree, green build, test count recorded | **Closed** |
| G1 | Interoperability proven against an independent implementation | **Closed 14 Nov 2026** — a live session against libiec61850 v1.6.2.1: association, name lists, four reads, release. One peer, one model, five services |
| G2 | The interface runs end to end against a real SCD | **Closed 15 Nov 2026** — on the committed synthetic sample (`samples/`): open the SCD, browse the structure, run diagnostics, read the results list; two error paths assert user-facing text, and a clean `git archive` export builds and launches |
| G3 | One SCD produces one exported report with an issue list and test-case pack | **Closed 15 Nov 2026** — report, JSON issue list, test-case pack and the suggested-change table from the sample; a nine-scenario replay matrix, deterministic and headless under a minute |
| G4 | Package and licence: licence file, tagged version, installable artefact | **In progress** — Apache-2.0 mirrored, a 0.2.0 Windows app-image with a bundled runtime; no MSI this release |
| G5 | A ten-minute reproducible demo on a synthetic SCD, with no client data | Ahead |
| G6 | One external user runs it and pays — service or seat | Ahead |
| G7 | Public release: release notes, known-limits page, support route | Ahead |

No date is attached to any open gate. A date would be a promise this project is
not in a position to keep.

## What would change this page

A published capture from a named implementation, a live session, or a paid user
would each move a specific line above. Until then, this page and the product
page are the current statement.
