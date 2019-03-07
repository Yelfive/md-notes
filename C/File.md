# File in C

`C` takes everything as files: `stdin`, `stdout`, `stderr` etc..

## `<stdio.h>`

Header `<stdio.h>` provides file handling functions.

### functions

<!-- Function | Description -->
```c
FILE *fopen(char *filename, char *mode)
int   fgetc(FILE *fp)
int   fputc(int ch, FILE *pf)
char *fgets(char *str, int length, FILE *fp)
char *fputs(char *str, FILE *fp)

fcanf(FILE *fp, char *format, args, ...)
```
#### Binary read/write

```c
int fread (void *buffer, int size, int n, FILE *fp)
int fwrite(void *buffer, int size, int n, FILE *fp)
```
