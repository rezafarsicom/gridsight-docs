# Changelog

Documentation changes only. The product itself is unreleased, so this file does
not list product features as if they had shipped.

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
