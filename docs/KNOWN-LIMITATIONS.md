# Known limitations

Everything a user could be misled by, in one place. An empty list here would be
a warning sign, not a selling point.

## Interoperability

- **One peer, not equipment.** The live session ran against libiec61850
  v1.6.2.1 built from source, over loopback: one model, five services. No
  physical device, no other product and no other model has been tested, so no
  compatibility statement is made about any product or manufacturer.
- **The old captures still do not name their producer.** They remain useful as
  decoding evidence and as a rejection fixture; they are no longer the basis of
  the interoperability claim, which now rests on the named peer.
- **The response path is asserted against the peer, not against a device.** The
  old captures' server-to-client frames are malformed (a session Accept one byte
  short, zero-length user-data) and are pinned as a test that must reject them.
- **Nothing outside that conversation is proven.** Write, control, reporting,
  file transfer and SV/GOOSE were not exercised against the peer, and
  GridSight's own server in front of a foreign client has not been tested.
- **The conversation test is composed.** Association and name list come from one
  capture; the read and the release come from another. Both are third-party; the
  sequence is not one recorded session.

## Scope

- **MMS capture and monitoring are out of scope.** The capture layer cannot
  classify MMS traffic. This was closed by narrowing the specification rather
  than by implementing IP reassembly, and reopening it is a product decision.
- **No multi-user, server mode, cloud sync, or telemetry.** By design: the tool
  runs offline on one laptop.
- **No hardware integration and no accredited certification of GridSight
  itself.** The product is not a test laboratory and does not claim to be.
- **Scheduled reporting is not implemented.**

## Protocol coverage

- **Refuse (RF) is outside the implemented profile.** No authoritative encoding
  reference exists for it in the reference implementation (it sits in disabled
  code), so GridSight refuses to encode RF and reports an incoming RF with its
  raw bytes, rather than guessing a layout. Every other SPDU that GridSight
  sends or receives is either implemented and round-trip tested, or refused with
  a typed error that says what happened.
- **One encoder defect is open.** Domain-specific object names are written with
  an `Identifier` encoded as an OCTET STRING where ISO 9506-2 defines a
  VisibleString. Decoding already accepts both forms. It is not fixed because no
  capture exercises a domain-specific identifier, so a fix would have no
  third-party test — and a change with no evidence is how the closed defects
  above appeared in the first place.

## Evidence

- **No third-party 9-2LE capture was reachable** for SV, so SV has no
  cross-implementation evidence yet.
- **The vendored capture collection carries no declared licence**, which is a
  release blocker: the fixtures must be replaced or cleared before anything
  ships publicly.
- **All numbers on this repository are from a working branch**, not from a
  tagged release. They are honest measurements of a moving tree.

## Reporting

If any of the above is wrong — if you can show a case that contradicts a
statement here — that is the most valuable report this project can receive. See
[`../CONTRIBUTING.md`](../CONTRIBUTING.md).
