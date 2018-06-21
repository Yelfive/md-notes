# sed - Stream EDitor

## Overview

```bash
sed SCRIPT INPUTFILE...
```

## Commands

### p

Print 

```bash
sed -n '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/p' file.txt
```

```bash
sed -n '<start_line_number>,<end_line_number>p' file.txt
```

## See Also

- [sed,a stream editor][gun]

[gun]: https://www.gnu.org/software/sed/manual/sed.html