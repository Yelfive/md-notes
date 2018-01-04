Commands
===

> Bashes accepts input with wildcard character
> 
> - `*` matches arbitrary number of characters
> - `?` matches any single character
> - `[]` matches single character specified inside

### cat

> cat [options] file [file...]

**options**

- `n`  show line number

### less

+ `/` to search for a pattern
+ ` `(space) to go to next page
+ `b` to go to previous page

### grep

> grep [option] pattern [files]

### find

> find [option] [path] [expression]

**expression options**

+ `-type` 

    > Find particular type of files

    * `b` block device
    * `c` character device
    * `d` directory
    * `f` file
    * `p` pipe
    * `l` link

+ `-atime`
    
    > last access time, `+n` means more than n days, `-n` means less than n days

    ```bash
    find / -atime +10 # find files with last access time over ten days    
    ```

+ `-mtime`

    > Last modified time, `+-n` same as `-atime`

+ `-name`

    > Find with name

+ `-exec`
    
    To execute command according to `find` result.

    `{}` to stand for each line of the find `result`.

    **example:** Copy directory structure:

    ```bash
    find docker/mariadb -type d -exec mkdir -p ./environments/dev/{} \;
    ```

    The tailing `\;` is to escape the semicolon for `-exec`, not for the `find` command.

### locate

> Locate a particular file, similar to find, but much faster.
>
> It uses a database to store all file names, and search it from the database.
> 
> The updating is done automatically at background, however, it can also be done by calling `updatedb`, which will take some time

### updatedb

> Update the database for command `locate` 

**mac**

> Command locates at `/usr/libexec/locate.updatedb`

**storage**

> Database file at /var/db/locate.database

### terminating `&`

> It hangs a command and run it as a daemon

```shell
# runs  firefox as daemon
firefox &
```

### whereis

### who

> Who logged into this system, and when

### whoami

```shell
whoami
```

> Who am I, the user logged in

### uname

> Version information of the system

- `-a`      Behave as though all of the options -mnrsv were specified.
- `-m`      print the machine hardware name.
- `-n`      print the nodename (the nodename may be a name that the system is known by to a communications network).
- `-p`      print the machine processor architecture name.
- `-r`      print the operating system release.
- `-s`      print the operating system name.
- `-v`      print the operating system version.

### man

> manual for commands, divided into 9 episodes, located in `\usr\share\man\`

Episode |What's for     |Chinese
---     |---            |---
1       |Common commands and applications|普通命令和应用程序
2       |System calling|系统调用
3       |Library calling, mainly aboutfunction libc() |库调用，主要是libc()函数的使用文档
4       |Device driver or network  protocol|设备驱动和网络协议
5       |Details of the file format|文件的详细格式信息
6       |Games|游戏
7       |Document instruction|文档使用说明
8       |System management command|系统管理命令
9       |Kernel source code or module's tech indicator|模块的技术指标

### whatis

> Brief description of the command

```
whatis command
```

### apropos

> Search commands that used the *brief description*

```
apropos description
```


# File System

### touch

> Create a file or renew its last modify time

### chown

> Change owner

```
chown [options] [owner][:group] /path/to/files
```

1. chown **owner** some_file
2. chown **:group** some_file

### chgrp

> Change group of a file/dir

### chmod

> Change mode of file(s)

```shell
# set the privileges to groups
> chmod [groups+/-privilege][,groups+/-privilege] file
> chmod ug+w,o+x file
# set the dest group to have all privileges of src_grop
> chmod dest_group=src_group file
```

**chmod usergoup+/-privilege**

- group
    + `u` user, owner
    + `g` group
    + `o` others
    + `a` all
- privilege
    + `r`
    + `w`
    + `x`

### ls

> List the files

```
> ls -l
-rwxrwxrwx 1 root root 4096 yyyy-mm-dd hh:ii path/to/file

