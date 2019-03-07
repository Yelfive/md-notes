# File in C

`C` takes everything as files: `stdin`, `stdout`, `stderr` etc..

## `<stdio.h>`

Header `<stdio.h>` provides file handling functions.

### Text I/O

<!-- Function | Description -->
```c
#define getchar() fgetc(stdin)
char getchar(void)
#define putchar(c) fputc(c, stdout)
int putchar(char c)
int puts
char *gets()
```
```c
FILE  *fopen(char *filename, char *mode)
int   fgetc(FILE *fp)
int   fputc(int ch, FILE *pf)
char *fgets(char *str, int length, FILE *fp)
char *fputs(char *str, FILE *fp)

int fscanf (FILE *fp, char *format, args, ...)
int fprintf(FILE *fp, char *format, args, ...)
```
#### Binary I/O

```c
int fread (void *buffer, int size, int n, FILE *fp)
int fwrite(void *buffer, int size, int n, FILE *fp)
```
