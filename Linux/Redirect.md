# Redirect

> Redirect includes input, output and pipe

## Input redirection

Input usually from keyboard or pipe(`|`)

### 1. <

Redirect a file to a bash, same as `bash file`, rarely used.

```bash
# same as
# cat some_file
cat < some_file
```

### 2. <<

The content will be regarded as a file content, same as do something with the file contains such content.

1. **here document**: `<<EOF`, inside which bash calling is allowed, and the output is taken as the embed string
2. **now document**: `<<'EOF'`(quote the identifier with either single or double quotes), inside which all characters will be taken as plain text

```bash
# here document
cat <<HERE
date is `date`
HERE
# output: date is Tue Jul 11 07:44:27 CST 2017

# now document
# same as `cat <<"NOW"`
cat <<'NOW'
date is `date`
NOW
# output: date is `date`
```

> Notice: There could be space(s) between redirect token and document delimiter

## Output redirection

### 1. >
### 2. >>

## stdin/stdout/stderr

Devices locates at `/dev/fd/`

When redirecting to file descriptor(e.g. stdin 0, stdout 1, stderr 2), the descriptor should **immediately** appending the redirection operator(`>`, `>>`), otherwise error `syntax error near unexpected token '&'` will raise.

## Example

```bash
ls -l &1>file.txt 2>&1
```

It redirects standard output to `file.txt`, and redirects standard error to standard output, which is also redirected to `file.txt` .

The `2>&1` should be behind standard output redirection(`&1>file.txt`), otherwise, when error occurs from previous command(`ls -l` in this example), it will have no idea to redirect errors to `file.txt`

### BASH

```bash
#!/usr/bin/env bash

stdin=`cat $1`
```