- type
- privilege
- hard-link count
- owner id or name 
- group id or name
- size
- last modified date
- last modified time
- file name
```

- `-1`  One column output
- `-a`  Include entries which start with .
- `-A`  Like -a, but exclude . and ..
- `-C`  List by columns
- `-x`  List by lines
- `-d`  List directory entries instead of contents
- `-L`  Follow symlinks
- `-H`  Follow symlinks on command line
- `-R`  Recurse
- `-p`  Append / to dir entries
- `-F`  Append indicator (one of */=@|) to entries
- `-l` Long listing format
- `-i` List inode numbers
- `-n` List numeric UIDs and GIDs instead of names
- `-s` List allocated blocks
- `-e` List full date and time
- `-h` List sizes in human readable format (1K 243M 2G)
- `-r` Sort in reverse order
- `-S` Sort by size
- `-X` Sort by extension
- `-v` Sort by version
- `-c` With -l: sort by ctime
- `-t` With -l: sort by mtime
- `-u` With -l: sort by atime


### apt-get

- install
- source
- remove
- update
- upgrade
- clean

### apt-cache

- search

### mount

- `t` Specify file system type. Not used most of the time, auto-detected by `mount`
- `-r` File system readable
- `-w` **default**. File system writable

### nmap

> Scan given server for ports information, by default it scans only the common ports, this can be override by specifying a port range

```
> nmap -A xxx.xxx -p port_range

