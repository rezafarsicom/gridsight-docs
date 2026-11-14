# Known limitations

Everything a user could be misled by, in one place. An empty list here would be
a warning sign, not a selling point.

## Interoperability

- **No live peer session has been performed.** No device has accepted a
  GridSight request. Decoding third-party captures is not the same thing.
- **The captures do not name their producer.** They are consistent with an
  ASN.1-generated MMS stack, but consistency is not attribution, so no
  compatibility statement is made about any product or manufacturer.
- **The response path is not asserted against conformant data.** The captured
  server-to-client frames contain a malformed session Accept (a length one byte
  short and a zero-length user-data field), so they cannot serve as reference
  data. GridSight's response decoders are unit-tested only.
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
