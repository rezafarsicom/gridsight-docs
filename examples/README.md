# Examples

## `scl-fragment.xml`

A **synthetic teaching fragment**, written by hand to show the shape of a
substation configuration file: one merging unit, one protection relay, one
subnetwork, one GOOSE control block with a data set.

It is deliberately **not** a valid SCD:

- it does not include the type templates (`LNodeType`, `DOType`, `DAType`, `EnumType`)
  that a real file needs to be resolvable;
- the identifiers are invented;
- no tool has validated it, and it must not be imported into a project.

It exists so that a reader who has never opened an SCL file can see what one
contains without touching a customer's file. Nothing in it describes a real
substation, real equipment, or a real project.

If you want to contribute a better example, keep it synthetic, keep it small,
and say in the file header that it is synthetic. Never attach a real
substation's SCD, CID, PCAP, or log — see [`../CONTRIBUTING.md`](../CONTRIBUTING.md).
