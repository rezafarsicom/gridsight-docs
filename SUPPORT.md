# Support

**One route, one address, one stated response time.** For the 0.2.1 development build this is the
whole support commitment; anything more is a separate written agreement.

## The route

| | |
| --- | --- |
| **Email** | **hello@rezafarsi.com** |
| **Response time** | **within two working days** of a written question |
| **Working days** | Sunday to Thursday, excluding public holidays. The maintainer is in Shiraz, Iran (UTC+3:30) |
| **Languages** | English or Persian |
| **Version covered** | 0.2.1 (Windows 10/11, 64-bit) |

"Two working days" is the time to a **written answer from a person**, not the time to a fix. A defect
may take longer; the answer will say what is known and what happens next.

## What to include

1. The GridSight version (0.2.1) and the Windows version.
2. What you did: the screen, the file type, the steps in order.
3. The exact message, or the smallest screenshot of it.
4. Whether it happens every time or once.
5. For a protocol question: the rule id from the report (for example `GOOSE-004`) and the object it
   names.

**Do not send** a customer SCD, a live substation capture, credentials, or anything under an NDA
unless a written agreement says you may. A synthetic file that reproduces the shape is better.

## What is not supported

- **No phone support.** There is no support line and no callback promise.
- **No on-site work, commissioning or field service** under this development build. Field work is a
  separate fixed-scope engagement, agreed in writing before it starts.
- **No 24/7 cover and no service-level agreement.** The two-working-day answer is the commitment;
  there is no uptime, restoration or availability promise.
- **No support for modified builds, forks, or a build obtained from anywhere other than the owner.**
- **No vendor compatibility support.** GridSight has been tested against one implementation
  (libiec61850 v1.6.2.1) and no device. A question about whether it works with a specific relay,
  tool or vendor cannot be answered with a compatibility claim.
- **No MMS capture or monitoring support.** Out of scope in this version.
- **No help with a live substation during an outage.** If a site is down, use the vendor's support
  and the utility's procedures; this tool is diagnostic, not operational.
- **No price, quote or licence-term answer by email until the owner has agreed the scope.** Pricing
  is not published and is not a support function.

## Security reports

Report a security concern **privately** to **hello@rezafarsi.com** with `SECURITY` in the subject.
Do not open a public issue and do not attach a customer file. [`SECURITY.md`](SECURITY.md) states
the same route. There is no bug bounty.

## Status, documents and the honest version

- Status and gate states: [`docs/STATUS.md`](docs/STATUS.md)
- What is proven, and what is not: [`docs/WHAT-IS-PROVEN.md`](docs/WHAT-IS-PROVEN.md)
- Known limits: [`docs/KNOWN-LIMITATIONS.md`](docs/KNOWN-LIMITATIONS.md)
- Release notes for this build: [`docs/RELEASE-NOTES-0.2.1.md`](docs/RELEASE-NOTES-0.2.1.md)
- The remote IEC 61850 service, if the work has to happen now:
  <https://rezafarsi.com/en/services/iec-61850/>

## If the answer is late

If two working days pass without an answer, send one follow-up with the original message quoted. A
missed answer is a defect in this page, and it should be recorded rather than excused. If email
fails entirely, the contact page at <https://rezafarsi.com/en/contact/> carries the same address.
