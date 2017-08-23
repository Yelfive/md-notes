Pointer
=======

The entry address of variable, array or even function.

### Basic Pointer

```C
// pointer to variable
int *p;
```

### Pointer to an array

```C
// pointer to array
int (*p)[10];
```

### Array of Pointers

```C
// an array of pointers
int * p[10]
```

### Pointer to a function

```C
// pointer to function
int (*p)(int, int);
```

### Function returns a pointer

```C
// function returns a pointer
int *p(int x, int y) {

}
```

Notice:
-------

－ Char pointer to a string without pointing to an char array, its element can not be changed


    ```
    char *p = "hello world";
    *(p + 1) = 'a'; // Invalid, cannot be changed
    ```


