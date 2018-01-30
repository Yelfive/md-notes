# File or Directory Privileges

```bash
> ls -l
drwxr-xr-x. 2 root root 4096 Jan 30 11:47 some-file
```

- The first character(`d`) means the file type, `d` for directory, `-` for file
- 2-4 characters for the privilege of owner, a.k.a `u`
- 5-7 characters for the privilege of group, a.k.a `g`
- 8-10 characters for the privilege of others, a.k.a `o`
- 2-10 is also known as `a`(for all)

## chmod

Change file mode bits(privilege)

`chmod` accepts 4 types of roles:

1. `u` for user, owner
2. `g` for user group
3. `o` for others
4. `a` for all above

用文本表示法修改权限
    文本表示法用4个字母表示不同的用户：
    u：所有者
    g：组成员
    o：其他成员
    a：所有人
    权限仍用r、w和x表示
    和数字表示法不同，文本表示法不仅可以重新指定权限，也可以在原来权限的基础上
    增加或减少权限，如下：
    =：重新制定权限
    -：对目前的设置减少权限
    +：对目前的设置增加权限
    例子：讲上述例子中，所有者加上执行权限，组成员减少执行权限，其他成员设置为
    执行权限，执行以下命令
    chmod u+x,g-x,o=x test
   
    注意：逗号前后不能有空格
目录权限
    目录权限的修改和文件权限修改不同，只是四种权限代表的含义如下：
    r：可列出目录中的内容
    w：可在目录中创建、删除和修改文件
    x：可以使用cd命令切换到此目录
    -：没有任何此目录的访问权限
    s:
          文件(set uid)：4，任何人访问，都以拥有者角色访问
          目录(set gid)：2，任何人访问，都以所有组角色访问
    t: sticky bit，1
    注：s/t 均针对x权限，添加方法：e.g. chmod 4777 file # set uid
    注意：目录可以使用通配符"*"来表示目录中的所有文件，如将/test目录中的所有文件
    的权限设置为任何人都可以读写
        chmod 666 /test/*
指定文件的默认权限掩码-----umask
    权限掩码有4个八进制的数字组成，讲现有的权限减掉权限掩码后，即可产生此文件建立
    时的默认权限。
    一般来说，新建文件的默认值是0666，新建目录的默认值是0777，如果将全线掩码设置
    为0002，则每个新建文件的默认权限为0666-0002=0664，而目录的默认权限则为775。
    可以直接输入umask命令来检查目前的默认权限掩码，或输入"umask 权限掩码"来指定默
    认权限掩码。
    用umask的方式指定默认权限掩码，可以避免添加访问权限过大的文件或目录。



ＴＨＥ　ＥＮＤ