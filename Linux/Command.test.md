# test and expressions

## Abstract

This is more like a rewrite version of online [Introduction to if][if], from HTML format into markdown format.

It explains the usage of command `if` and the `test` expression

## General

At times you need to specify different courses of action to be taken in a shell script, depending on the success or failure of a command. The if construction allows you to specify such conditions.

The most compact syntax of the if command is:

```bash
if TEST-COMMANDS; then CONSEQUENT-COMMANDS; fi
```

The `TEST-COMMAND list` is executed, and if its return status is zero, the `CONSEQUENT-COMMANDS` list is executed. The return status of `TEST-COMMAND list` is the exit status of the last command executed, or zero if no condition tested true.

The `TEST-COMMAND` often involves numerical or string comparison tests, but it can also be any command that returns a status of zero when it succeeds and some other status when it fails. Unary expressions are often used to examine the status of a file. If the _FILE_ argument to one of the primaries is of the form _/dev/fd/N_, then file descriptor "N" is checked. stdin, stdout and stderr and their respective file descriptors may also be used for tests.

## Expression

### table 1. Primary expressions

Primary    | Meaning
---         | ---
[ -a FILE ] | True if FILE exists.
[ -b FILE ] | True if FILE exists and is a block-special file.
[ -c FILE ] | True if FILE exists and is a character-special file.
[ -d FILE ] | True if FILE exists and is a directory.
[ -e FILE ] | True if FILE exists.
[ -f FILE ] | True if FILE exists and is a regular file.
[ -g FILE ] | True if FILE exists and its SGID bit is set.
[ -h FILE ] | True if FILE exists and is a symbolic link.
[ -k FILE ] | True if FILE exists and its sticky bit is set.
[ -p FILE ] | True if FILE exists and is a named pipe (FIFO).
[ -r FILE ] | True if FILE exists and is readable.
[ -s FILE ] | True if FILE exists and has a size greater than zero.
[ -t FD ]   | True if file descriptor FD is open and refers to a terminal.
[ -u FILE ] | True if FILE exists and its SUID (set user ID) bit is set.
[ -w FILE ] | True if FILE exists and is writable.
[ -x FILE ] | True if FILE exists and is executable.
[ -O FILE ] | True if FILE exists and is owned by the effective user ID.
[ -G FILE ] | True if FILE exists and is owned by the effective group ID.
[ -L FILE ] | True if FILE exists and is a symbolic link.
[ -N FILE ] | True if FILE exists and has been modified since it was last read.
[ -S FILE ] | True if FILE exists and is a socket.
[ FILE1 -nt FILE2 ] | True if FILE1 has been changed more recently than FILE2, or if FILE1 exists and FILE2 does not.
[ FILE1 -ot FILE2 ] | True if FILE1 is older than FILE2, or is FILE2 exists and FILE1 does not.
[ FILE1 -ef FILE2 ] | True if FILE1 and FILE2 refer to the same device and inode numbers.
[ -o OPTIONNAME ] | True if shell option "OPTIONNAME" is enabled.
[ -z STRING ] | True of the length if "STRING" is zero.
[ -n STRING ] or [ STRING ] | True if the length of "STRING" is non-zero.
[ STRING1 == STRING2 ] | True if the strings are equal. "=" may be used instead of "==" for strict POSIX compliance.
[ STRING1 != STRING2 ] | True if the strings are not equal.
[ STRING1 < STRING2 ] | True if "STRING1" sorts before "STRING2" lexicographically in the current locale.
[ STRING1 > STRING2 ] | True if "STRING1" sorts after "STRING2" lexicographically in the current locale.
[ ARG1 OP ARG2 ] | "OP" is one of -eq, -ne, -lt, -le, -gt or -ge. These arithmetic binary operators return true if "ARG1" is equal to, not equal to, less than, less than or equal to, greater than, or greater than or equal to "ARG2", respectively. "ARG1" and "ARG2" are integers.

### Table 2. Combining expressions

Operation       | Effect
---             | ---
[ ! EXPR ]      | True if EXPR is false.
[ ( EXPR ) ]    | Returns the value of EXPR. This may be used to override the normal precedence of operators.
[ EXPR1 -a EXPR2 ] | True if both EXPR1 and EXPR2 are true.
[ EXPR1 -o EXPR2 ] | True if either EXPR1 or EXPR2 is true.

## See Also

- [Introduction to if][if]

[if]: http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_07_01.html