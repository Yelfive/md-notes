# Tcl: Tool Command Language

## 1. Everything is a string

All variables(including numerics), commands are strings in Tcl

```tcl
set foo bar
set pi 3.1415926
```

- access a variable

    prefix a `$` before the variable name `set` previously

    ```tcl
    set phrase $word
    ```

- escape character `\`

    Similar to `C`, except  `\0` here dose no present the `null`

    ```tcl
    set money \$1000
    # $1000
    ```

- comment start with `#`
- semicolon `;` act same as `C`

## \[ ]

Brackets executes a command and returns its value

```tcl
# prints the current process id
echo The pid is [pid]
```

## expr

Evaluates an expression.

```tcl
echo The answer is [expr 1 + 2]
```

## { }

Braces defers everything inside, meaning they see things inside literally without substitution.

```tcl
puts {[set a]}
# [set a]

puts [set a]
# can't read "a": no such variable
```

## everything is command

### incr

```tcl
incr variable ?increment?
```

```tcl
set a 1
#1
incr a
# 2
incr a 2
# 4
incr a -1
# 3
```

### while

`while` is command requires two arguments, the first argument is the expression, it evaluates every loop, executes the second argument when it returns other than 0.

```tcl
wile test command

set count 10
while {$count > 0} {
    puts $count
    set count [expr $count - 1]
}
```

> Command `while` takes two arguments, but the line-feed `\n` (as well as semicolon `;`)character terminates a command, so the second argument `command` (such as the start brace `{`) should be in the same line as while.

### for

takes 4 command

```tcl
for start test next command
```

```tcl
for {set a 10} {$a>0} {set a [expr $a - 1]} {puts "current value"; puts $a}
```

### if

s