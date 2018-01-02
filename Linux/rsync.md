# rsync

`rsync`, short for `Remote Synchronize`. It compares the differences between files and download or upload to a destination

**Usage**

```bash
rsync [OPTION...] SRC... [DEST]
```

## 一、什么是rsync

rsync，remote synchronize 顾名思意就知道它是一款实现远程同步功能的软件，它在同步文件的同时，可以保持原来文件的权限、时间、软硬链接等附加信息。 rsync是用 “rsync 算法”提供了一个客户机和远程文件服务器的文件同步的快速方法，而且可以通过ssh方式来传输文件，这样其保密性也非常好，另外它还是免费的软件。
rsync 包括如下的一些特性：

能更新整个目录和树和文件系统；
有选择性的保持符号链链、硬链接、文件属于、权限、设备以及时间等；
对于安装来说，无任何特殊权限要求；
对于多个文件来说，内部流水线减少文件等待的延时；
能用rsh、ssh 或直接端口做为传输入端口；
支持匿名rsync 同步文件，是理想的镜像工具；

## 二、架设rsync服务器

  架设rsync 服务器比较简单，写一个配置文件rsyncd.conf 。文件的书写也是有规则的，我们可以参照rsync.samba.org 上的文档来做。当然我们首先要安装好rsync这个软件才行；

### 2.1 Installation

Official Site can be found [here][rsync]

#### 2.1.1 Install binary

```bash
# Debian, Ubuntu e.t.c
apt-get install rsync
# Fedora, RedHat e.t.c
yum install rsync
# Fedora, RedHat with rpm
rpm -ivh rsync
```

其它Linux发行版，请用相应的软件包管理方法来安装。

#### 2.1.2 Install from source

```bash
tar xvf  rsync-xxx.tar.gz
cd rsync-xxx
./configure --prefix=/usr
make
make install
```

> 注：在用源码包编译安装之前，您得安装gcc等编译开具才行；
   
### B、配置文件

rsync的主要有以下三个配置文件rsyncd.conf(主配置文件)、rsyncd.secrets(密码文件)、rsyncd.motd(rysnc服务器信息)

服务器配置文件(/etc/rsyncd.conf)，该文件默认不存在，请创建它。

具体步骤如下：

#### 1. Create a configuration file

```bash
touch /etc/rsyncd.conf
```

```conf
# Distributed under the terms of the GNU General Public License v2
# Minimal configuration file for rsync daemon
# See rsync(1) and rsyncd.conf(5) man pages for help

# This line is required by the /etc/init.d/rsyncd script
pid file = /var/run/rsyncd.pid  
port = 873
address = 192.168.1.171 
#uid = nobody
#gid = nobody   
uid = root  
gid = root 

use chroot = yes 
read only = yes

#limit access to private LANs
hosts allow=192.168.1.0/255.255.255.0 10.0.1.0/255.255.255.0 
hosts deny=*

max connections = 5
motd file = /etc/rsyncd.motd

#This will give you a separate log file
#log file = /var/log/rsync.log

#This will log every file transferred - up to 85,000+ per user, per sync
#transfer logging = yes

log format = %t %a %m %f %b
syslog facility = local3
timeout = 300

[rhel4home]  
path = /home   
list=yes
ignore errors
auth users = root
secrets file = /etc/rsyncd.secrets 
comment = This is RHEL 4 data 
exclude = easylife/  samba/    

[rhel4opt]
path = /opt
list=no
ignore errors
comment = This is RHEL 4 opt
auth users = easylife
secrets file = /etc/rsyncd/rsyncd.secrets
```

#### Create and grant a secret file(user access)

```bash
touch /etc/rsyncd.secrets
chmod 600 /etc/rsyncd.secrets
```

#### <font color="red">what's this</font>

```bash
touch /etc/rsyncd.motd
```

下一就是我们修改rsyncd.conf和rsyncd.secrets和rsyncd.motd文件的时候了。

设定 /etc/rsyncd.conf

rsyncd.conf是rsync服务器主要配置文件。我们先来个简单的示例，后面在详细说明各项作用。

