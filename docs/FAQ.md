# FAQ

The same questions the product page answers, kept here so a reader can check the
wording in one place.

### Can I buy it or download it now?

No. There is no public download, no price and no commercial licence. A 0.2.1
Windows development build exists for evaluation and the owner's checks, but it
is not published, and there is no purchase path. The release gates and their
state are in [`STATUS.md`](STATUS.md); no date is attached to any of them.

### Does it work with ABB, Siemens, GE, or any other manufacturer's devices?

That claim is not made. One implementation has been tested — **libiec61850
v1.6.2.1**, over loopback — and **no device from any manufacturer has been
tested**, and no vendor has been involved. One peer is not a compatibility claim,
and no such statement will appear on any page of this project. See
[`WHAT-IS-PROVEN.md`](WHAT-IS-PROVEN.md).

### Is it an alternative to OMICRON or Doble?

No, and describing it that way would be misleading. Those are hardware-plus-
software ecosystems with global support, training, and the default position in
this market. GridSight's definition is narrower: offline software on the
engineer's laptop that produces a report, with no hardware bundle. It has no
accreditation, no certification, and no reseller relationship with any tool
vendor. No price or commercial term is published.

### Does it monitor MMS traffic?

No. MMS capture and monitoring are outside the current scope by decision. The
focus is SCL, GOOSE and SV. The earlier marketing material that promised MMS
monitoring was withdrawn when that gap was recorded.

### Is it certified, or does it replace a conformance test?

No. It is not a laboratory, holds no accreditation, and does not issue
conformance certificates. An accredited test is a different thing with a
different authority. GridSight is intended to make the days before that test
less expensive.

### Why does the documentation spend so much space on limitations?

Because a diagnostic tool that does not state its limits cannot be trusted in an
engineering decision. A written limit can be checked; an unbacked claim cannot.
The limitations page is intentionally the least flattering page in this
repository: [`KNOWN-LIMITATIONS.md`](KNOWN-LIMITATIONS.md).

### What happens to files I would use with it?

The tool runs offline. Nothing is uploaded, there is no telemetry, and no account
is required. That is a design constraint, not a feature list: substation files
and captures are exactly the material that should not leave a site.

### Can I get the source?

Not today. This repository publishes documentation, not source. If and when the
source is published it will be released under a permissive licence with a NOTICE
file and a trademark line — the decision recorded in the project is Apache-2.0.

### How do I get support, and how fast?

Write to **hello@rezafarsi.com**; a written question is answered within **two working days**
(working days exclude weekends and public holidays). There is no phone support, no on-site work, no
24/7 cover and no service-level agreement under the development build. See
[`../SUPPORT.md`](../SUPPORT.md) for what to include and what is not supported.

### I need a substation reviewed this month. What do I do?

That exists today as a service, not as the product:
<https://rezafarsi.com/en/services/iec-61850/>. It is fixed-scope, remote, and
delivered with the project's own scripts and your files.
