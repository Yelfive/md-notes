Preprocessing Directives
=========================

Preprocessing happened before compiling, this is handled by `preprocessor`.

Macro define
------------

Defines a macro, and then used as a placeholder in the program. 
And it will be replaced for its defined string when preprocessing.

It does the simple string replacing, and won't check syntax errors, which is done by compiler.

If something goes wrong about the `macro`, it will be reported at compiling time.

> Note:
> 
> - Does not allocate space in memory

### 1. Without parameters

```C
# define name string
# define name_1 name + 1
# undef name
```

### 2. With parameters


```C
# define name(parameters) string
```

> Note:
> 
> If you want to wrap the parameter, you should wrap it in the string.
> Example:

```C
# define prod(a, b) （a）* (b)

int main()
{
    int x = 1, y = 2;
    
    // equals to `(x + 1) * (y + 1)`
    // without parentheses, it will be `x + 1 * y +1`
    prod(x +1 , y + 1);
}

```

Include
-------

Include other C files, the suffix `.h` means header, 
which is just a hint of its usage, it can be `.c` or anything else

**system**

Search `system.h` from compiling system

```C
# include <system.h>
```

**custom**

With quotes, it first will looking for the file `custom.h` in current file directory, then search from the compiling system.
Any one found first will be used.

It's available to specify the header file with a path

```C
# include "custom.h"
```


Conditionally compile
---------------------

1.

```C
# ifdef macro_name
    // when macro defined
# else
    // when macro not defined
# endif
```

2.

```C
# ifndef macro_name
    // when macro not defined
# else
    // when macro defined
# endif
```

3.

```C
# if expression
    // when expression returns non-zero
# else
    // when expression returns zero
# endif

```