比如我们要备份服务器上的/home和/opt，在/home中我想把easylife和samba目录排除在外；

  注：关于auth users是必须在服务器上存在的真实的系统用户，如果你想用多个用户以,号隔开，比如auth users = easylife,root

  设定密码文件

  密码文件格式很简单，rsyncd.secrets的内容格式为：

  用户名:密码

  我们在例子中rsyncd.secrets的内容如下类似的；在文档中说，有些系统不支持长密码，自己尝试着设置一下吧。

  easylife:keer
  root:mike

  chown root.root rsyncd.secrets  #修改属主
  chmod 600 rsyncd.secrets     #修改权限

  注：1、将rsyncd.secrets这个密码文件的文件属性设为root拥有, 且权限要设为600, 否则无法备份成功!            出于安全目的，文件的属性必需是只有属主可读。
    2、这里的密码值得注意，为了安全你不能把系统用户的密码写在这里。比如你的系统用户easylife密码是000000，为了安全你可以让rsync中的easylife为keer。这和samba的用户认证的密码原理是差不多的。

  设定rsyncd.motd 文件;

   它是定义rysnc服务器信息的，也就是用户登录信息。比如让用户知道这个服务器是谁提供的等；类似ftp服务器登录时，我们所看到的 linuxsir.org ftp ……。 当然这在全局定义变量时，并不是必须的，你可以用#号注掉，或删除；我在这里写了一个 rsyncd.motd的内容为：

  ++++++++++++++++++++++++++++++++++++++++++++++
  Welcome to use the mike.org.cn rsync services!
           2002------2009
  ++++++++++++++++++++++++++++++++++++++++++++++

### 三、rsyncd.conf服务器的配置详解

A、全局定义

  在rsync 服务器中，全局定义有几个比较关健的，根据我们前面所给的配置文件 rsyncd.conf 文件；

  pid file = /var/run/rsyncd.pid   注：告诉进程写到 /var/run/rsyncd.pid 文件中；
  port = 873  注：指定运行端口，默认是873，您可以自己指定；
  address = 192.168.1.171  注：指定服务器IP地址
  uid = nobody  
  gid = nobdoy 

   注：服务器端传输文件时，要发哪个用户和用户组来执行，默认是nobody。 如果用nobody 用户和用户组，可能遇到权限问题，有些文件从服务器上拉不下来。所以我就偷懒，为了方便，用了root 。不过您可以在定义要同步的目录时定义的模块中指定用户来解决权限的问题。

  use chroot = yes

   注：用chroot，在传输文件之前，服务器守护程序在将chroot 到文件系统中的目录中，这样做的好处是可能保护系统被安装漏洞侵袭的可能。缺点是需要超级用户权限。另外对符号链接文件，将会排除在外。也就是说，你在 rsync服务器上，如果有符号链接，你在备份服务器上运行客户端的同步数据时，只会把符号链接名同步下来，并不会同步符号链接的内容；这个需要自己来尝 试

  read only = yes

  注：read only 是只读选择，也就是说，不让客户端上传文件到服务器上。还有一个 write only选项，自己尝试是做什么用的吧；

  #limit access to private LANs
  hosts allow=192.168.1.0/255.255.255.0 10.0.1.0/255.255.255.0

  注：在您可以指定单个IP，也可以指定整个网段，能提高安全性。格式是ip 与ip 之间、ip和网段之间、网段和网段之间要用空格隔开；

  max connections = 5  

  注：客户端最多连接数

  motd file = /etc/rsyncd/rsyncd.motd

  注：motd file 是定义服务器信息的，要自己写 rsyncd.motd 文件内容。当用户登录时会看到这个信息。比如我写的是：

  ++++++++++++++++++++++++++++++++++++++++++++++
  Welcome to use the mike.org.cn rsync services!
           2002------2009
  ++++++++++++++++++++++++++++++++++++++++++++++

  log file = /var/log/rsync.log

  注：rsync 服务器的日志；

  transfer logging = yes

  注：这是传输文件的日志

  log format = %t %a %m %f %b
  syslog facility = local3
  timeout = 300

