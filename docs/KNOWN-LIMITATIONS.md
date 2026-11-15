# Known limitations

Everything a user could be misled by, in one place. An empty list here would be a warning sign,
not a selling point.

**Version:** GridSight 0.2.1, development build, 15 November 2026. It is not published for download.
**Related:** [release notes](RELEASE-NOTES-0.2.1.md) · [what is proven](WHAT-IS-PROVEN.md) ·
[status](STATUS.md) · [support](../SUPPORT.md).

## Interoperability

- **One peer, not equipment.** The live session ran against **libiec61850 v1.6.2.1**, built from
  source, over loopback: one model, five services. **No physical device, no other implementation, no
  other model and no multi-vendor evidence exist.** No compatibility statement is made about any
  product or manufacturer.
- **Only part of the conversation was exercised.** Association, name lists, four reads and release
  were accepted. Write, control, reporting, file transfer and SV/GOOSE were **not** exercised against
  the peer.
- **The response path is asserted against the peer, not a device.** The older captures'
  server-to-client frames are malformed (a session Accept one byte short, zero-length user data) and
  are pinned as a test that must reject them.
- **The composed conversation is composed.** Association and name list come from one capture; the
  read and release come from another. Every byte is third-party; the sequence is not one recorded
  session.
- **GridSight's own server in front of a foreign client has not been tested.** That side claims
  nothing.

## Scope

- **MMS capture and monitoring are out of scope.** The capture layer cannot classify MMS traffic.
  This was closed by narrowing the specification rather than by implementing IP reassembly, and
  reopening it is a product decision.
- **No live substation simulation.** A scenario run replays a synthetic network from files with
  declared changes and reports exactly the findings that state must produce. It cannot advance state
  over time, does not model device behaviour, and proves nothing about a running site.
- **The Simulate screen is a local virtual-IED simulation, not the scenario harness.** It runs the
  built-in virtual-IED scenarios. It does **not** load the nine scenario JSON files shipped under
  `samples/scenarios/`; those are a command-line feature in 0.2.1.
- **No "best change" and no ranking.** The report recites the change the rule that raised the finding
  implies, or says "no automatic suggestion". It does not compare remedies, estimate cost or choose
  between two findings on the same object.
- **No efficiency view.** The three metrics are defined for a pilot; the chart does not exist in
  this build.
- **No multi-user, server mode, cloud sync, telemetry or hardware integration.**
- **Scheduled report delivery is not implemented.**

## Evidence

- **The sample is four GOOSE frames.** Two defects are planted and reproduced exactly. That proves
  the path, not the breadth of the rule set.
- **No third-party 9-2LE capture was reachable** for SV, so SV has no cross-implementation evidence.
  SV checks run only when the capture carries SV frames; the sample carries none, and the report says
  the checks did not run.
- **Timing is not exercised by short captures.** The rate proxy needs at least 100 frames; on the
  sample the check is reported as "did not run", not as "passed".
- **A dropped frame is not reported as a gap.** The sequence rule detects a repeated or backwards
  `sqNum`, not a missing one. `drop-frame` passes because the planted defects remain; it is not
  evidence that gaps are checked.
- **`SCL_MISSING_OBJECT` is reported once per frame.** Removing one control block from a four-frame
  capture produces four findings; the scenario result records `occurrences: 4`, and the repeated rows
  also inflate the health penalty. This is engine behaviour, not a display bug.
- **The report's "Root causes" block is older than the v1 rule.** It prints a percentage (for example
  95%) and a list of remedies. That percentage is **not a measured probability** and is not a ranking
  this version stands behind. The supported output is the per-finding suggested change and the rule
  behind it.
- **A rule that fires on a shape no scenario declares cannot be caught by the matrix.** `normal` and
  `boundary` prove the engine stays silent on the shapes they declare, not on every clean network.

## Platform and packaging

- **Windows 10/11, 64-bit only for this artefact.** No Linux or macOS package, and no 32-bit build.
- **Unsigned.** SmartScreen warns on first run: **More info → Run anyway**. A signed installer and an
  update channel are separate, owner-decided steps and are not part of 0.2.1.
- **No MSI and no uninstaller.** Extract to a folder; delete the folder to remove it. Nothing is
  installed into `Program Files` and no service is registered.
- **The package carries its own Java runtime.** No JDK is needed. The runtime is an unmodified
  OpenJDK build under GPLv2 with the Classpath Exception; its licence files are inside
  `runtime/legal/`.
- **The build was not tested on a never-touched Windows image.** It was tested in an ordinary account
  with no JDK on `PATH`, and the owner followed `START-HERE.html` from a double-click. That is not a
  fresh corporate image.
- **The artefact is not publicly downloadable.** A tag exists; there is no public release asset, no
  price and no purchase path.

## Data, privacy and what the tool writes

- **Offline.** No network connection at run time, no telemetry, no cloud service.
- **What it reads:** the SCL file and capture file you open, and files under the application folder.
- **What it writes:** the report files you export (`report.html`, `issues.json`, `testcases.json`)
  and application settings under your user profile. It does not modify the input SCL or capture.
- **Do not send client data to the maintainer** without permission. Support requests should carry
  the error text, not a customer SCD or capture.

## Interface defects known in 0.2.1 (not fixed here)

Both were found in the owner's run and recorded for the next build. Neither changes an analysis or a
report.

- **Anomaly Timeline time-axis labels are unreadable.** `HH:mm` labels are forced into a 20 dp-wide
  cell, so they clip or overlap; the label row and the grid rows also scroll independently.
- **The status bar's memory unit is wrong.** The value is labelled `MB` but computed by dividing
  bytes by 1024 once instead of 1024², so it reads roughly 1024× too large.

## Support, licence and claims

- **Support is email only**, answered within two working days. No phone, no on-site work, no 24/7
  cover and no service-level agreement under this development build.
- **No certification, conformance, accreditation or "approved by" status.** GridSight is not a test
  laboratory and does not claim to be.
- **No price and no commercial licence terms are published.** The code is Apache-2.0; the GridSight
  name and logo are not licensed. Nothing here is an offer or a quote.
- **Not production-ready for a transmission utility.** The tool is installable and demonstrable; a
  utility sale additionally needs multi-vendor evidence, a signed installer, a support commitment
  and a security answer. None of those is closed by this build.

---

If you can show a case that contradicts a statement here, that is the most valuable report this
project can receive. See [../CONTRIBUTING.md](../CONTRIBUTING.md) or write to
**hello@rezafarsi.com** with the version, the input shape (not a customer file) and what you observed.
