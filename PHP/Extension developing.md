Extension Developing
===

> PHP provides a tool for developing its extension, it resides in `php-src/ext` called `ext_skel`

```bash
cd ext
./ext_skel --extname=fk
```

Outputs:

```
Creating directory fk
Creating basic files: config.m4 config.w32 .gitignore fk.c php_fk.h CREDITS EXPERIMENTAL tests/001.phpt fk.php [done].

To use your new extension, you will have to execute the following steps:

1.  $ cd ..
2.  $ vi ext/fk/config.m4
3.  $ ./buildconf
4.  $ ./configure --[with|enable]-fk
5.  $ make
6.  $ ./sapi/cli/php -f ext/fk/fk.php
7.  $ vi ext/fk/fk.c
8.  $ make

Repeat steps 3-6 until you are satisfied with ext/fk/config.m4 and
step 6 confirms that your module is compiled into PHP. Then, start writing
code and repeat the last two steps as often as necessary.
```

# Two ways to install a extension

1. ./buildconf

    > To configure the extension to install when building php

2. phpize

    > To dynamically create a `xx.so` file to add to file `php.ini`

# make

- mac

    > If mac says: 'Undefined symbols for architecture x86_64', try the following

```bash
vim Makefile
CC cc -> CC gcc -m64
```


Coding
------

```C
PHP_FUNCTION (your_function_name)
{
    int first = 0, second = 0;
    int max;
    size_t len;
    zval res;

    if (zend_parse_parameters(ZEND_NUM_ARGS(), "ll", &first, &second, &len, &res) == FAILURE) {
        return ;
    }

    // Custom your coding here witch C
}
```

#### zend_parse_parameters

```C

int zend_parse_parameters(int num_args TSRMLS_DC, char *type_spec, ...)

int zend_parse_parameters_ex(int flags, int num_args TSRMLS_DC, char *type_spec, ...)

int zend_parse_parameter(int flags, int arg_num TSRMLS_DC, zval **arg, const char *spec, ...)
```

##### num_args

Number of arguments the function expects.
Passing `ZEND_NUM_ARGS()` to check the number of arguments.

##### type_spec

Similar to `scanf()` of C, specify types and receive the values by reference

spec    | PHP parameter type    | C variable type
---     | ---                   | ---
a       | array                 | zval*
A       | array/object          | zval*
b       | boolean               | zend_bool
C       | class                 | zend_class_entry*
d       | double                | double
f       | function              | zend_fcall_info*, zend_fcall_info_cache*
h       | array                 | HashTable*
H       | array/object          | HashTable*
l       | long                  | long
L       | long(limit out of range LONG_MAX/LONG_MIN)    | long
o       | object                | zval*
O       | object(of specified zend_class_entry) | zval*, zend_class_entry*
p       | string(a valid path)  | char*, int
r       | resource              | zval*
s       | string                | char*, int
z       | mixed                 | zval*
Z       | mixed                 | zvals

**Advanced Type Specifiers**

Spec    | Description
---     | ---
*       | a variable number of argument of the preceeding type, 0 or more
+       | a variable number of argument of the preceeding type, 1 or more
|       | indicates that the remaining parameters are optional
/       | SEPARATE_ZVAL_IF_NOT_REF on the parameter it follows
!       | the preceeding parameter can be of the specified type or null For 'b', 'l' and 'd', an extra argument of type zend_bool* must be passed after the corresponding bool*, long* or double* addresses which will be set true if null is recieved.

### Appendix

- [PHP扩展开发:第一个扩展][a]
- [PHP Internals 2][internals]

[a]: http://kimi.it/496.html
[internals]: http://php.net/manual/en/internals2.funcs.php