B、模块定义

   模块定义什么呢？主要是定义服务器哪个目录要被同步。每个模块都要以[name]形式。这个名字就是在rsync 客户端看到的名字，其实有点象Samba服务器提供的共享名。而服务器真正同步的数据是通过path 指定的。我们可以根据自己的需要，来指定多个模块。每个模块要指定认证用户，密码文件、但排除并不是必须的

  下面是前面配置文件模块的例子：

  [rhel4home]  #模块它为我们提供了一个链接的名字，在本模块中链接到了/home目录；要用[name] 形式

  path = /home    #指定文件目录所在位置，这是必须指定的
  auth users = root   #认证用户是root  ，是必须在服务器上存在的用户
  list=yes   #list 意思是把rsync 服务器上提供同步数据的目录在服务器上模块是否显示列出来。默认是yes 。如果你不想列出来，就no ；如果是no是比较安全的，至少别人不知道你的服务器上提供了哪些目录。你自己知道就行了；
  ignore errors  #忽略IO错误
  secrets file = /etc/rsyncd.secrets   #密码存在哪个文件
  comment = linuxsir home  data  #注释可以自己定义
  exclude = beinan/ samba/    

  注：exclude是排除的意思，也就是说，要把/home目录下的easylife和samba排除在外； easylife/和samba/目录之间有空格分开

  [rhel4opt] 
  path = /opt
  list=no
  comment = optdir  
  auth users = beinan 
  secrets file = /etc/rsyncd/rsyncd.secrets
  ignore errors

四、启动rsync服务器及防火墙的设置

  启动rsync服务器相当简单，有以下几种方法

  A、--daemon参数方式，是让rsync以服务器模式运行

  #/usr/bin/rsync --daemon  --config=/etc/rsyncd/rsyncd.conf  #--config用于指定rsyncd.conf的位置,如果在/etc下可以不写

  B、xinetd方式

  修改services加入如下内容
  # nano -w /etc/services

  rsync  873/tcp  # rsync
  rsync  873/udp  # rsync

  这一步一般可以不做，通常都有这两行(我的RHEL4和GENTOO默认都有)。修改的目的是让系统知道873端口对应的服务名为rsync。如没有的话就自行加入。

  设定 /etc/xinetd.d/rsync, 简单例子如下:

  # default: off
  # description: The rsync server is a good addition to am ftp server, as it \
  #       allows crc checksumming etc.
  service rsync
  {
        disable = no
        socket_type     = stream
        wait            = no
        user            = root
        server          = /usr/bin/rsync
        server_args     = --daemon
        log_on_failure  += USERID
  }

  上述, 主要是要打开rsync這個daemon, 一旦有rsync client要连接時, xinetd会把它转介給 rsyncd(port 873)。然后service xinetd restart, 使上述设定生效.

  rsync服务器和防火墙

  Linux 防火墙是用iptables，所以我们至少在服务器端要让你所定义的rsync 服务器端口通过，客户端上也应该让通过。

  #iptables -A INPUT -p tcp -m state --state NEW  -m tcp --dport 873 -j ACCEPT
  #iptables -L  查看一下防火墙是不是打开了 873端口

  如果你不太懂防火墙的配置，可以先service iptables stop 将防火墙关掉。当然在生产环境这是很危险的，做实验才可以这么做哟！
五、通过rsync客户端来同步数据

A、语法详解

  在配置完rsync服务器后，就可以从客户端发出rsync命令来实现各种同步的操作。rsync有很多功能选项，下面就对介绍一下常用的选项：

  rsync的命令格式可以为：
 
  1. rsync [OPTION]... SRC [SRC]... [USER@]HOST:DEST
  2. rsync [OPTION]... [USER@]HOST:SRC DEST
  3. rsync [OPTION]... SRC [SRC]... DEST
  4. rsync [OPTION]... [USER@]HOST::SRC [DEST]
  5. rsync [OPTION]... SRC [SRC]... [USER@]HOST::DEST
  6. rsync [OPTION]... rsync://[USER@]HOST[:PORT]/SRC [DEST]

  rsync有六种不同的工作模式：

  1. 拷贝本地文件；当SRC和DES路径信息都不包含有单个冒号":"分隔符时就启动这种工作模式。
  2.使用一个远程shell程序（如rsh、ssh）来实现将本地机器的内容拷贝到远程机器。当DST路径地址包含单个冒号":"分隔符时启动该模式。
  3.使用一个远程shell程序（如rsh、ssh）来实现将远程机器的内容拷贝到本地机器。当SRC地址路径包含单个冒号":"分隔符时启动该模式。
  4. 从远程rsync服务器中拷贝文件到本地机。当SRC路径信息包含"::"分隔符时启动该模式。
  5. 从本地机器拷贝文件到远程rsync服务器中。当DST路径信息包含"::"分隔符时启动该模式。
  6. 列远程机的文件列表。这类似于rsync传输，不过只要在命令中省略掉本地机信息即可。
  -a 以archive模式操作、复制目录、符号连接 相当于-rlptgoD

  rsync中的参数

  -r 是递归
  -l 是链接文件，意思是拷贝链接文件；-p 表示保持文件原有权限；-t 保持文件原有时间；-g 保持文件原有用户组；-o 保持文件原有属主；-D 相当于块设备文件；
  -z 传输时压缩；
  -P 传输进度；
  -v 传输时的进度等信息，和-P有点关系，自己试试。可以看文档；
  -e ssh的参数建立起加密的连接。
  -u只进行更新，防止本地新文件被重写，注意两者机器的时钟的同时
  --progress是指显示出详细的进度情况
  --delete是指如果服务器端删除了这一文件，那么客户端也相应把文件删除，保持真正的一致
  --password-file=/password/path/file来指定密码文件，这样就可以在脚本中使用而无需交互式地输入验证密码了，这里需要注意的是这份密码文件权限属性要设得只有属主可读。

