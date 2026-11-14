# Glossary

One line each, in the vocabulary a protection-and-control engineer actually
uses. If a term here disagrees with the standard, the standard wins and this
file is wrong — please open an issue.

| Term | Meaning |
| --- | --- |
| **IED** | Intelligent Electronic Device — a relay, controller, or merging unit that speaks IEC 61850 on the substation network |
| **SCL** | Substation Configuration description Language — the XML family that describes a substation's devices and communication |
| **ICD** | IED Capability Description — one device's capabilities, before project engineering |
| **SCD** | Substation Configuration Description — the engineered project file for a substation, covering all devices |
| **CID** | Configured IED Description — the per-device file handed to one IED after engineering |
| **IID** | Instantiated IED Description — an instantiated device file used during integration |
| **LN / LDevice** | Logical Node / Logical Device — the functional and organisational units inside an IED's model |
| **DataSet** | A named list of data attributes that a GOOSE or SV control block publishes together |
| **GOOSE** | Generic Object Oriented Substation Event — a fast, repeated multicast message used for trip/close commands and status |
| **SV** | Sampled Values — digitised current and voltage samples published by a merging unit |
| **9-2LE** | The widely used implementation agreement that fixes sample rates and frame layout for SV |
| **MU** | Merging Unit — the device that samples currents and voltages and publishes SV |
| **CB** | Circuit Breaker — the primary switching device a GOOSE trip command operates |
| **APPID** | Application identifier carried in the GOOSE/SV header; used to tell streams apart and to filter captures |
| **confRev** | Configuration revision — changes when a DataSet's shape changes, so subscribers can detect a mismatch |
| **stNum / sqNum** | State number / sequence number in GOOSE — a new state event versus a retransmission of the same state |
| **MMS** | Manufacturing Message Specification (ISO 9506) — the client/server protocol used for configuration, reporting and control |
| **ACSE** | Association Control Service Element — the layer that opens an application association |
| **COTP** | Connection-Oriented Transport Protocol — the ISO transport layer under MMS on TCP/IP |
| **PTP** | Precision Time Protocol (IEEE 1588) — sub-microsecond time distribution used for SV and time-stamped events |
| **PCAP** | The usual file format for a captured packet stream |
| **SCD review** | Reading a substation file for conflicts: missing links, inconsistent models, duplicate identifiers |
| **Commissioning** | The field process of proving a substation works before it carries load |
| **FAT** | Factory Acceptance Test — the pre-shipment test at the manufacturer or integrator |
| **Conformance test** | A test against the standard's requirements, normally by an accredited laboratory; GridSight does not perform or replace this |
