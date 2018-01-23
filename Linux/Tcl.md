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
    ```

- comment start with `#`
- semicolon `;` act same as `C`

## \[]

executes a command and returns its value

```tcl
# prints the current process id
echo The pid is [pid]
```
    