# GridSight 0.8.0 â€” release notes

**17 November 2026 Â· Windows 10/11, 64-bit Â· development build**

0.8.0 turns a folder into the package a service engagement delivers. It does not add an analysis:
it adds the one command that assembles the report, the ranked changes, the procedure, the
verification capture and a manifest a customer can check, reproducibly. It also makes the report
print to A4 from the browser the customer already has.

**It is a development build, not a released product.** Both installers are **unsigned, certificate
pending**. Nothing here is a certification, a conformance claim or evidence against any
manufacturer's device.

## The review package

```powershell
gridsight-cli review --scl substation.scd --capture before.pcap [--capture after.pcap] `
                     --lang en|fa|tr --out review\substation
```

| File | What it is |
|---|---|
| `report.html` | the diagnostic report, in the chosen language, print-ready |
| `changes.md` | every ranked candidate, including the manual ones and the measured refusals |
| `changes.patch` | the SCL-level edit set a person can review and `scl patch` can replay |
| `procedure.md` | the ordered steps, the vendor action and the verification capture |
| `verification.html` | with a second capture: resolved Â· still present Â· newly introduced |
| `package.md` | the one-page cover: build, package id, capture window, input and file hashes, checks that did not run, how to print |
| `manifest.json` | every file with its SHA-256, plus the assembly time |

### Reproducibility

Two runs on the same inputs write the same bytes for every document, and their `manifest.json`
differs only in `generatedAt`. A package derives the report id from the input hashes rather than a
UUID, takes the report timestamp from the capture's first frame rather than the wall clock, and
names findings `F1`, `F2`, â€¦ in `changes.md` instead of the per-run UUID. A test runs the command
twice into two folders and diffs every file and the manifest.

## Print-ready output

`report.html` carries `@page` rules for A4, a page break before each section, a running header with
the report version, and fixed-layout tables whose long identifiers wrap instead of being clipped.
`review --print` opens the report (or the batch index) in the default browser. **No PDF library is
bundled**: the browser is the renderer.

## A folder of substations

```powershell
gridsight-cli review --all .\engagements\feeder-01 --lang fa --out .\delivery
```

One package per `<name>.scd` + `<name>.pcap` pair, plus `index.html` listing each substation with
its finding count and health. A pair whose capture does not name anything its SCL declares is
**refused with the reason** and recorded in the index; no package is written against the wrong
configuration. An APPID that disagrees is a finding in the report, not a mismatched pair.

## What did not change

The engine, the ranking rule and the report schema are the ones 0.7.0 shipped. There is still no
M2 report subscription, no real driver payload (the bundled driver is the labelled test double), no
certificate and no translated interface. The report and the package documents are localised; the
interface stays English.

## The artefacts

| File | Bytes | SHA-256 |
|---|---:|---|
| `GridSight-0.8.0-light-setup.exe` | 104,031,744 | `03645B3E3FE023B0B63AAD0D407A7B7F29BD9BD553B0DAC690E28327AABBA9E0` |
| `GridSight-0.8.0-field-setup.exe` | 104,033,280 | `F7D0F7D5969C2A9008E91693C6307CD72D7B862F2DE7FB12460C187968EF65D2` |
| `GridSight-0.8.0-windows-x64.zip` | 104,021,125 | `4EE7D9DB3CADB2C2ADADE64E602E43B2BF5FC8C60B9CB02C56D8447498CA0830` |
| `GridSight-0.8.0-field-windows-x64.zip` | 104,022,342 | `540366F01B9FAE34AED04E02CC4AFBCDF68FB81CE576CB569131048E2BB4DC3F` |

Both installers were installed silently, started, checked for `Version: 0.8.0` and the expected
flavour, and uninstalled. Both packaged scenario matrices and both ZIP checks passed.

## Measured

- **1073 tests, 0 failed, 1 skipped** (the opt-in live-peer test).
- **79.12% aggregate line coverage** (15,010 / 18,971), 90.91% diagnostics, 92.06% MMS, 73.83% UI.

## Limits

- One named implementation (libiec61850 v1.6.2.1) over loopback; no device, no second vendor.
- The sample is four GOOSE frames with two planted defects; it proves the path, not the breadth.
- A review package is evidence about its inputs, not about the substation. Its manifest proves the
  files are the ones it wrote; it is not signed.
- `review --all` pairs by file name in one folder, and lists only the pairs it found.
- MMS capture and monitoring out of scope.
- The field build's driver is the labelled **test double**; live capture is not a capability of
  this artefact.
- Unsigned: Windows SmartScreen warns on first run.
