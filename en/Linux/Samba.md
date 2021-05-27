Samba: sharing directory to windows
===

>　组成Samba运行的有两个服务，一个是SMB，另一个是NMB；SMB是Samba 的核心启动服务，主要负责建立 Linux Samba服务器与Samba客户机之间的对话， 验证用户身份并提供对文件和打印系统的访问，只有SMB服务启动，才能实现文件的共享，监听139 TCP端口；而NMB服务是负责解析用的，类似与DNS实现的功能，NMB可以把Linux系统共享的工作组名称与其IP对应起来，如果NMB服务没有启动，就只能通过IP来访问共享文件，监听137和138 UDP端口。

# 1. install

```bash
yum install -y samba
```


# 2. configure

> add samba user to configure login required

# 3. restart service

```bash
systemctl restart smb
systemctl restart nmb
```

# 4. create a system user

```bash
useradd username
```

# 5. create a samba user

```bash
# add a samba user
smbpasswd -a username
```

FAQ
===

1. NT_STATUS_ACCESS_DENIED listing

    > SELinux is preventing /usr/sbin/smbd from read access on the directory share.

        ```bash
        # The best solution is to allow sharing only chosen directories:
        /usr/sbin/semanage fcontext -a -t samba_share_t <path>

        #You can also allow SAMBA to share all directories:
        setsebool -P samba_export_all_ro 1
        ```


