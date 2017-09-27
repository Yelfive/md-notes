awk
===

Basics
------

Search every line of a `file`, take `action` when `pattern` matches.

```bash
awk -Ffs '/pattern/ {action}' file
```

`-F` To set a file separator, which default to be space

** Example: 'a b:c d'**
```bash
> echo 'a b:c d' | awk '{print $1}'
a
> echo 'a b:c d' | awk -F : '{print $1}'
a b
```

Conversion Format
-----------------

- `$0` The matched line
- `$1` The first field
- `$n` The n<sup>th</sup> field

Variables
---------

```
ARGC               命令行参数个数
ARGV               命令行参数排列
ENVIRON            支持队列中系统环境变量的使用
FILENAME           awk浏览的文件名
FNR                浏览文件的记录数
FS                 设置输入域分隔符，等价于命令行 -F选项
NF                 浏览记录的域的个数
NR                 已读的记录数
OFS                输出域分隔符
ORS                输出记录分隔符
RS                 控制记录分隔符
```

Patterns
--------

**BEGIN**

Matches the beginning of the **file**, then perform the subsequent `action`

This takes place for the whole file, not for one line

```bash
> echo 'a b:c d' | awk 'BEGIN {FS=":"} {print $1}'
a b
```

**END**

Matches the end of the *file*, then perform the subsequent `action`

```bash
> ls -l | awk '{count++} END {print count}'
18
```

This prints out the number of lines, 18 in the example above

Appendix
--------

- http://www.cnblogs.com/ggjucheng/archive/2013/01/13/2858470.html
- http://www.gnu.org/software/gawk/manual/gawk.html