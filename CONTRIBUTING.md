# Contributing

This repository holds documentation for a product that is still in development.
Corrections are genuinely useful; so is disagreement about scope. What is not
useful is a claim that cannot be checked.

## What is welcome

- **Factual corrections** with a source: a standards clause, a published
  specification, or a reproducible observation.
- **Clarity fixes**: a sentence that misleads, a term used inconsistently, a
  link that goes nowhere.
- **Terminology**: the glossary should match the vocabulary working engineers
  use, not the vocabulary of a brochure.
- **Diagram or example improvements** that stay synthetic (see below).

## What cannot be accepted

- **Customer material.** No SCD, CID, PCAP, screenshot, or log from a real
  substation unless the owner has written permission to publish it and the file
  is anonymised. When in doubt, do not attach it.
- **Credentials, tokens, IP addresses, serial numbers, or site names.**
- **Vendor claims.** Nothing that states or implies that GridSight has been
  tested against a named manufacturer's device. No such test exists.
- **Marketing numbers.** No performance, saving, or reliability figure without a
  dated, reproducible measurement recorded in this repository.
- **Files under an NDA** you have not cleared.

## How to make a change

1. Open an issue describing the problem in one paragraph, with the file and the
   sentence.
2. Send a pull request with the smallest change that fixes it.
3. Run `node scripts/check-links.mjs` before you push; it fails on a broken
   relative link or a missing file.

Contributions are accepted under the Apache License 2.0 — the same licence as
the repository. There is no CLA: by opening a pull request you agree that your
contribution may be distributed under that licence and that you have the right
to submit it.

## Review expectations

There is one maintainer. Expect a reply within a couple of weeks, not hours.
A pull request that changes a claim about the product will be held until it can
be checked against a measurement, even if the wording is better.

## Code of conduct

Be direct about the work and generous about the person. Disagreement is fine;
contempt is not. Anything that would not survive being quoted in a customer's
engineering meeting does not belong in an issue.
