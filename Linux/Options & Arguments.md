# Options & Arguments

## Options

> `getopts` is a built-in command of shell

```shell
getopts string_opt_list variable
```

```shell
# test.sh
while getopts 'a:b' opt
do
    case ${opt} in
        a) 
            # do something like
            echo $OPTARG
            ;;
        b)
            # do something like
            echo 'option b is set'
            ;;
        ?)
            # do something like
            echo 'Illegal option '${opt}
            exit 1;;
    esac
done
```

### String option list: 'a:b'

First argument is the option list, each option is one character.

The `:` after each option means the option has value(in this case, `a` must own a value), while the ones without the colon cannot have a value(`b` in this case)

```bash
./test.sh -a hello -b
```

### String option list start with colon `:`

This means error tolerant, if the `a:` doesn't provided a value, no error will be raised.

### Variable

This is simply where the value stored

### ${OPTARG}

In a loop, `${OPTARG}` means the value for current option

### #{OPTIND}

In a loop, `${OPTIND}` means the index of **next value** in `$*` list

```bash
test.sh -p project_name
# index for -p is 2
```
