# Security policy

GridSight is not released. There is no installable binary today, so there is no
supported version to patch. This policy exists so that a future report has a
route that does not require publishing details in public.

## Reporting a vulnerability

Send a private report through the contact route on <https://rezafarsi.com/contact/>
and include:

- what you tested and how (build, branch or version identifier if you have one);
- the smallest reproduction you can manage;
- what an attacker gains — a crash, a false "no issues found" result, a written
  report that omits a real defect, a path traversal in a capture parser, etc.

Please do not open a public issue for a vulnerability, and do not attach a real
customer SCD or PCAP to any report. A synthetic reproduction is enough and is
preferred.

## What matters most in this product

A wrong answer is worse than an error, and these are the classes worth reporting
first:

1. **A silent false negative.** A malformed or non-conformant frame that the
   analysis accepts, so the report shows no issue where an issue exists.
2. **A crash or hang on untrusted input.** SCL and PCAP files are attacker-
   controlled in many workflows.
3. **Any path that writes outside the chosen working directory** when parsing or
   exporting.

## What to expect

- Acknowledgement: best effort, within 14 days.
- Fixes: no SLA before a release exists. When the product ships, this file will
  state supported versions and timelines.
- Credit: offered in the release notes if you want it, and only with your
  permission.

## Supported versions

| Version | Supported |
| --- | --- |
| 0.1.0 (in development) | No public build; reports still accepted |
