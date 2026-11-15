# Changelog

Documentation changes only. The product itself is unreleased, so this file does
not list product features as if they had shipped.

## 2026-11-15 (session 7) — G4 closed; G5 script and G7 documents

- **G4 is closed on 0.2.1**: Apache-2.0, tags `0.2.0` and `0.2.1`, a Windows x64 app image with
  its own runtime, and `START-HERE.html` generated from `QUICKSTART.md`. The owner followed it and
  reached exactly the sample's two findings. The artefact is **not published for download**.
- **Release notes, a rewritten known-limits page and a support route** now exist:
  [release notes](docs/RELEASE-NOTES-0.2.1.md), [known limits](docs/KNOWN-LIMITATIONS.md), and
  [support](SUPPORT.md) — **hello@rezafarsi.com, answered within two working days**, email only.
- **Numbers re-measured on `main` at 0.2.1:** 900 tests (1 skipped), **75.99%** aggregate coverage,
  **92.06%** in MMS, **73.49%** in the UI. No other published number changed.
- `WHAT-IS-PROVEN.md` corrected: the live session **has** run, the response path **is** asserted
  against the peer, and there are **eleven** wire defects, not five.
- `STATUS.md` corrected: product `0.2.1`; G4 closed; G5 and G7 in progress; G6 ahead.
- Two cosmetic 0.2.1 interface defects are disclosed on the limits page and not yet fixed:
  unreadable Anomaly Timeline axis labels, and a status-bar memory figure about 1024× too large.
- **No price and no commercial licence term was published.** There is no download and no purchase
  path.

## 2026-11-15 (later) — G3 closed: the scenario run, the change, the test cases

- A scenario run replays a synthetic network with declared changes and reports **exactly** the
  findings that state must produce: nine scenarios, deterministic, headless, under a minute.
- The report gains a test-case pack and a per-class suggested change, and still states which checks
  did **not** run.
- **900 tests** (1 skipped), **75.95%** aggregate coverage, **92.06%** in MMS.
- G3 is **closed**; G4 is in progress — licence, a 0.2.0 artefact and a quickstart.

The harness is a replay, not a live simulation. Nothing here switches or controls a network.
## 2026-11-15 — G2 closed on a committed sample

The interface gate closed on evidence, not on a screenshot of a hand-built state:

- samples/ added: one SCD, one four-frame capture, and a README naming the two planted
  defects. A test drives the whole path over them on every build.
- Two error paths now say what went wrong instead of showing a stack trace.
- The app builds and launches from a clean git archive export.
- The report exports to a file a reader can open, with a JSON issue list and a
  statement of the checks that did not run.
- **851 tests** (1 skipped), **75.23%** aggregate coverage, **73.42%** in the UI module.
- G2 is **closed**; G3 is in progress — the scenario harness and the suggested-change
  table are not done and are not claimed.
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
