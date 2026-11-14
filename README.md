# GridSight IEC 61850 — public documentation

**GridSight is a desktop, offline tool for IEC 61850 diagnostics and interoperability testing in digital substations.** It reads a substation configuration file (SCL), analyses captured GOOSE and SV traffic, builds virtual IEDs from the same SCL, and writes a report from the analysis.

> **Status: in development. There is no public release, no installer, no licence for a binary, and no download.** This repository contains documentation only — not the source code. Nothing here is a promise of a ship date.

**Which GridSight this is:** the IEC 61850 project by Reza Farsi. Other products in the
energy sector use a similar name and are unrelated to this one — see
[`TRADEMARK.md`](TRADEMARK.md). In your own writing, please qualify it the same way:
*GridSight IEC 61850*.

The product page, which is the source of truth for status and limits:

- English — <https://rezafarsi.com/en/gridsight/>
- Persian — <https://rezafarsi.com/fa/gridsight/>

## The workflow it is built around

| Step | What the tool is for |
| --- | --- |
| 1. Load the SCL | Open an ICD, SCD, CID or IID and read the communication relationships between IEDs before any physical connection is made. |
| 2. Work with captured traffic | Analyse captured GOOSE and SV traffic against that same configuration, inside the diagnostic engine. |
| 3. Look at the finding, not just the alarm | The intent is that each finding is tied to its evidence: the frame, the field, and the matching place in SCL. |
| 4. Hand over a report | Produce an HTML report from the current analysis: an issue list and a test-case pack that can be given to an operator. |

This is the intended loop, not a claim that every step is finished — per-step state is in [`docs/STATUS.md`](docs/STATUS.md).

Scope is deliberately narrow. **MMS capture and monitoring are out of scope.** There is no telemetry, no dongle, no hardware, and no cloud dependency: it runs on the engineer's laptop without internet.

## What is measured, and what is not proven

Two different things get confused in this market, so they are kept apart here.

**Measured** (29 October 2026, on the interoperability working branch, JDK 17, Gradle 9.3.1):

- 804 tests, 0 failed, 0 skipped.
- 73.61% aggregate line coverage; 92.47% in the MMS module.
- Five wire-format defects found and fixed only because the tests were pinned to bytes captured from a different implementation.

**Not proven:**

- **No live session has ever run between GridSight and real equipment.** No device has accepted a GridSight request. What exists is decoding evidence against published third-party captures.
- **The response direction of those captures is not usable as conformant reference data** and has not been asserted separately.
- **No vendor compatibility claim is made.** No device from any manufacturer has been tested, and none is named here.
- The test captures do not state which product or version produced them.

Details, with the exact conditions under which each gap would close: [`docs/WHAT-IS-PROVEN.md`](docs/WHAT-IS-PROVEN.md) and [`docs/KNOWN-LIMITATIONS.md`](docs/KNOWN-LIMITATIONS.md).

## Why this repository exists

Because a diagnostic tool that hides its limits cannot be trusted in an engineering decision. The honest position is simple: the analysis pipeline is real and tested, interoperability is being proven against third-party evidence, and a release is gated on work that has not happened yet.

This is also why the source tree is not here. What is published is the part that can be published truthfully today: scope, status, test method, known limitations, and a glossary that makes the vocabulary checkable.

## Read next

| Document | What it answers |
| --- | --- |
| [`docs/STATUS.md`](docs/STATUS.md) | What is done, what is open, and the order in which it closes |
| [`docs/WHAT-IS-PROVEN.md`](docs/WHAT-IS-PROVEN.md) | The interoperability evidence, and its exact limits |
| [`docs/HOW-WE-TEST.md`](docs/HOW-WE-TEST.md) | Why symmetric tests prove nothing, and what replaced them |
| [`docs/KNOWN-LIMITATIONS.md`](docs/KNOWN-LIMITATIONS.md) | Every open defect and out-of-scope area that affects a user |
| [`docs/GLOSSARY.md`](docs/GLOSSARY.md) | SCL, GOOSE, SV, IED, APPID, 9-2LE — in one line each |
| [`docs/FAQ.md`](docs/FAQ.md) | The questions buyers actually ask, answered without marketing |
| [`examples/`](examples/README.md) | A synthetic SCL fragment used to explain the shape of a substation file |

## How to use this repository

- **Reading:** no build step. Any Markdown viewer.
- **Checking links before you send a change:** `node scripts/check-links.mjs` (Node 20.11+, no dependencies).
- **Reporting a problem:** open an issue. Do not attach a customer SCD, credentials, or anything under an NDA — see [`CONTRIBUTING.md`](CONTRIBUTING.md) and [`SECURITY.md`](SECURITY.md).

## Licence and name

Content in this repository is licensed under the **Apache License 2.0** — see [`LICENSE`](LICENSE) and [`NOTICE`](NOTICE).

The licence grants rights to this documentation. It does **not** grant the GridSight name or logo; see [`TRADEMARK.md`](TRADEMARK.md).

**Independence:** GridSight is an independent project by Reza Farsi. It is not affiliated with, endorsed by, or connected to any other product or company that uses a similar name.

## Who maintains this

Reza Farsi — product design and software engineering, Shiraz, Iran. Work is delivered directly, with AI agents supporting execution and human review on every claim that reaches a page.

Maintained as documentation for an in-development product. Documentation version: 2026-11-14.
