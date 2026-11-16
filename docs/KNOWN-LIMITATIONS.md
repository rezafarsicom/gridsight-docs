# Known limitations

Everything a user could be misled by, in one place. An empty list here would be a warning sign,
not a selling point.

**Version:** GridSight 0.8.0, development build, 17 November 2026. Both per-user installers are
listed on the site's downloads page; they are **unsigned, certificate pending**.
**Related:** [release notes](RELEASE-NOTES-0.8.0.md) · [what is proven](WHAT-IS-PROVEN.md) ·
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
  `samples/scenarios/`; those are a command-line feature, and the runner has been inside the package
  since 0.5.0.

- **Scenario replay ships in the package from 0.5.0.** The runner (`gridsight-cli scenario`) and the nine
  scenario files are inside the zip, and the matrix is asserted from the packaged build. In 0.2.1 to 0.4.0 the
  files shipped without a runner, and that is why this line changed rather than disappeared.
  with it — shipping files nobody can run is worse than shipping none.
- **The ranking is a rule, not an optimisation.** From 0.5.0 the report ranks candidate changes by a
  published rule (`score = 3n + 2s + 2r - b`, printed in the report). It does not estimate cost, does not
  know your maintenance window, and does not claim a change is sufficient to energise. It ranks what it can
  measure: findings closed, severity, affected objects and reversibility.
- **No efficiency view.** The three metrics are defined for a pilot; the chart does not exist in
  this build.
- **No multi-user, server mode, cloud sync, telemetry or hardware integration.**
- **Scheduled report delivery is not implemented.**

## Evidence

- **The sample is four GOOSE frames.** Two defects are planted and reproduced exactly. That proves
  the path, not the breadth of the rule set.
- **No third-party 9-2LE capture was reachable when this page was first written; one is now
  pinned.** `samples/sv-witness-9-2le.pcap` comes from libiec61850 v1.6.2.1's `SVPublisher` and
  `SvWitnessTest` asserts its identifier, `smpCnt` continuity and wrap, sample rate and data set.
  That is evidence for **one independent publisher**, not SV conformance, and it says nothing about
  a device. The four-frame GOOSE sample carries no SV frames, and the report says the SV checks did
  not run there.
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

- **Windows 10/11, 64-bit only for these artefacts.** No Linux or macOS package, and no 32-bit build.
- **Unsigned.** SmartScreen warns on first run: **More info → Run anyway**. A signed installer and an
  update channel are separate, owner-decided steps and are not part of 0.8.0.
- **The installers are per-user and have an uninstaller.** They install under
  `%LOCALAPPDATA%\Programs\GridSight` (`…\GridSight Field`), require no administrator, register an
  uninstaller for the current user and create a Start Menu shortcut. There is no MSI, no
  machine-wide install and no service. Uninstalling keeps `%LOCALAPPDATA%\GridSight` (settings and
  any consent record).
- **The package carries its own Java runtime.** No JDK is needed. The runtime is an unmodified
  OpenJDK build under GPLv2 with the Classpath Exception; its licence files are inside
  `runtime/legal/`.
- **The build was not tested on a never-touched Windows image.** It was tested in an ordinary account
  with no JDK on `PATH`, and the owner followed `START-HERE.html` from a double-click. That is not a
  fresh corporate image.
- **A review package is evidence about its inputs.** `review` bundles the analysis of the captures it
  was given. It does not prove the substation healthy, does not replace the verification capture,
  and its manifest proves the files are the ones it wrote — it is not signed. Two runs on the same
  inputs are byte-identical except the manifest's `generatedAt`; a different input is a different
  package.
- **`review --all` pairs by file name.** `<name>.scd` and `<name>.pcap` must share a base name in one
  folder. A pair whose capture names no control block, data set or stream the SCL declares is
  refused; a pair with a renamed file is not seen, and the index lists only what it found.
- **The downloads page lists the builds; the owner publishes the files.** There is no purchase path
  in this repository, no automatic update and no update channel.

## Data, privacy and what the tool writes

- **Offline.** No network connection at run time, no telemetry, no cloud service.
- **What it reads:** the SCL file and capture file you open, and files under the application folder.
- **What it writes:** the report files you export (`report.html`, `issues.json`, `testcases.json`),
  the change documents (`changes.md`, `procedure.md`, `changes.patch`), the review package
  (`report.html`, `changes.md`, `changes.patch`, `procedure.md`, `verification.html` when a second
  capture is given, `package.md`, `manifest.json`), and application settings under your user profile.
  It does not modify the input SCL or capture, and a patch is written to a file you name.
- **Do not send client data to the maintainer** without permission. Support requests should carry
  the error text, not a customer SCD or capture.

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
