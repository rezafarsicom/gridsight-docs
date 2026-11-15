# What is proven, and what is not

The core promise of a diagnostic tool is that it knows what it is looking at.
For GridSight, the honest measurement date is **14 November 2026** — the day the
live session with libiec61850 v1.6.2.1 passed. This page states exactly what that
measurement supports, and no more.

## Short version

| Question | Answer today |
| --- | --- |
| Does GridSight read a complete MMS conversation written by another implementation? | **Yes** — the association, a name list, a read and the release are decoded from published third-party captures |
| Has a real device ever accepted a GridSight request? | **Not a physical device.** One implementation has: **libiec61850 v1.6.2.1**, built from source, run on loopback, accepting association, name lists, four reads and release |
| Can GridSight claim interoperability with a named product? | **One peer only** — libiec61850 v1.6.2.1; no other product, device or model is claimed |
| Is the response direction covered? | **Yes, against the live peer** — every response is asserted from the peer's own bytes. The old captures' malformed frames are pinned as a rejection test instead |
| Is SV covered by third-party evidence? | **No** — no third-party 9-2LE capture was reachable |
| Is MMS capture or monitoring covered? | **No** — out of scope |

## What the evidence actually is

The tests are pinned to bytes captured from a different implementation, not to
GridSight's own encoder. That distinction is the whole point: a test that feeds
GridSight's output back into GridSight proves it is self-consistent, not that it
is correct.

Four stages decode from third-party captures:

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
| Server-to-client responses | Not asserted |
| Live association with a peer | Not performed |

## The five defects this evidence found

Every one of these was invisible to symmetric tests and would have mattered on
a real substation network:

| ID | Defect | Status |
| --- | --- | --- |
| F-38 | `invokeID` encoded as `[0] IMPLICIT` instead of a plain `Unsigned32` | Fixed |
| F-39 | Session, presentation and ACSE layers missing; MMS written straight into COTP | Fixed |
| F-41 | Read-Request access specification read from the wrong field, so the variable list was always empty | Fixed |
| F-42 | Conclude used wrong choice tags and carried a non-existent `invokeID` | Fixed |
| F-44 | GetNameList family used service tags one higher than ISO 9506-2 | Fixed |

Each fix has a test that failed before the change.

## The conditions under which this claim improves

"Interoperability proven" will not be claimed on a blog post or a demo. It needs
all of the following, in this order:

1. A capture from a **named implementation and version**, vendored with that
   name recorded next to it.
2. A **live session** between GridSight and that implementation — or a capture in
   which GridSight's own requests are accepted by it.
3. Assertions on the **response path** from that peer.
4. This page updated with the peer name, the version, and the exact commands
   used to reproduce it.

Until then, no customer-facing page, README, commit title, or sales conversation
from this project may state MMS interoperability. That rule is enforced in the
project itself, not only here.

## Why publish the gaps

Because the alternative — a tool that lists features and hides what it cannot
prove — is exactly what a commissioning engineer cannot afford. The number that
matters is not how many features a page lists; it is whether the one finding you
act on is real.
