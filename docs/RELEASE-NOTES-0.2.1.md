# GridSight 0.2.1 — release notes

**15 November 2026 · Windows 10/11, 64-bit · development build**

This is the second installable build of GridSight, an offline desktop tool for IEC 61850
diagnostics. It reads a substation configuration file (SCL), checks captured GOOSE traffic against
it, and writes a report with evidence for every finding.

**It is a development build, not a released product.** It is unsigned, it has no updater and no
public download, and nothing here is a certification, a conformance claim or evidence against any
manufacturer's device. The price and the commercial licence terms are not published.

---

## What changed since 0.2.0

0.2.1 exists for a packaging reason, not a protocol reason. The first real run of 0.2.0 found that
the guide shipped as `QUICKSTART.md`, and a bare Windows has no handler for `.md`; nothing in the
folder pointed at it either. The install worked, the warning was handled, and the instructions
were never seen.

Three changes:

1. **`START-HERE.html` at the package root.** The same text as `QUICKSTART.md`, rendered as one
   self-contained page (inline CSS, no script, no external reference). It is generated at package
   time from `QUICKSTART.md`, so the two cannot drift, and a double-click opens it on any Windows.
2. **A pointer on the first screen.** The Dashboard names `samples/substation-a.scd` and
   `samples/substation-a-capture.pcap`, so the guided path also starts inside the product.
3. **The version**, in the folder, the zip and `BUILD-NOTES.txt`.

No dependency, runtime, licence or protocol change. The 0.2.1 artefact, if you were given one, is:

| | |
|---|---|
| File | `GridSight-0.2.1-windows-x64.zip` |
| Size | 96,249,262 bytes (91.8 MB) |
| SHA-256 | `DD95DD49F391FD390F876AC56C749B5585B5E403067CFE51B1A097916D2C232C` |

Check it before extracting:

```powershell
Get-FileHash .\GridSight-0.2.1-windows-x64.zip -Algorithm SHA256
```

---

## Install, in three steps

1. **Extract** the zip to any folder (for example `C:\GridSight`). There is no installer and no
   administrator prompt. Do not run the `.exe` from inside the zip preview.
2. **Open `START-HERE.html`** in that folder. It is the guide, and it is the same text as
   `QUICKSTART.md`.
3. **Run `GridSight.exe`.** Windows SmartScreen will warn once because the build is unsigned:
   **More info → Run anyway**.

The package carries its own Java runtime. You do not need a JDK, a network connection, or
administrator rights. Nothing is written to `Program Files`; delete the folder to remove it.

---

## What works in this build

- **Read and validate an SCL document** — ICD, SCD, CID or IID — and show the station, voltage
  levels, bays, IEDs, control blocks and subscriptions.
- **Analyse a captured GOOSE file against that SCL.** Each finding names the object, the reference,
  the file and the field evidence; the sample's two defects are reproduced exactly.
- **Write a report** — one HTML file plus `issues.json` and `testcases.json` — with the findings,
  the change each rule implies, one test case per finding, and a list of the checks that **did not
  run** and why.
- **Replay a synthetic network from files** through the command-line scenario runner, with declared
  changes and an exact expected finding set. Nine scenarios; deterministic; headless; the matrix
  runs in well under a minute. `normal` and `boundary` are asserted to find **nothing**.
- **Ask a simulated IED on the loopback interface** for its name list and data model.
- **Run offline.** No telemetry, no cloud dependency, no dongle.

The measured state after the 0.2.1 build (no code changed after it): **900 automated tests**, 0 failed, 1 skipped (the opt-in live-peer
test); **75.99%** aggregate line coverage; **92.06%** in the MMS module. Eleven wire-format defects
were found by comparing against another implementation's bytes and fixed; each has a test that
failed before the fix.

---

## What this build does not do

Read this section before using the tool on anything that matters.

- **No MMS capture or monitoring.** The capture layer cannot classify MMS traffic. This is out of
  scope by decision, not by oversight.
