# Bash Prompt

The primary Bash shell prompt is customized by setting the `$PS1` shell environment variable. In order to see what your current prompt is set to you must echo `$PS1`:

```bash
echo $PS1
```

## Setting Your Prompt

Set your new prompt by manipulating the $PS1 variable.

```bash
export PS1='\h:\W \u\$ '
```

Characters prefixed by a backslash (`\`) are actually variables that get expanded. Here is a list of all Bash prompt variables as described in the PROMPTING section of the BASH(1) man page.

Variable  Name  | Description
---             | ---
`\a`  | an ASCII bell character (07)
`\d`  | the date in “Weekday Month Date” format (e.g., “Tue May 26”)
`\D{format}`  | the format is passed to strftime(3) and the result is inserted into the prompt string; an empty format results in a locale-specific time representation. The braces are required.
`\e`  | an ASCII escape character (033)
`\h`  | the hostname up to the first .
`\H`  | the full hostname
`\j`  | the number of jobs currently managed by the shell
`\l`  | the basename of the shells terminal device name
`\n`  | newline
`\r`  | carriage return
`\s`  | the name of the shell, the basename of $0 (the portion following the final slash)
`\t`  | the current time in 24-hour HH:MM:SS format
`\T`  | the current time in 12-hour HH:MM:SS format
`\@`  | the current time in 12-hour am/pm format
`\A`  | the current time in 24-hour HH:MM format
`\u`  | the username of the current user
`\v`  | the version of bash (e.g., 2.00)
`\V`  | the release of bash, version + patch level (e.g., 2.00.0)
`\w`  | the current working directory, with $HOME abbreviated with a tilde
`\W`  | the basename of the current working directory, with $HOME abbreviated with a tilde
`\!`  | the history number of this command
`\#`  | the command number of this command
`\$`  | if the effective UID is 0, a #, otherwise a $
`\nnn`  | the character corresponding to the octal number nnn
`\\`  | a backslash
`\[`  | begin a sequence of non-printing characters, which could be used to embed a terminal control sequence into the prompt
`\]`  | end a sequence of non-printing characters

## References

- [Customizing your bash prompt](http://twistedcode.org/tutorial/shell/customizing-bash-prompt/)