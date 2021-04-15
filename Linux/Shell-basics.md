# Shell Basics

**bash**: <acr>Bourne Again SHell</acr>

## wildcard

- `*` matches arbitrary number of characters
- `?` matches single character
- `[]` matches single character specified inside

## Getting parameter from terminal in scripts

```bash
# exit code from last command
$?

# all parameters passing to script, as a string
$*
$@

# to get specified parameter, $1 means the first, $0 means the script name
$num

# get the script parameter count
$#

```

Presentation| Description
---         | ---
`$#`        | Number of parameters passed to current script
`$*`        | All parameters, exclude the script name
`$@`        | Same as above
`$!`        | Last process id of the script run at background
`$$`        | Current process id
`$-`        | Show the set of options passed to shell
`$?`        | Return exit code of the last command: `command ; echo $?`

**More about `$-`:**

```sh
> echo $-

himBH
```

And the `himBH` stands for the options: `h`, `i`, `m`, `B`, `H`.

- `-h` for `hashall`
- `-i` for `interactive`
- `-m` for `monitor`, which is default to be on when `-i` is set
- `-B` for `braceexpand`, expand `a{b,c}d` as `abd acd`
- `-H` for `histexpand`

For more information, hit `help set` in your shell.

## Expression

> `expression` is actually a command, and the expression will be `true` or `false` depending on its returned exit code
>
> - 0: true
> - !0: false

```bash
expr expression
```

same as the following, notice the space between `[` and `expression` and `]`

```bash
[ expression ]
```

## if

It takes a command as condition, and depends on its exit code to consider as true or false:

- 0: true
- !0: false

```bash
if expression
    #do something
fi
```

## read

Read input from `stdin` interactively and then stores the value in `var`.

```bash
read var
```

## loop with for/while

```bash
for variable in space_separated_string
do
    # do something
done

while expression
do
    # do something
done

```

## Stream edit

```bash
# stream edit
seq
```

## String Handling

Say, we have a string

```bash
var=abcd_efg_abc
```

### 1. strip to end

```bash
${var%string*}
```

strip everything from the first occurrence of `string` to the end

```bash
${var%_*} # abcd_efg
```

### 2. strip to end

```bash
${var%%string*}
```

strip everything from the last occurrence of `string` to the end

```bash
${var%%_*} #abcd
```

### 3. strip to start

```bash
${var#*string}
```

strip everything from the start to the **first** occurrence of `string`

```bash
${var#*_} # efg_abc
```

### 4. strip to start

```bash
${var##*string}
```

strip everything from the start to the **last** occurrence of `string`

```bash
${var##*_} # abc
```

## Read from `stdin`

```bash
while read line
do
  echo ${line}
done
```

Similar to PHP as:

```php
<?php
$string = fgets(STDIN);
var_dump($string);
```

## Redirect

Shell provides the ability to redirect content to a file(Linux takes all file, directories, devices etc. as files). Refer to [Redirect](./Redirect.md) for more information.
