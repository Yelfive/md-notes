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

    To represent a character literally

    ```tcl
    set money \$1000
    ```

