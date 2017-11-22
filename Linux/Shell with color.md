Shell with color
================

     echo -e "\033[41;36m 红底绿字\033[0m"

    其中41的位置代表底色, 36的位置是代表字的颜色
    那些ascii code 是对颜色调用的始末.
    \033[m …… \033[0m
    字背景颜色范围:40----49

Value| Color    |
--|--           |
40|black        |
41|dark red     |
42|green        |
43|yellow       |
44|blue         |
45|purple       |
46|dark green   |
47|white        |

    字颜色:30-----------39
    30:黑
    31:红
    32:绿
    33:黄
    34:蓝色
    35:紫色
    36:深绿
    37:白色
    ===============================================ANSI控制码的说明
    \33[0m 关闭所有属性
    \33[1m 设置高亮度
    \33[4m 下划线
    \33[5m 闪烁
    \33[7m 反显
    \33[8m 消隐
    \33[30m -- \33[37m 设置前景色
    \33[40m -- \33[47m 设置背景色
    \33[nA 光标上移n行
    \33[nB 光标下移n行
    \33[nC 光标右移n行
    \33[nD 光标左移n行
    \33[y;xH设置光标位置
    \33[2J 清屏
    \33[K 清除从光标到行尾的内容
    \33[s 保存光标位置
    \33[u 恢复光标位置
    \33[?25l 隐藏光标
    \33[?25h 显示光标

php -r "echo \">\033[31mError\033[0m  \""

输出：
<font color="red">Error</font>

## echo

```shell
echo -e something
```

- `-e` escape
- `-n` Do not print trailing `\n`, same as `echo -e "\c"`

| Escape | Description |
|--|--|
| \\\|backslash
| \a|alert (BEL)
| \b| backspace
| \c|produce no further output, useful when want to echo something with format
| \e| escape
| \f| form feed
| \n| new line
| \r| carriage return
| \t| horizontal tab
| \v| vertical tab

**prints inline 'hello world' with world being red**

```bash
echo -e "hello\c"
echo -e "\033[31mworld\033[0m"
```


