# sed - Stream EDitor

## Overview

```bash
sed SCRIPT INPUTFILE...
```

## Commands

### p

Print the input of specified line range.

#### examples

1. from start **string** to **end string**

    ```bash
    sed -n '/-----BEGIN CERTIFICATE-----/,/-----END CERTIFICATE-----/p' file.txt
    ```

1. from start **line** to end line

    ```bash
    sed -n '<start_line_number>,<end_line_number>p' file.txt
    ```

## See Also

- [sed,a stream editor][gun]

[gun]: https://www.gnu.org/software/sed/manual/sed.html