Starting Nmap 7.50 ( https://nmap.org ) at 2017-07-17 15:06 CST
Nmap scan report for mylord.cn (114.215.84.179)
Host is up (0.13s latency).

PORT    STATE    SERVICE     VERSION
139/tcp filtered netbios-ssn

```

###### STATE

- open

    > 应用程序正在该端口接收TCP 连接或者UDP报文。发现这一点常常是端口扫描 的主要目标。安全意识强的人们知道每个开放的端口 都是攻击的入口。攻击者或者入侵测试者想要发现开放的端口。 而管理员则试图关闭它们或者用防火墙保护它们以免妨碍了合法用户。 非安全扫描可能对开放的端口也感兴趣，因为它们显示了网络上那些服务可供使用。

- closed
    
    > 关闭的端口对于Nmap也是可访问的(它接受Nmap的探测报文并作出响应)， 但没有应用程序在其上监听。 它们可以显示该IP地址上(主机发现，或者ping扫描)的主机正在运行up 也对部分操作系统探测有所帮助。 因为关闭的关口是可访问的，也许过会儿值得再扫描一下，可能一些又开放了。 系统管理员可能会考虑用防火墙封锁这样的端口。 那样他们就会被显示为被过滤的状态，下面讨论。

- filtered

    > 由于包过滤阻止探测报文到达端口， Nmap无法确定该端口是否开放。过滤可能来自专业的防火墙设备，路由器规则 或者主机上的软件防火墙。这样的端口让攻击者感觉很挫折，因为它们几乎不提供 任何信息。有时候它们响应ICMP错误消息如类型3代码13 (无法到达目标: 通信被管理员禁止)，但更普遍的是过滤器只是丢弃探测帧， 不做任何响应。 这迫使Nmap重试若干次以访万一探测包是由于网络阻塞丢弃的。 这使得扫描速度明显变慢。

- unfiltered

    > 未被过滤状态意味着端口可访问，但Nmap不能确定它是开放还是关闭。 只有用于映射防火墙规则集的ACK扫描才会把端口分类到这种状态。 用其它类型的扫描如窗口扫描，SYN扫描，或者FIN扫描来扫描未被过滤的端口可以帮助确定 端口是否开放。

- openfiltered

    > 当无法确定端口是开放还是被过滤的，Nmap就把该端口划分成 这种状态。开放的端口不响应就是一个例子。没有响应也可能意味着报文过滤器丢弃 了探测报文或者它引发的任何响应。因此Nmap无法确定该端口是开放的还是被过滤的。 UDP，IP协议， FIN，Null，和Xmas扫描可能把端口归入此类。

- closefiltered

    > 该状态用于Nmap不能确定端口是关闭的还是被过滤的。 它只可能出现在IPID Idle扫描中。

### iconv

> Convert file encoding into another and output the result to standard output or file specified by `-o` option

```bash
iconv -f from_encoding -t to_encoding [-o output_file] source_file
```


### read

Reads words from input, and separated by `$IFS`(with default to be `\n`)

One line is read from the standard input, or from the file descriptor `fd` supplied as an argument to the `-u` option, and the first word is assigned to the first name, the second word to the second name, and so on, with leftover words and their intervening separators assigned to the last name. If there are fewer words read from the input stream than names, the remaining names are assigned empty values. The characters in `IFS` are used to split the line into words.  The backslash character (\\) may be used to remove any special meaning for the next character read and for line continuation.

```bash
read [-ers] [-a aname] [-d delim] [-i text] [-n nchars] [-N nchars] [-p prompt] [-t timeout] [-u fd] [name ...]
# Using `:` as field separator
IFS=: read w1 w2
```

```text

-e     If  the  standard  input is coming from a terminal, readline (see READLINE above) is used to obtain the line.  Readline uses the current (or default, if line editing was not previously
     active) editing settings.
-i text
     If readline is being used to read the line, text is placed into the editing buffer before editing begins.
-N nchars
     read returns after reading exactly nchars characters rather than waiting for a complete line of input, unless EOF is encountered or read times out.  Delimiter characters encountered in
     the input are not treated specially and do not cause read to return until nchars characters are read.
-t timeout
     Cause read to time out and return failure if a complete line of input is not read within timeout seconds.  timeout may be a decimal number with a fractional portion following the decimal point.  This option is only effective if read is reading input from a terminal, pipe, or other special file; it has no effect when reading from regular files.   If  timeout  is  0, read returns success if input is available on the specified file descriptor, failure otherwise.  The exit status is greater than 128 if the timeout is exceeded.
-u fd  Read input from file descriptor fd.

If no names are supplied, the line read is assigned to the variable `REPLY`.  The return code is zero, unless end-of-file is encountered, read times out (in which case the return code is greater than 128), or an invalid file descriptor is supplied as the argument to -u.
```

#### options

- `a` Array

    ```bash
    read -a name
    ```

     The words are assigned to sequential indices of the array variable `name`, starting at 0. `name` is unset before any new values are assigned. Other name arguments are ignored.

    ```bash
    $ read -a array
    hello world to you
    $ echo ${array[3]} ${array[2]} ${array[1]} ${array[0]}
    you to world hello
    ```

- `p` Prompt

     Display prompt on standard error, without a trailing newline, before attempting to read any input. The prompt is displayed only if input is coming from a terminal.

    ```bash
    read -p "Are you sure to do so? [y/n]" confirmed
    ```

- `t` Timeout in seconds

    A timeout for the read operation, after the given timeout, exit code greater than 0 will be returned.

- `n`  Number of characters
    
    Read returns after reading `n` characters rather than waiting for a complete line of input, but honor a delimiter if fewer than `n` characters are read before the delimiter.

    ```bash
    # Wishes for only one character
    read -n 1 'Are you sure? [y/n]' answer

    case ${answer} in
        y|Y)
            echo 'You are sure';;
        n|N)
            echo 'You are not sure';;
        ?)
            echo 'Invalid input'
            exit
            ;;
    esac
    ```

- `s` Silently

    Input silently, without showing in the terminal, such as password

    ```bash
    read -s -p 'Enter your password:' password
    ```

- `r` Remove

    Backslash does not act as an escape character. The backslash is considered to be part of the line. In particular, a backslash-newline pair may not be used as a line continuation.

    ```bash
    $ read hello
    \n
    $ echo ${hello}
    n
    
    $ read -r hello
    \n
    $ echo ${hello}
    \n
    ```

- `d` Delimiter

    The first character of delimiter is used to terminate the input line, rather than newline.

    ```bash
    $ read -d e -p 'Filename, end with `e`' filename
    hello # exits when e typed
    $ echo ${filename}
    h
    ```

- `e` ??
- Read file

    `cat` a file and pipe(`|`) it to `while read`

    ```bash
    count=1
    cat filename | while read line
    do 
       echo "${count}: ${line}" 
       count=$(($count + 1))
    done
    ```

**See Also** http://blog.csdn.net/flowingflying/article/details/5326696

### kill

```bash
kill [-s signal|-p] [-q sigval] [-a] [--] pid...
kill -l [signal]
```

To send signal to process or to list available signal.

### lsof

```bash
# list process with port 80
lsof -i :80
# list 
lsof -P 
```
