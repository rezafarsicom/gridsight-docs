# Changelog

Documentation changes only. The product itself is unreleased, so this file does
not list product features as if they had shipped.

## 2026-11-14 (later the same day) — G1 closed, numbers refreshed

The live session with libiec61850 v1.6.2.1 passed and the defects it exposed were
fixed, so the interoperability section stopped being a list of unknowns:

- **836 tests** (0 failed, 1 skipped — the opt-in live-peer test), **74.65%**
  aggregate coverage, **92.06%** in MMS, **73.32%** in the UI module.
- **Eleven** wire-format defects found and fixed; six against third-party
  captures, five against the live peer.
- docs/WHAT-IS-PROVEN.md, docs/KNOWN-LIMITATIONS.md, docs/STATUS.md and
  README.md now state exactly one proven peer (libiec61850 v1.6.2.1, one model,
  five services) and continue to refuse any device or vendor claim.
- G1 is **closed** on that evidence; G2 remains in progress.
## Unreleased — documentation snapshot 2026-11-14

First public documentation set for an in-development product.

- `README.md` — what the tool is for, what is measured, what is not proven, and
  where the source of truth lives.
- `docs/STATUS.md` — the eight release gates, each with its current state and no
  promised date.
- `docs/WHAT-IS-PROVEN.md` — the interoperability evidence: eight stages that
  decode from third-party captures, and the four that do not.
- `docs/HOW-WE-TEST.md` — why symmetric tests cannot find a shared encoder/decoder
  defect, and what replaced them (804 tests, 73.61% line coverage, 92.47% in the
  MMS module, measured 29 October 2026).
- `docs/KNOWN-LIMITATIONS.md` — every open defect and out-of-scope area,
  including the one encoder defect that is not fixed and why.
- `docs/GLOSSARY.md` — the vocabulary, one line per term.
- `docs/FAQ.md` — the buyer questions, answered without marketing.
- `examples/scl-fragment.xml` — a synthetic teaching fragment, explicitly not a
  valid SCD.
- `scripts/check-links.mjs` — dependency-free relative-link check for
  contributors.
- Licence: Apache-2.0 with a NOTICE, a trademark line, and an independence note.