B、一些实例

  B1、列出rsync 服务器上的所提供的同步内容；

  首先：我们看看rsync服务器上提供了哪些可用的数据源

  # rsync  --list-only  root@192.168.145.5::
  ++++++++++++++++++++++++++++++++++++++++++++++
  Welcome to use the mike.org.cn rsync services!
             2002------2009
  ++++++++++++++++++++++++++++++++++++++++++++++

  rhel4home       This is RHEL 4 data

   注：前面是rsync所提供的数据源，也就是我们在rsyncd.conf中所写的[rhel4home]模块。而“This is RHEL 4 data”是由[rhel4home]模块中的 comment = This is RHEL 4 data 提供的；为什么没有把rhel4opt数据源列出来呢？因为我们在[rhel4opt]中已经把list=no了。

  $ rsync  --list-only  root@192.168.145.5::::rhel4home

  ++++++++++++++++++++++++++++++++++++++++++++++
  Welcome to use the mike.org.cn rsync services!
             2002------2009
  ++++++++++++++++++++++++++++++++++++++++++++++

  Password:
  drwxr-xr-x        4096 2009/03/15 21:33:13 .
  -rw-r--r--        1018 2009/03/02 02:33:41 ks.cfg
  -rwxr-xr-x       21288 2009/03/15 21:33:13 wgetpaste
  drwxrwxr-x        4096 2008/10/28 21:04:05 cvsroot
  drwx------        4096 2008/11/30 16:30:58 easylife
  drwsr-sr-x        4096 2008/09/20 22:18:05 giddir
  drwx------        4096 2008/09/29 14:18:46 quser1
  drwx------        4096 2008/09/27 14:38:12 quser2
  drwx------        4096 2008/11/14 06:10:19 test
  drwx------        4096 2008/09/22 16:50:37 vbird1
  drwx------        4096 2008/09/19 15:28:45 vbird2

  后面的root@ip中，root是指定密码文件中的用户名，之后的::rhel4home这是rhel4home模块名
  B2、rsync客户端同步数据；

  #rsync -avzP root@192.168.145.5::rhel4home rhel4home
  Password: 这里要输入root的密码，是服务器端rsyncd.secrets提供的。在前面的例子中我们用的是mike，输入的密码并不回显，输好就回车。

   注： 这个命令的意思就是说，用root用户登录到服务器上，把rhel4home数据，同步到本地当前目录rhel4home上。当然本地的目录是可以你自己 定义的。如果当你在客户端上当前操作的目录下没有rhel4home这个目录时，系统会自动为你创建一个；当存在rhel4home这个目录中，你要注意 它的写权限。

  #rsync -avzP  --delete linuxsir@linuxsir.org::rhel4home   rhel4home

   这回我们引入一个--delete 选项，表示客户端上的数据要与服务器端完全一致，如果 linuxsirhome目录中有服务器上不存在的文件，则删除。最终目的是让linuxsirhome目录上的数据完全与服务器上保持一致；用的时候要 小心点，最好不要把已经有重要数所据的目录，当做本地更新目录，否则会把你的数据全部删除；

  設定 rsync client

  设定密码文件

  #rsync -avzP  --delete  --password-file=rsyncd.secrets   root@192.168.145.5::rhel4home rhel4home

  这次我们加了一个选项 --password-file=rsyncd.secrets，这是当我们以root用户登录rsync服务器同步数据时，密码将读取rsyncd.secrets这个文件。这个文件内容只是root用户的密码。我们要如下做；

  # touch rsyncd.secrets
  # chmod 600 rsyncd.secrets
  # echo "mike"> rsyncd.secrets

  # rsync -avzP  --delete  --password-file=rsyncd.secrets   root@192.168.145.5::rhel4home rhel4home

  注：这里需要注意的是这份密码文件权限属性要设得只有属主可读。

    这样就不需要密码了；其实这是比较重要的，因为服务器通过crond 计划任务还是有必要的；

  B3、让rsync客户端自动与服务器同步数据

   服务器是重量级应用，所以数据的网络备份还是极为重要的。我们可以在生产型服务器上配置好rsync 服务器。我们可以把一台装有rysnc机器当做是备份服务器。让这台备份服务器，每天在早上4点开始同步服务器上的数据；并且每个备份都是完整备份。有时 硬盘坏掉，或者服务器数据被删除，完整备份还是相当重要的。这种备份相当于每天为服务器的数据做一个镜像，当生产型服务器发生事故时，我们可以轻松恢复数 据，能把数据损失降到最低；是不是这么回事？？

  step1：创建同步脚本和密码文件
 
  #mkdir   /etc/cron.daily.rsync
  #cd  /etc/cron.daily.rsync
  #touch rhel4home.sh  rhel4opt.sh
  #chmod 755 /etc/cron.daily.rsync/*.sh 
  #mkdir /etc/rsyncd/
  #touch /etc/rsyncd/rsyncrhel4root.secrets
  #touch /etc/rsyncd/rsyncrhel4easylife.secrets
  #chmod 600  /etc/rsyncd/rsync.*

   注： 我们在 /etc/cron.daily/中创建了两个文件rhel4home.sh和rhel4opt.sh ，并且是权限是755的。创建了两个密码文件root用户用的是rsyncrhel4root.secrets ，easylife用户用的是 rsyncrhel4easylife.secrets，权限是600；

  我们编辑rhel4home.sh，内容是如下的：

  #!/bin/sh
  #backup 192.168.145.5:/home
  /usr/bin/rsync   -avzP  --password-file=/etc/rsyncd/rsyncrhel4root.password   root@192.168.145.5::rhel4home   /home/rhel4homebak/$(date +'%m-%d-%y')

  我们编辑 rhel4opt.sh ，内容是：

  #!/bin/sh
  #backup 192.168.145.5:/opt
  /usr/bin/rsync   -avzP  --password-file=/etc/rsyncd/rsyncrhel4easylife.secrets    easylife@192.168.145.5::rhel4opt   /home/rhel4hoptbak/$(date +'%m-%d-%y')

  注：你可以把rhel4home.sh和rhel4opt.sh的内容合并到一个文件中，比如都写到rhel4bak.sh中；

  接着我们修改 /etc/rsyncd/rsyncrhel4root.secrets和rsyncrhel4easylife.secrets的内容；

  # echo "mike" > /etc/rsyncd/rsyncrhel4root.secrets
  # echo "keer"> /etc/rsyncd/rsyncrhel4easylife.secrets

   然后我们再/home目录下创建rhel4homebak 和rhel4optbak两个目录，意思是服务器端的rhel4home数据同步到备份服务器上的/home/rhel4homebak 下，rhel4opt数据同步到 /home/rhel4optbak/目录下。并按年月日归档创建目录；每天备份都存档；

  #mkdir /home/rhel4homebak
  #mkdir /home/rhel4optbak

  step2：修改crond服务器的配置文件 加入到计划任务

  #crontab  -e

  加入下面的内容：

  # Run daily cron jobs at 4:10 every day  backup rhel4 data: 
  10 4 * * * /usr/bin/run-parts   /etc/cron.daily.rsync   1> /dev/null

  注：第一行是注释，是说明内容，这样能自己记住。
    第二行表示在每天早上4点10分的时候，运行 /etc/cron.daily.rsync 下的可执行脚本任务；
   
  配置好后，要重启crond 服务器；

  # killall crond    注：杀死crond 服务器的进程；
  # ps aux |grep crond  注：查看一下是否被杀死；
  # /usr/sbin/crond    注：启动 crond 服务器；
  # ps aux  |grep crond  注：查看一下是否启动了？
  root      3815  0.0  0.0   1860   664 ?        S    14:44   0:00 /usr/sbin/crond
  root      3819  0.0  0.0   2188   808 pts/1    S+   14:45   0:00 grep crond

