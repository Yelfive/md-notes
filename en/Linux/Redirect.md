---
recommend: true
---

# I/O Redirect

> Redirect includes input, output and pipe

## Input redirection

Input usually from keyboard or pipe(`|`)

### 1. `<`

Redirect a file to a bash, same as `bash file`, rarely used.

```bash
# same as
# cat some_file
cat < some_file
```

### 2. `<<`

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

### 1. `>`

Redirect to and replace the file.

### 2. `>>`

Redirect and append to the file.

## `stdin`/`stdout`/`stderr`

Devices locates at `/dev/fd/`

When redirecting to file descriptor(e.g. stdin 0, stdout 1, stderr 2), the descriptor should **immediately** appending the redirection operator(`>`, `>>`), otherwise error `syntax error near unexpected token '&'` will raise.

## Example

```bash
ls -l 1>file.txt 2>&1
```

It redirects standard output to `file.txt`, and redirects standard error to standard output, which is also redirected to `file.txt` .

**NOTICE** that the `2>&1` should be behind standard output redirection(`1>file.txt`).
Otherwise, when error occurs from the command(`ls -l` in this example), it will have redirect to `stdout`:

```sh
command 2>&1 1>/dev/null
```

The `stderr` will be redirected to standard error, and the output to descriptor `1` will redirect to `/dev/null`.

<image-player>

![picture 3](./images/Redirect/redirect_normal_20210423161606_33.png "Fig. 1-1  Before I/O redirect")
![picture 5](./images/Redirect/pic_1619166152258_20210423162234_63.png "Fig. 1-2  Redirect `stdout` to `/dev/null`")
![picture 4](./images/Redirect/pic_1619166068218_20210423162111_81.png "Fig. 1-3  Redirect `stderr` to `stdout`, which is actually pointed to `/dev/null`")

</image-player>

:::tip

1. When use `1` as `stdin`, it can be omitted:

    ```sh
    # Same as `ls 1>stdout.txt`
    ls > stdout.txt
    ```

2. When redirect using file descriptors, `&` must be immediately after redirect symbols

    ```sh
    # `ls > &2` will raise error: syntax error near unexpected token `&'
    ls >& 2
    ```

:::

### BASH script

**script `test.sh`**:

```bash
#!/usr/bin/env bash

echo -e "\033[32m"
cat $1
echo -e "\033[0m"
```

**usage**:

```bash
echo 123 | ./test.sh
# put out green colored "123"
```

### PHP script

**script `test.php`**:

```php
#!/usr/bin/env php
<?php

echo fgets(STDIN);
```

**usage**:

```bash
echo 123 | php test.php
# or
echo 123 | ./test.php

# both output "123"
```

## Pipe

Pipe(`|`) can be used to redirect `stdout` from former command(*commandA*) to `stdin` of the next command(*commandB*).

```sh
commandA | commandB
```

Typically, when we use pipe, commands are executed in separated processes.

For example:

```sh
A | B | C
```

The processes are spawned(via `fork` and `exec` system call) like this:

```mermaid
graph LR
    shell((Shell)) --spawns--> A((A)) --spawns--> B((B)) --spawns--> C((C))
    p((parent)) ----> |spawns| c((child))
```

As illustrated above, `shell` will be the first parent,
which spawns *proc A* which spawns *proc B* which spawns *proc C*.

Parent processes and children are then executed simultaneously.
However, a child process will typically sleep on *'waiting for data from `stdin`'* until its parent process sends data to `stdout`.
After being waked up because of have some `stdin`, the child process goes on running.

That will explain the following example.

Say you run the following command,

```sh
ls -la | tee result.txt
```

and you will see the `result.txt` listed(result.txt is list below), which means, the file `result.txt` is created before `ls` actually executed.

```
.
..
result.txt
others
```

## A Bit More About How Redirects Works with Files

Suppose you run the following command,

```sh
cat file.txt > file.txt
```

This will end up clearing the `file.txt`, no matter whether there was something in it before.

Because in order to redirect `cat file.txt` to file `file.txt`, shell will have to first open `file.txt` before `dup` file descriptors,
and `>` indicates the shell to open the file with `O_CREAT` flag,which empty the file and then write from the beginning.

The following flow chart depict the algorithm.

```mermaid
flowchart TD
    append["open(file.txt, O_APPEND)"]
    create["open(file.txt, O_CREAT)"]
    e(["Finish system call open"])
    rest[Rest of Algorithm]

    start([Start])  --> redirect{"Append? (> or >>)"}

    redirect --> |"&emsp;>"| create
    redirect --> |">>"| append

    create  --> clear["Clear File"]
    clear   --> rest
    append  --> rest

    rest --> e
```

## Appendix

1. [尴尬，一不小心把 Linux 管道给整漏了](https://mp.weixin.qq.com/s/p3rwjoCWN2WnH4xxtwDiyQ)
