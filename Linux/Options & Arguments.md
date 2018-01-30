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

```bash
':a:b'
```

This means error tolerant, if the `a:` doesn't provided a value, no error will be raised.

### Variable

This is simply where the value stored

### ${OPTARG}

In a loop, `${OPTARG}` means the value for current option

### ${OPTIND}

In a loop, `${OPTIND}` means the index of **next value** in `$*` list

```bash
test.sh -p project_name -others
# `$*` is '-p project_name -others'
# when ${OPTARG} is 'p', ${OPTIND} will be 3

test.sh -pproject_name -others
# `$*` is '-pproject_name -others'
# ${OPTIND} will be 2
```

### shift options

To strip all the options, leave the arguments only.

```shell
shift $((${OPTIND} - 1))
```

**example**

```bash
test.sh -p hello world to you
# 'hello' is value of `-p`
# `shift $((${OPTIND} - 1))` will result $*='world to you'
```