六、FAQ

  Q：如何通过ssh进行rsync，而且无须输入密码？

  A：可以通过以下几个步骤

  1. 通过ssh-keygen在server A上建立SSH keys，不要指定密码，你会在~/.ssh下看到identity和identity.pub文件
  2. 在server B上的home目录建立子目录.ssh
  3. 将A的identity.pub拷贝到server B上
  4. 将identity.pub加到~[user b]/.ssh/authorized_keys
  5. 于是server A上的A用户，可通过下面命令以用户B ssh到server B上了。e.g. ssh -l userB serverB。这样就使server A上的用户A就可以ssh以用户B的身份无需密码登陆到server B上了。

  Q：如何通过在不危害安全的情况下通过防火墙使用rsync?
 
  A：解答如下：

   这通常有两种情况，一种是服务器在防火墙内，一种是服务器在防火墙外。无论哪种情况，通常还是使用ssh，这时最好新建一个备份用户，并且配置sshd 仅允许这个用户通过RSA认证方式进入。如果服务器在防火墙内，则最好限定客户端的IP地址，拒绝其它所有连接。如果客户机在防火墙内，则可以简单允许防 火墙打开TCP端口22的ssh外发连接就ok了。

  Q：我能将更改过或者删除的文件也备份上来吗？

  A：当然可 以。你可以使用如：rsync -other -options -backupdir = ./backup-2000-2-13  ...这样的命令来实现。这样如果源文件:/path/to/some/file.c改变了，那么旧的文件就会被移到./backup- 2000-2-13/path/to/some/file.c，这里这个目录需要自己手工建立起来

  Q：我需要在防火墙上开放哪些端口以适应rsync？

  A：视情况而定。rsync可以直接通过873端口的tcp连接传文件，也可以通过22端口的ssh来进行文件传递，但你也可以通过下列命令改变它的端口：
 
  rsync --port 8730 otherhost::
  或者
  rsync -e 'ssh -p 2002' otherhost:

  Q：我如何通过rsync只复制目录结构，忽略掉文件呢？
 
  A：rsync -av --include '*/' --exclude '*' source-dir dest-dir

  Q：为什么我总会出现"Read-only file system"的错误呢？

  A：看看是否忘了设"read only = no"了

  Q：为什么我会出现'@ERROR: invalid gid'的错误呢？

  A：rsync使用时默认是用uid=nobody;gid=nobody来运行的，如果你的系统不存在nobody组的话，就会出现这样的错误，可以试试gid = ogroup或者其它

  Q：绑定端口873失败是怎么回事？
  A：如果你不是以root权限运行这一守护进程的话，因为1024端口以下是特权端口，会出现这样的错误。你可以用--port参数来改变。

