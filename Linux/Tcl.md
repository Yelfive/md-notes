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
foreach first "a b c" second "c d e"{
    puts $first
    puts $second
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
    llength [list a b c]
    # 3

    list "a b c"
    # {a b c}
    llength [ list "a b c"]
    # 1
    ```

- `llength` Length of the list

    ```tcl
    llength $list
    ```

- `lindex` Retrieve a value in a list with index started from 0

    ```tcl
    lindex $list index

    lindex [ a b c] 0
    # a
    ```

- `lrange` Retrieve a range of values in a list
- `lappend`
- `linsert`
- `lreplace`
- `lsearch`
- `lsort`
    + `-integer`
    + `-real`
    + `-decreasing`

### String manipulating

- `split`

    split a string into a list

    ```sql
    split $string separator
    ```

- `join`

    join a list into a string

    ```tcl
    join $list delimiter
    ```

- `format`
    
    Similar to `printf` of C and PHP


- `scan`
    
    Scan a string into variables

    ```tcl
    scan $string "%format" variable list...
    ```

    ```tcl
    scan "a b c" "%c%c%c" first second third

    puts $first
    # a
    puts $second
    # b
    puts $third
    # c
    ```

### The `string` command

#### string compare

Returns 1, 0, -1 respectively when the first string is greater than, equal to, less than the second string.

```tcl
string compare $str1 $str2
```

#### string match

```tcl
string match pattern $string
```

**pattern** can contain

- `*` for any number of characters
- `?` for any single character

#### string first

Returns the first occurrence of the `$needle` in `$haystack`, `-1` if not found.

```tcl
string first $needle $haystack
```

#### string last

Similar to `string first`

#### string length

#### string index

Retrieve a character from given `index`.

```tcl
string index $string index
```

#### string range

#### string tolower
#### string toupper
#### string trimleft
#### string trimright

### append

```tcl
append string $string_list
```

```tcl
append paragraph This is a paragraph
Thisisaparagraph
```


## Arrays

```tcl
set key "arbitrary string"
set a($key) some_value
puts $a(arbitrary string)

set "a(arbitrary string)" some_value
puts $a(arbitrary string)
```

### size

```tcl
array size array_name
```

### names

Keys of the array, like `array_keys` of PHP

```tcl
array names array_name
```

## info

### exists

Returns 0 if variable not exists and 1 if does.

```tcl
info exists varaible_name
```

### locals

Returns list of local variables

```tcl
info locals pattern
```

```tcl
info locals mail*
```

### globals

Returns list of global variables.

### vars

Returns list of all variables, local and global.

### commands

All commands

### procs

Commands defined via command `proc`

### level

Command stack level.

If no `depth` given, it returns the depth of current command, or else it returns the `command name` and `arguments` of the stack in list

`?depth?` is a negative integer.

```tcl
info level ?depth?
```

```tcl
info level 0
# calling of current command
# cmd1 arg1 arg2 arg3 ...
info level -1
# calling of previous command
# cmd2 arg1 arg2 arg3 ...
```

### script

Current script name, like `__FILE__` of PHP

## unset

## Error Handling

### Command `catch`

1. Take its first argument and executes it, if error occurs, 1 will be returned, otherwise 0.
2. The `resultVaraibleName` contains either script's result or error message


```tcl
catch script ?resultVariableName? ?optionVarName?
```

**example**

```tcl
catch {cmd some arguments} returned_value

set returned_value
```

### Variable `errorInfo`

Global variable contains the last error information.

### Raising an error with command `error`

```tcl
error "some message"
```

## eval

Same as other languages.

## Passing by reference

### upvar

Bind variable to another variable.

```tcl
upvar ?level? otherVar localVar ?otherVar localVar ...?
```

- `level`

    1. Integer describe the number of levels up the procedure call stack.
    2. Integer precedes a `#` meaning absolute level, e.g. `#0` meaning the global.

- `otherVar`

    Variable name or value of the upper level

- `localVar`

    Variable name used locally

**example**

```tcl
proc test {a} {
    upvar a b
    set b 2
}

set a 1
test a
puts $a
# 2
```

#### passing array

```tcl
set age(lily) 18
set age(tom) 20

proc tell_age {age} {
    upvar age ages
    foreach name [array names ages] {
        puts "[string toupper $name] has age of $ages($name)"
    }
}

tell_age age
```

## File handling

- `stdin`
- `stdout`
- `stderr`

### open
### glob

```tcl
glob ?switches? name ?name ...?
```

#### special characters

- `*` Any number of characters
- `?` Any single character
- `[]` A range of character(s)
- `{}` A choice of strings
- `\` Literally a character

**example**

```tcl
# returns a list of all files ends with `.php`
glob *.php
```

