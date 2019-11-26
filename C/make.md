# make, cmake and automake



## make



Rule of  `makefile`:


```makefile
# define a placeholder
var = value
CC = gcc

# use $() to hold the place of `var`, like ${} in shell scripts
$(var)

# Generate two files: `main` and `secondary`
all: main secondary

# target:prerequisites
# output file:dependencies
# only the first file will be compiled, and the rest are just prerequisites
# and will be compiled when needed.
main: main.c some.o another.o
	# It must be a TAB in the front of the line below
	$(CC) main.c some.o
some.o: some.c
	$(CC) /path/to/some.o
secondary: someother.o
	$(CC) /path/to/someother.c

clean:
	rm -rf cache/*
	
install:
	cp path/to/executable /usr/local/bin
```



Built-in variables(see also: [GNU make: Automatic Variables](http://www.gnu.org/software/make/manual/html_node/Automatic-Variables.html#Automatic-Variables) )



```makefile
main: one.o two.o

$@ # The name of target, main
$% # Target member name
$< # The name of the first prerequisite
$? # The names of all the prerequisites that are newer than the target, with spaces between them. For prerequisites which are archive members, only the named member is used (see Archives).

$^ # The names of all the prerequisites, with spaces between them. For prerequisites which are archive members, only the named member is used (see Archives). A target has only one prerequisite on each other file it depends on, no matter how many times each file is listed as a prerequisite. So if you list a prerequisite more than once for a target, the value of $^ contains just one copy of the name. This list does not contain any of the order-only prerequisites; for those see the ‘$|’ variable, below.

$+ # This is like ‘$^’, but prerequisites listed more than once are duplicated in the order they were listed in the makefile. This is primarily useful for use in linking commands where it is meaningful to repeat library file names in a particular order.

$| # The names of all the order-only prerequisites, with spaces between them.

# The stem with which an implicit rule matches (see How Patterns Match). If the target is dir/a.foo.b and the target pattern is a.%.b then the stem is dir/foo. The stem is useful for constructing names of related files.
# In a static pattern rule, the stem is part of the file name that matched the ‘%’ in the target pattern.
# In an explicit rule, there is no stem; so ‘$*’ cannot be determined in that way. Instead, if the target name ends with a recognized suffix (see Old-Fashioned Suffix Rules), ‘$*’ is set to the target name minus the suffix. For example, if the target name is ‘foo.c’, then ‘$*’ is set to ‘foo’, since ‘.c’ is a suffix. GNU make does this bizarre thing only for compatibility with other implementations of make. You should generally avoid using ‘$*’ except in implicit rules or static pattern rules.
# If the target name in an explicit rule does not end with a recognized suffix, ‘$*’ is set to the empty string for that rule.
$*
```



Related commands

```bash
# Compile the first file in the makefile
# or do as `all` defines
make
make install
make clean
```



## automake





## Refereces



- [C实战：项目构建Make,Automake,CMake - 西代零零发 - CSDN博客](https://blog.csdn.net/dc_726/article/details/48978849) 