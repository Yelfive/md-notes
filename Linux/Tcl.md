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

## braces { }

Braces defers everything inside, meaning they see things inside literally without substitution, lick single quotes in `shell` or `PHP`.

```tcl
puts {[set a]}
# [set a]

puts [set a]
# can't read "a": no such variable
```

## Everything is command

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

1. No line feed before `elseif` or `else`
2. `elseif` and `else` are optional

```tcl
if test command ?elseif test command? ?else test command?
```

**example**

```tcl
if $a<1 {
    puts "less than 1"
} elseif $a<10 {
    puts "less than 10"
} else {
    puts "greater than or equal to 10"
}
```

### switch

```tcl
switch ?switches? string pattern body ... ?default body?
```

```tcl
switch -- $count 1 {
    puts One
} 2 {
    puts Two
}
```

### proc

1. Create a function, called `procedure` in TCL
1. If no `return` provided, whatever returned from the last command in the procedure will be returned.
1. Command `return` returns the value gives it

```tcl
proc name args body
```

**example**

```tcl
proc fib {one two n} {
    for {set i 0} {$i<$n} {incr i} {
        set two [expr $one + $two]
        set one [expr $two - $one]
    }
    return $two
}
```

#### arbitrary arguments

Special argument `args` hold all the remaining arguments.

```tcl
proc sum {title args} {
    foreach i $args {
        incr sum $i
    }
    puts $title
    puts $sum
}
sum "The sum of 5 integers" 1 2 3 4 5
# The sum of 5 integers
# 15
```

### exit

Same as `exit` in shell, or PHP

```tcl
exit 0
```

### global

To set a variable as global

```tcl
global variableName ?variableName?
```

### source

Similar to `source` of shell, and recognize the `~` as user's home directory.

**Syntax**

```tcl
source file.tcl
```

### foreach

```tcl
foreach varList list ?varList list ...? command
```

```tcl
foreach a "a b c" b "c d e"{
    puts $a
    puts $b`
}
```

## Language properties

### list

```tcl
set a "one two three"
llength $a
# 3
```

All list manipulation commands start with a `l`

- `list` create a list
    
    ```tcl
    list a b c
    # a b c
    ```

- `llength` Length of the list
- `lindex` Retrieve a value in a list with index started from 0
- `lrange` Retrieve a range of values in a list
- `lappend`
- `linsert`
