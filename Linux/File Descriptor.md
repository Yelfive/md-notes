# File Descriptor

File descriptor using an integer to represent the handler of a file or device.

The system defined three descriptors already:

- `0` stdin
- `1` stdout
- `2` stderr

## Define a descriptor

Command `exec` can be used to define a descriptor

```bash
exec 3> path/to/filename
```

And the descriptor follow these rules:

1. Descriptor is an integer
2. Descriptor is allowed from `3` to what `ulimit -n` allows
3. **Notice**
    3.1 No space after descriptor, `3` in this case
    3.2 Space after redirection operator `>`

After definition, it is available to access the file `path/to/filename` with this descriptor:

```bash
echo something >&3 # Notice no space between `>` and `&`
```

[文件描述符] File descriptor
    It defines a handler for a file/device
    ```sh
    exec 3> my_file
    ```
    1. Descriptor is an integer
    2. Descriptor should from 3 to `ulimit -n`
    3. Notice:
        3.1 No space after '3'
        3.2 Space after '>'
    ```sh
    echo 123 >&3; // 
    cat my_file // output 123
    ```
    [write]
        n> sth
    [read]
        n< sth


[命令重定向]
1. >
2. >>
3. <
4. <<


[3个默认的I/O描述符]
    在命令初始化是分配默认描述符
    - 0 是标准输入，一般是键盘；
    - 1 是标准输出，一般是屏幕了；
    - 2 是标准错误。

[空设备]
    - /dev/null
    任何重定向到该设备的输入都会消失

THE END