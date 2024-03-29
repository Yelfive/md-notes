# File or Directory Privileges

## Overview

```bash
> ls -l
drwxr-xr-x. 2 root root 4096 Jan 30 11:47 some-file
```

- The first character(`d`) means the file type, `d` for directory, `-` for file
- 2-4 characters for the privilege of owner, a.k.a `u`
- 5-7 characters for the privilege of group, a.k.a `g`
- 8-10 characters for the privilege of others, a.k.a `o`
- 2-10 is also known as `a`(for all)

## Mode Bits

There three basic privileges indicated by integer:

1. `4` readable, binary `0B100`, a.k.a `r`
2. `2` writable, binary `0B010`, a.k.a `w`
3. `1` executable, binary `0B001`, a.k.a `x`

## chmod

Change file mode bits(privilege)

`chmod` accepts 4 types of roles:

1. `u` for user, owner
2. `g` for user group
3. `o` for others
4. `a` for all above

And as to set the privileges, there are three operators:

1. `=` Set the precise privilege
2. `-` Minus the given privilege (of specified role)
3. `+` Plus the given privilege (of specified role)

For example

```bash
# change mode bits,
# plus write privilege to owner
# plus read privilege to group
# plus execute privilege to others
chmod u+w,g+r,o+x filename
```

> Note there should not be space after comma(`,`), otherwise the privilege parts after the space will be taken by `chmod` as file names

### Privileges of Directory

The privileges `rwx` for directories differs from that of files

- `r` Readable, allows to list the files inside, e.g. with `ls` command
- `w` Writable, allows to create, modify, delete files inside.
- `x` Executable, allows operations such as to use `cd` to get into the directory

    > When set for a directory, the execute permission is interpreted as the search permission: it grants the ability to access file contents and meta-information if its name is known, but not list files inside the directory, unless read is set also.[^wikipedia]

- `-` No privilege at all
- `s` <todo/>
- `t` <todo/>

    ```
    s:
          文件(set uid)：4，任何人访问，都以拥有者角色访问
          目录(set gid)：2，任何人访问，都以所有组角色访问
    t: sticky bit，1
    注：s/t 均针对x权限，添加方法：e.g. chmod 4777 file # set uid
    注意：目录可以使用通配符"*"来表示目录中的所有文件，如将/test目录中的所有文件
    的权限设置为任何人都可以读写
        chmod 666 /test/*
    ```

Hit `man ls` for more information.

## umask

Mask of directory is defines the default privilege when a file/directory is created inside. It is made of a number of 4 digits.

```bash
umask [-p] [-S] [mode]
```

> The user file-creation mask is set to mode.  If mode begins with a digit, it is interpreted as an octal number; otherwise it is interpreted as a symbolic mode mask similar to that accepted by chmod(1).   If  mode  is  omitted,  the  current value of the mask is printed.  The `-S` option causes the mask to be printed in symbolic form; the default output is an octal number.  If the `-p` option is supplied, and mode is omitted, the output is in a form that may be reused as input.  The return status is 0 if the mode was successfully changed or if no mode argument was supplied, and false otherwise.

This can be get by calling the following command and be set likewise.

```bash
umask
# 0022

umask -S
# u=rwx,g=rx,o=rx

umask -p
# umask 0022

umask -pS
# umask -S u=rwx,g=rx,o=rx
```

Generally speaking, the default privilege when creating:

- a file it's `0666`
- a directory it's `0777`

and when you create a file or a directory, it will have the privilege with `file's default` minus the corresponding `mask`.

**For example:**

If the `umask` returns `0022`.

1. When you create a **file** the privilege will be

    ```bash
    # -rw-r--r--
    0666 - 0022 = 0644
    ```

2. When you create a **directory**, the privilege will be

    ```bash
    # drwxr-xr-x
    0777 - 0022 = 0755
    ```

[^wikipedia]: [File-system permissions - Wikipedia](https://en.wikipedia.org/wiki/File-system_permissions)