Q：为什么我认证失败？
A：从你的命令行看来：你用的是

```bash
> rsync -a 144.16.251.213::test test
Password:
@ERROR: auth failed on module test

I don\'t understand this. Can somebody explain as to how to accomplish this.
All suggestions are welcome.
```

  应该是没有以你的用户名登陆导致的问题，试试rsync -a username@144.16.251.213::test test

  Q: 出现以下这个讯息, 是怎么一回事?
  @ERROR: auth failed on module xxxxx
  rsync: connection unexpectedly closed (90 bytes read so far)
  rsync error: error in rsync protocol data stream (code 12) at io.c(150)

  A: 这是因为密码设错了, 无法登入成功, 请再检查一下 rsyncd.secrets 中的密码设定, 二端是否一致?

  Q: 出现以下这个讯息, 是怎么一回事?

  password file must not be other-accessible
  continuing without password file
  Password:

  A: 这表示 rsyncd.secrets 的档案权限属性不对, 应设为 600。请下 chmod 600 rsyncd.secrets

  Q: 出现以下这个讯息, 是怎么一回事?

  @ERROR: chroot failed
  rsync: connection unexpectedly closed (75 bytes read so far)
  rsync error: error in rsync protocol data stream (code 12) at io.c(150)

  A: 这通常是您的 rsyncd.conf 中的 path 路径所设的那个目录并不存在所致.请先用 mkdir开设好备份目录.

- [rsync]: https://rsync.samba.org


ＴＨＥ　ＥＮＤ