# Options & Arguments

## Options

> `getopts` is a built-in command of shell

```shell
getopts string_opt_list variable
```

```shell
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

The `:` after each option means the option has value(in this case, `a` must hold a value), other wise

```shell
while getopts 'a:'
```
