shell basics
===

> bash: Bourne Again SHell

wildcard
--------

- `*` matches arbitrary number of characters
- `?` matches single character
- `[]` matches single character specified inside

Getting parameter from terminal in scripts
------------------------------------------

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

Expression
----------

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

if
--

It takes a command as condition, and depends on its exit code to consider as true or false:

- 0: true
- !0: false

```bash
if expression
    #do something
fi
```

read
----

> read input from terminal, interactively.
> And then stores the value in `var`

```bash
read var
```

loop
----

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


Stream edit
-----------

```bash
# stream edit
seq
```