- **No live simulation of a substation.** Scenario replay replays bytes on disk with declared
  changes. It cannot advance state over time, does not model device behaviour, and says nothing
  about a running site. The Simulate screen's virtual IEDs are a separate, local simulation; it
  does not load the nine scenario JSON files.
- **Scenario files are a command-line feature in 0.2.1.** The packaged desktop app does not open
  them. The app shows the same clean/defective contrast by opening the clean and the defective
  capture.
- **No "best change" and no efficiency view.** v1 recites the change its rule table justifies and
  says "no automatic suggestion" where no rule exists. It does not rank remedies or estimate cost.
- **One named peer, and only one.** A live session against **libiec61850 v1.6.2.1**, built from
  source and run on loopback, accepted association, name lists, four reads and release. No physical
  device, no other product, no other model and no multi-vendor evidence. Write, control, reporting,
  file transfer and SV/GOOSE were not exercised against that peer.
- **No certification, conformance, accreditation or vendor compatibility claim.** None is implied
  by this build or by the live session.
- **No SV evidence from a third party.** SV checks run only when the capture carries SV frames; the
  sample does not.
- **Short captures do not exercise timing.** The timing rule needs at least 100 frames; the sample
  has four, and the report says the check did not run.
- **The report's "Root causes" block is older than the v1 rule.** It prints a percentage (for
  example 95%) and a list of remedies. That percentage is not a measured probability and is not a
  ranking this version stands behind; the per-finding suggested change is the supported output.
- **Windows x64 only for this artefact.** No MSI, no code signing, no update channel.
- **Two cosmetic interface defects are known in this build:** the Anomaly Timeline's time-axis
  labels are unreadable at the current cell width, and the status bar's memory figure is labelled
  MB while being computed roughly 1024× too large. Both are recorded for the next build and are not
  fixed here. Neither affects an analysis or a report.

The full list, including the evidence gaps, is the [known-limits page](KNOWN-LIMITATIONS.md).

---

## Release gates

The project closes a gate only on evidence in the repository, never on a summary.

| Gate | State at 0.2.1 |
| --- | --- |
| G0 — repository reconciled | **Closed** |
| G1 — interoperability proven against one named implementation | **Closed 14 Nov 2026** |
| G2 — the interface runs end to end on the sample | **Closed 15 Nov 2026** |
| G3 — report, issue list, test cases and scenario matrix | **Closed 15 Nov 2026** |
| G4 — licence, tagged version, installable artefact, guide followed by someone else | **Closed 15 Nov 2026** on 0.2.1 |
| G5 — ten-minute demo, with a second person reaching the same conclusion | **Open** — the script and this build's evidence exist; the second-person run has not happened |
| G6 — first paid use | **Not started** |
| G7 — public release: release notes, known-limits page, support route, site/docs agreement | **In progress** — the documents exist; publication is the owner's act |

G4 closing does **not** make this production-ready for a transmission utility. It makes it
installable and honestly demonstrable to an integrator or consultancy. A utility sale additionally
needs multi-vendor evidence, a signed installer, a support commitment and a security answer; none of
those is closed by this build.

---

## Support

Email **hello@rezafarsi.com**. A written question is answered within **two working days** (working
days exclude weekends and public holidays). There is no phone support, no on-site work, no 24/7
cover and no service-level agreement under this development build.

Include the version (0.2.1), the Windows version, the file you loaded and the exact message you
saw. Do not send a customer SCD, credentials or anything under an NDA.

---

## Licence

The code and this documentation are licensed under the **Apache License 2.0**; the package contains
`LICENSE` and `NOTICE`. The GridSight name and logo are **not** licensed. GridSight is an
independent project by Reza Farsi and is not affiliated with any other product of a similar name.

**No price and no commercial licence terms are published.** Nothing in this package is an offer,
a quote or a purchase path.
