# How the project tests itself

Most protocol test suites are symmetrical: the encoder produces bytes, the
decoder reads them back, and the test passes. That structure cannot find a
mistake shared by both sides, and in this project that is not a theoretical
worry — two critical wire-format defects survived it.

## The problem with symmetric tests

If GridSight writes `invokeID` as `[0] IMPLICIT` and reads it as `[0] IMPLICIT`,
the round trip is clean and the code is wrong. A real IED would simply not
answer, and the engineer would see "no response" with no explanation. This is
how a diagnostic tool ends up blaming the substation for its own bug.

## What replaced it

Every protocol test that matters is now pinned to **bytes captured from a
different implementation**, vendored as fixtures with their provenance and a
hash recorded. The test asserts on those bytes, not on GridSight's output.

Two test classes carry the current evidence:

| Class | Focus |
| --- | --- |
| `IsoStackConformanceTest` | ISO 8327/8823/8650 codecs against captured bytes, plus branch shapes no capture exercises |
| `CrossImplementationConformanceTest` | Third-party GOOSE, SV-adjacent and MMS captures decoded end to end |

A composed conversation test links association → GetNameList → Read → Conclude
across two captures from the same peer. Every byte in it is third-party; the
sequence is not one recorded TCP session, and the test says so.

## Measured state

Measured **15 November 2026** on the working branch, after the interface gate closed with
libiec61850 v1.6.2.1 — OpenJDK 17.0.16 LTS, Gradle 9.3.1, Kotlin 2.2.21:

| Metric | Value |
| --- | --- |
| Tests | **851**, 0 failed, 0 errors, **1 skipped** — the opt-in live-peer test, which runs with GRIDSIGHT_LIVE_PEER=1 |
| Aggregate line coverage | **75.23%** |
| MMS module line coverage | **92.06%** |
| gridsight-ui line coverage | **73.32%** |
| Per-module coverage floors | Enforced by the build; lowering a floor is not permitted |
| Clean-checkout build | Verified separately, so the committed tree needs nothing local |

Coverage is a floor, not a goal. A well-covered decoder that answers the wrong
question is still wrong, which is why the cross-implementation tests exist
alongside it.

## What is deliberately not tested

- **Live equipment.** No physical device is connected to the test suite. The one
  live test that exists talks to **libiec61850 v1.6.2.1** built from source and run
  as a separate process — one peer, one model (simpleIO_direct_control.icd), five
  services. It is opt-in (GRIDSIGHT_LIVE_PEER=1) because it needs that peer
  running; its bytes are committed so the response path is asserted on every build.
- **The response path as conformant data — for the old captures.** Their
  server-to-client frames are malformed, so asserting on them would encode a bug;
  they are pinned as a *rejection* test instead. The response path is asserted
  against the live peer's bytes, which are conformant by construction.
- **MMS capture.** Out of scope; see [`KNOWN-LIMITATIONS.md`](KNOWN-LIMITATIONS.md).

## The argument in full

The method above is written out as a standalone note — what a capture can prove, what it
cannot, the five fields to record with every capture, and the five defects it exposed here:

<https://rezafarsi.com/en/articles/goose-capture-evidence/> (English)
<https://rezafarsi.com/fa/articles/goose-capture-evidence/> (Persian)

## Reproducing the numbers

The suite runs from the source repository, which is not public. This page
records the numbers and the exact environment so they can be checked later
against a published build, rather than asking anyone to trust a figure.
