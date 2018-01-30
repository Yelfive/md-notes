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

## mode bits

There three basic privileges indicated by integer:

1. `4` readable, binary `0B100`, a.k.a `r`
2. `2` writable, binary `0B010`, a.k.a `w`
3. `1` executable, binary `0B001`, a.k.a `x`

## chmod

Change file mode bits(privilege)

`chmod` accepts 4 types of roles:

1. `u` for user, owner
2. `g` for user group
3. `o` for others
4. `a` for all above

And as to set the privileges, there are three operators:

1. `=` Set the precise privilege
2. `-` Minus the given privilege (of specified role)
3. `+` Plus the given privilege (of specified role)

For example 

```bash
# change mode bits,
# plus write privilege to owner
# plus read privilege to group
# plus execute privilege to others
chmod u+w,g+r,o+x filename
```
   
> Note there should not be space after comma(`,`), otherwise the privilege parts after the space will be taken by `chmod` as file names

### Privilege of Directory

The privileges `rwx` for directories differs from that of files

- `r` Readable, 
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