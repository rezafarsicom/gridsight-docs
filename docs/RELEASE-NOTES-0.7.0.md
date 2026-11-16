# GridSight 0.7.0 — release notes

**16 November 2026 · Windows 10/11, 64-bit · development build**

0.7.0 closes the loop between a finding, a change and the proof that the change worked, and makes
the product installable. It is an offline IEC 61850 diagnostic tool: it reads a substation
configuration file (SCL), checks captured GOOSE and SV traffic against it, writes a report with
evidence for every finding, ranks concrete changes by a published rule, and writes those changes as
an SCL edit set a person can review and replay.

**It is a development build, not a released product.** Both installers are **unsigned, certificate
pending**. It has no updater. Nothing here is a certification, a conformance claim or evidence
against any manufacturer's device.

## What changed

1. **Combined remediation, measured.** The report searches the 1-, 2- and 3-edit combinations of the
   ranked candidates, bounded at 12, and prints the bound. Every combination is applied to the SCL
   file in memory and the same capture is analysed again. The table prints edits, candidates,
   findings before and after, new findings introduced and a verdict; **worse combinations are
   printed, not hidden**. The chosen patch is rendered, read back, applied, re-parsed, validated and
   analysed again, with the predicted count beside the observed one. When nothing helps, the report
   says so with the numbers instead of exporting an unexplained empty patch.

2. **Verification capture.** `gridsight-cli verify --before <pcap> --after <pcap> --changes <patch>`
   re-analyses both captures and reports, per candidate, **resolved · still present · newly
   introduced**, with a verdict in English, Persian or Turkish. The same file on both sides reads
   *still present*; a new finding is listed separately; *resolved* is not a claim that the change is
   sufficient to energise.

3. **Installable, per user, per flavour.** One `.exe` per flavour installs under
   `%LOCALAPPDATA%\Programs\GridSight` (or `…\GridSight Field`), requires no administrator,
   registers an uninstaller for the current user and creates a Start Menu shortcut. Uninstalling
   keeps `%LOCALAPPDATA%\GridSight`.

4. **A manifest generated from the artefact.** `update-<flavour>.json` and the site's downloads
   fragment carry the version, byte size, SHA-256, minimum previous version and signing state, read
   from the built file rather than typed. The check compares the manifest, the downloads fragment
   and `START-HERE.html`.

5. **Signing is never silent.** A build with no certificate fails unless the owner explicitly asks
   for an unsigned release candidate, which is then recorded as **unsigned, certificate pending**.

## The artefacts

| File | Bytes | SHA-256 |
|---|---:|---|
| `GridSight-0.7.0-light-setup.exe` | 103,967,232 | `38285F58ABAAC72EF5C4A289CB6D8571F1C5C6F1C61CFF8088F75009227EFF1B` |
| `GridSight-0.7.0-field-setup.exe` | 103,968,768 | `C5C369FA01866864CD02BA778DD0D200A2AC84406EC5E78C973777AC9131AEAC` |
| `GridSight-0.7.0-windows-x64.zip` | 103,956,694 | `209CD56DE9968B4000F58B3203EA8CACE7968FEFB20EB43E634DD4C7CFF0D27B` |
| `GridSight-0.7.0-field-windows-x64.zip` | 103,957,921 | `999E2EDB8F1D64D905548399E681C2F93C701799FBAEE1B341EA104F3552BA2C` |

Both installers were installed silently, started, checked for `Version: 0.7.0` and the expected
flavour, and uninstalled. Both packaged scenario matrices printed `9 of 9 scenarios passed`.

## Measured

- **1064 tests, 0 failed, 1 skipped** (the opt-in live-peer test).
- **78.58% aggregate line coverage**, 90.40% diagnostics, 92.06% MMS, 73.83% UI.

## Limits

- One named implementation (libiec61850 v1.6.2.1) over loopback; no device, no second vendor.
- The sample is four GOOSE frames with two planted defects; it proves the path, not the breadth.
- MMS capture and monitoring out of scope.
- The field build's driver is the labelled **test double** (`0.0.0-test-double`); live capture is
  not a capability of this artefact.
- No M2 report subscription, no Persian interface, no automatic update.
- Unsigned: Windows SmartScreen warns on first run.
