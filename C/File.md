# File in C

`C` takes everything as files: `stdin`, `stdout`, `stderr` etc..

## `<stdio.h>`

Header `<stdio.h>` provides file handling functions.

### Text I/O

#### char

```c
#define getchar() fgetc(stdin)
char getchar(void)
#define putchar(ch) fputc(ch, stdout)
int putchar(char ch)
```

#### string

```c
int puts(char *str);
char *gets(char *str);
```
#### file

```c
FILE *fopen(char *filename, char *mode);
int   fgetc(FILE *fp);
int   fputc(int ch, FILE *fp);
char *fgets(char *str, int length, FILE *fp);
char *fputs(char *str, FILE *fp);

int fscanf (FILE *fp, char *format, args, ...);
int fprintf(FILE *fp, char *format, args, ...);
int fseek  (FILE *fp, long offset, int origin);
```

### Binary I/O

```c
int fread (void *buffer, int size, int n, FILE *fp);
int fwrite(void *buffer, int size, int n, FILE *fp);
```

### Details

#### putchar

```c
int putchar(char ch)
```

Returns `ch` on success, `EOF` on failure.

#### puts

```c
int puts(char *str)
```

Returns `\n` on success, `EOF` on failure

#### gets

```c
char *gets(char *str);
```

Returns starting address of `str` on success, `0` on failure.

