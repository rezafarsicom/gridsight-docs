# What is proven, and what is not

The core promise of a diagnostic tool is that it knows what it is looking at. For GridSight the
honest measurement date is **14 November 2026** — the day the live session with libiec61850
v1.6.2.1 passed. This page states exactly what that measurement supports, and no more.

## Short version

| Question | Answer today |
| --- | --- |
| Does GridSight read a complete MMS conversation written by another implementation? | **Yes** — the association, name lists, reads and release are decoded from published third-party captures |
| Has a real device ever accepted a GridSight request? | **Not a physical device.** One implementation has: **libiec61850 v1.6.2.1**, built from source, run on loopback, accepting association, three name lists, four reads, Conclude and ACSE release |
| Can GridSight claim interoperability with a named product? | **One peer only** — libiec61850 v1.6.2.1; no other implementation, device or model is claimed |
| Is the response direction covered? | **Yes, against the live peer** — the AARE, name lists, four read responses, Conclude and release are asserted from the peer's own bytes. The old captures' malformed frames are pinned as a rejection test |
| Is SV covered by third-party evidence? | **No** — no third-party 9-2LE capture was reachable |
| Is MMS capture or monitoring covered? | **No** — out of scope |

## Does the app actually run?

Yes, on one synthetic network — and that is the whole claim. The repository carries `samples/`: an
SCD for a two-bay 220/110 kV station, a four-frame GOOSE capture, a clean baseline, and a README
naming the two defects planted in them. An automated test drives the configuration screen, the
monitor and the diagnostics over those files on every build and fails if the finding set changes.
The exported report and the JSON issue list come from the same sample.

It has not been run on a real substation, a client file, or a multi-substation network.

## What the evidence actually is

The tests are pinned to bytes captured from a different implementation, not to GridSight's own
encoder. That distinction is the whole point: a test that feeds GridSight's output back into
GridSight proves it is self-consistent, not that it is correct.

Stages decoded and asserted from third-party captures:

| Stage | Result |
| --- | --- |
| COTP connection establishment | Pass |
| Session Connect (selectors, SPDU length, presentation block) | Pass |
| Presentation CP, including the constructed SET tag | Pass |
| ACSE AARQ with application context 1.0.9506.2.3 | Pass |
| MMS Initiate-Request | Pass |
| GetNameList request | Pass |
| Read request, through the whole ISO stack | Pass |
| Conclude request | Pass |

The live session then covered the direction the old captures could not:

| Stage against libiec61850 v1.6.2.1 | Result |
| --- | --- |
| Association accepted; AARE with `result = 0` decoded | Pass |
| GetServerDirectory (one domain, `simpleIOGenericIO`) | Pass |
| GetLogicalDeviceDirectory (7,649-octet name list) | Pass |
| GetDataSetDirectory (three data sets) | Pass |
| Four reads: boolean, integer, float, VisibleString | Pass |
| A read of a non-existent name returns `object-non-existent` | Pass (reported) |
| Conclude (`8b 00` → `8c 00`) | Pass |
| ACSE release (RLRQ → RLRE) | Pass |

The peer's own client Read request is reproduced **byte-for-byte** by GridSight's encoder
(`aThirdPartyReadRequestIsTheByteLayoutWeEncode`), which is the test that forces the `Identifier`
encoding to be correct.

## The eleven wire defects this evidence found

Every one was invisible to symmetric tests and would have mattered on a real substation network.

| ID | Defect | Status |
| --- | --- | --- |
| F-38 | `invokeID` encoded as `[0] IMPLICIT` instead of a plain `Unsigned32` | Fixed; pinned on `a0 03 02 01 01` |
| F-39 | Session, presentation and ACSE layers missing; MMS written straight into COTP | Fixed |
| F-41 | `Read-Request` access specification read from the wrong field, so the variable list was always empty | Fixed |
| F-42 | Conclude used wrong choice tags and carried a non-existent `invokeID` | Fixed; confirmed live |
| F-43 | The old captures' server → client frames are not conformant reference data | Closed; rejected, response path asserted from the live peer |
| F-44 | `GetNameList` family used service tags one higher than ISO 9506-2 | Fixed |
| F-45 | `Identifier` encoded as OCTET STRING (`04`) instead of VisibleString (`1a`) | Fixed; peer's Read reproduced byte-for-byte |
| F-46 | COTP option tags permuted; TPDU size `2^15` rejected | Fixed; first live attempt died at COTP |
| F-47 | `GetNameList` `objectClass`/`objectScope` shape and values wrong (`domain` is 9) | Fixed; peer rejected the first name list |
| F-48 | `Read-Request` `listOfVariable` missing its `SEQUENCE` tag | Fixed; peer rejected the first read |
| F-49 | `Read-Response` `listOfAccessResult` read at `[0]` instead of `[1]` | Fixed; every successful read had decoded empty |
| F-50 | `Data` tags off by one for integer/unsigned; float missing its format octet | Fixed; pinned against peer responses |

Six were exposed by the live session (F-45–F-50); the rest by comparing against third-party bytes.
Each has a test that failed before the change.

## What this does not prove

1. **No device, no second implementation.** One peer was tested. No IED, relay, gateway or vendor
   product has been connected, and no compatibility claim is made.
2. **Five services on one model.** Write, control, reporting, file transfer, setting groups, SV and
   GOOSE were not exercised against the peer.
3. **The peer is not a dependency.** libiec61850 is GPLv3 and was built and run outside the
   repository; it is never vendored, linked or shipped.
4. **The live test is opt-in.** It needs the peer running. The committed byte log and
   `LivePeerCaptureTest` keep the response path asserted on every build.
5. **The scenario harness is a replay.** A synthetic network from files with declared changes, not
   a live substation simulation; it does not switch or control anything.

## The conditions under which this claim improves

"Interoperability proven" will not be claimed on a blog post or a demo. It needs all of the
following, in this order:

1. A capture or session from a **named implementation and version**, with the name recorded.
2. A **live session** between GridSight and that implementation, or a capture in which GridSight's
   own requests are accepted by it.
3. Assertions on the **response path** from that peer.
4. This page updated with the peer name, the version and the exact commands.

Until then, no customer-facing page, README, commit title or sales conversation from this project
may state multi-vendor interoperability. That rule is enforced in the project itself, not only here.

## Why publish the gaps

Because the alternative — a tool that lists features and hides what it cannot prove — is exactly
what a commissioning engineer cannot afford. The number that matters is not how many features a
page lists; it is whether the one finding you act on is real.
