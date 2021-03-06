# 25 Examples for `iptables`

> Come from [干货：25 条有用的 iptables 常用示例](https://mp.weixin.qq.com/s?__biz=MzA4NzQzMzU4Mg==&mid=2652941361&idx=2&sn=2558487b24fc239c98914fe657e0cde5&chksm=8bed8430bc9a0d266e40670d2c41519ff2d34254c104b9e3beb95e129207a778760af8757a58&mpshare=1&scene=1&srcid=1223SMKx39VB9A8609uPEgn7&sharer_sharetime=1608683252868&sharer_shareid=cf4224b18c7e26ff9de04d56dbefb641&key=54253d61e149ca80bcb7cdf646fcd867aadae8070b05d167e090acc0901dcc44aa8cecdb3e36ea4b26aee27424e616b2a7cb2e9d8d7506a98cb7e567524c5a923d28e9ff38ed7c74185397b5a1368cfb2549218ff0aaf1b9bb86ff15defd75d58fa353db0c19b1be4511f8efaafb4303a85e7cd35f7093e30b5019441ceb2e25&ascene=1&uin=MzcyMjg5ODAw&devicetype=Windows+10+x64&version=6300002f&lang=zh_CN&exportkey=A%2F8bLkm92BZKrrU2OPAntdc%3D&pass_ticket=Yh%2BjQc51BYiBR6BRbWTJ%2BBNPXWabQ90e57P8J90ko2To1A48GFTF3V1ineTh5VHw&wx_header=0)

## 格式

```bash
iptables [-t 表名] 选项 [链名] [条件] [-j 控制类型]
```

## 参数

> -P 设置默认策略:iptables -P INPUT (DROP|ACCEPT)
> -F 清空规则链
> -L 查看规则链
> -A 在规则链的末尾加入新规则
> -I num 在规则链的头部加入新规则
> -D num 删除某一条规则
> -s 匹配来源地址IP/MASK，加叹号"!"表示除这个IP外。
> -d 匹配目标地址
> -i 网卡名称 匹配从这块网卡流入的数据
> -o 网卡名称 匹配从这块网卡流出的数据
> -p 匹配协议,如tcp,udp,icmp
> --dport num 匹配目标端口号
> --sport num 匹配来源端口号

## 示例

### 1. 删除已有规则

在开始创建iptables规则之前，你也许需要删除已有规则。命令如下：

```bash
iptables -F
(or)
iptables –flush
```

### 2.设置链的默认策略

链的默认政策设置为”ACCEPT”（接受），若要将INPUT,FORWARD,OUTPUT链设置成”DROP”（拒绝），命令如下：

```bash
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT DROP
```

当INPUT链和OUTPUT链都设置成DROP时，对于每一个防火墙规则，我们都应该定义两个规则。例如：一个传入另一个传出。在下面所有的例子中，由于我们已将DROP设置成INPUT链和OUTPUT链的默认策略，每种情况我们都将制定两条规则。当然，如果你相信你的内部用户,则可以省略上面的最后一行。例如：默认不丢弃所有出站的数据包。在这种情况下,对于每一个防火墙规则要求,你只需要制定一个规则——只对进站的数据包制定规则。

### 3. 阻止指定IP地址

例：丢弃来自IP地址x.x.x.x的包

```bash
BLOCK_THIS_IP="x.x.x.x"
iptables -A INPUT -s "$BLOCK_THIS_IP" -j DROP
```

注：当你在log里发现来自某ip地址的异常记录，可以通过此命令暂时阻止该地址的访问以做更深入分析

例：阻止来自IP地址x.x.x.x eth0 tcp的包

```bash
iptables -A INPUT -i eth0 -s "$BLOCK_THIS_IP" -j DROP
iptables -A INPUT -i eth0 -p tcp -s "$BLOCK_THIS_IP" -j DROP
```

### 4. 允许所有SSH的连接请求

例：允许所有来自外部的SSH连接请求，即只允许进入eth0接口，并且目标端口为22的数据包

```bash
iptables -A INPUT -i eth0 -p tcp --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT
```

### 5. 仅允许来自指定网络的SSH连接请求

例：仅允许来自于192.168.100.0/24域的用户的ssh连接请求

```bash
iptables -A INPUT -i eth0 -p tcp -s 192.168.100.0/24 --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT
```

### 6.允许http和https的连接请求

例：允许所有来自web - http的连接请求

```bash
iptables -A INPUT -i eth0 -p tcp --dport 80 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 80 -m state --state ESTABLISHED -j ACCEPT
```

例：允许所有来自web - https的连接请求

```bash
iptables -A INPUT -i eth0 -p tcp --dport 443 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 443 -m state --state ESTABLISHED -j ACCEPT
```

### 7. 使用multiport 将多个规则结合在一起

允许多个端口从外界连入，除了为每个端口都写一条独立的规则外，我们可以用multiport将其组合成一条规则。如下所示：

例：允许所有ssh,http,https的流量访问

```bash
iptables -A INPUT -i eth0 -p tcp -m multiport --dports 22,80,443 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp -m multiport --sports 22,80,443 -m state --state ESTABLISHED -j ACCEPT
```

### 8. 允许从本地发起的SSH请求

```bash
iptables -A OUTPUT -o eth0 -p tcp --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A INPUT -i eth0 -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT
```

请注意,这与允许ssh连入的规则略有不同。本例在OUTPUT链上，我们允许NEW和ESTABLISHED状态。在INPUT链上，我们只允许ESTABLISHED状态。ssh连入的规则与之相反。

### 9. 仅允许从本地发起到一个指定的网络域的SSH请求

例：仅允许从内部连接到网域192.168.100.0/24

```bash
iptables -A OUTPUT -o eth0 -p tcp -d 192.168.100.0/24 --dport 22 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A INPUT -i eth0 -p tcp --sport 22 -m state --state ESTABLISHED -j ACCEPT
```

### 10. 允许从本地发起的HTTPS连接请求

下面的规则允许输出安全的网络流量。如果你想允许用户访问互联网，这是非常有必要的。在服务器上，这些规则能让你使用wget从外部下载一些文件

```bash
iptables -A OUTPUT -o eth0 -p tcp --dport 443 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A INPUT -i eth0 -p tcp --sport 443 -m state --state ESTABLISHED -j ACCEPT
```

注：对于HTTP web流量的外联请求，只需要将上述命令中的端口从443改成80即可。

### 11. 负载平衡传入的网络流量

使用iptables可以实现传入web流量的负载均衡，我们可以传入web流量负载平衡使用iptables防火墙规则。
例：使用iptables nth将HTTPS流量负载平衡至三个不同的ip地址。

```bash
iptables -A PREROUTING -i eth0 -p tcp --dport 443 -m state --state NEW -m nth --counter 0 --every 3 --packet 0 -j DNAT --to-destination 192.168.1.101:443
iptables -A PREROUTING -i eth0 -p tcp --dport 443 -m state --state NEW -m nth --counter 0 --every 3 --packet 1 -j DNAT --to-destination 192.168.1.102:443
iptables -A PREROUTING -i eth0 -p tcp --dport 443 -m state --state NEW -m nth --counter 0 --every 3 --packet 2 -j DNAT --to-destination 192.168.1.103:443
```

### 12. 允许外部主机ping内部主机

```bash
iptables -A INPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A OUTPUT -p icmp --icmp-type echo-reply -j ACCEPT
```

### 13. 允许内部主机ping外部主机

```bash
iptables -A OUTPUT -p icmp --icmp-type echo-request -j ACCEPT
iptables -A INPUT -p icmp --icmp-type echo-reply -j ACCEPT
```

### 14. 允许回环访问

例：在服务器上允许127.0.0.1回环访问。

```bash
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT
```

### 15. 允许内部网络域外部网络的通信

防火墙服务器上的其中一个网卡连接到外部，另一个网卡连接到内部服务器，使用以下规则允许内部网络与外部网络的通信。此例中，eth1连接到外部网络(互联网)，eth0连接到内部网络(例如:192.168.1.x)。

```bash
iptables -A FORWARD -i eth0 -o eth1 -j ACCEPT
```

### 16. 允许出站的DNS连接

```bash
iptables -A OUTPUT -p udp -o eth0 --dport 53 -j ACCEPT
iptables -A INPUT -p udp -i eth0 --sport 53 -j ACCEPT
```

### 17. 允许NIS连接

如果你使用NIS管理用户帐户，你需要允许NIS连接。如果你不允许NIS相关的ypbind连接请求，即使SSH连接请求已被允许，用户仍然无法登录。NIS的端口是动态的，先使用命令rpcinfo –p来知道端口号，此例中为853和850端口。

```bash
rpcinfo -p | grep ypbind
```

例：允许来自111端口以及ypbind使用端口的连接请求

```bash
iptables -A INPUT -p tcp --dport 111 -j ACCEPT
iptables -A INPUT -p udp --dport 111 -j ACCEPT
iptables -A INPUT -p tcp --dport 853 -j ACCEPT
iptables -A INPUT -p udp --dport 853 -j ACCEPT
iptables -A INPUT -p tcp --dport 850 -j ACCEPT
iptables -A INPUT -p udp --dport 850 -j ACCEPT
```

注：当你重启ypbind之后端口将不同，上述命令将无效。有两种解决方案：1）使用你NIS的静态IP 2）编写shell脚本通过“rpcinfo - p”命令自动获取动态端口号,并在上述iptables规则中使用。

### 18. 允许来自指定网络的rsync连接请求

例：允许来自网络192.168.101.0/24的rsync连接请求

```bash
iptables -A INPUT -i eth0 -p tcp -s 192.168.101.0/24 --dport 873 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 873 -m state --state ESTABLISHED -j ACCEPT
```

### 19. 允许来自指定网络的MySQL连接请求

很多情况下，MySQL数据库与web服务跑在同一台服务器上。有时候我们仅希望DBA和开发人员从内部网络（192.168.100.0/24）直接登录数据库，可尝试以下命令：

```bash
iptables -A INPUT -i eth0 -p tcp -s 192.168.100.0/24 --dport 3306 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 3306 -m state --state ESTABLISHED -j ACCEPT
```

### 20. 允许Sendmail, Postfix邮件服务

Sendmail和postfix都使用了25端口，因此我们只需要允许来自25端口的连接请求即可。

```bash
iptables -A INPUT -i eth0 -p tcp --dport 25 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 25 -m state --state ESTABLISHED -j ACCEPT
```

### 21. 允许IMAP和IMAPS

例：允许IMAP/IMAP2流量，端口为143

```bash
iptables -A INPUT -i eth0 -p tcp --dport 143 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 143 -m state --state ESTABLISHED -j ACCEPT
```

例：允许IMAPS流量，端口为993

```bash
iptables -A INPUT -i eth0 -p tcp --dport 993 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 993 -m state --state ESTABLISHED -j ACCEPT
```

### 22. 允许POP3和POP3S

例：允许POP3访问

```bash
iptables -A INPUT -i eth0 -p tcp --dport 110 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 110 -m state --state ESTABLISHED -j ACCEPT
```

例：允许POP3S访问

```bash
iptables -A INPUT -i eth0 -p tcp --dport 995 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 995 -m state --state ESTABLISHED -j ACCEPT
```

### 23. 防止DoS攻击

```bash
iptables -A INPUT -p tcp --dport 80 -m limit --limit 25/minute --limit-burst 100 -j ACCEPT
```

上述例子中：

> - `-m limit`: 启用limit扩展
> - `–limit 25/minute`: 允许最多每分钟25个连接（根据需求更改）。
> - `–limit-burst 100`: 只有当连接达到limit-burst水平(此例为100)时才启用上述limit/minute限制。

### 24. 端口转发

例：将来自422端口的流量全部转到22端口。

这意味着我们既能通过422端口又能通过22端口进行ssh连接。启用DNAT转发。

```bash
iptables -t nat -A PREROUTING -p tcp -d 192.168.102.37 --dport 422 -j DNAT --to 192.168.102.37:22
```

除此之外，还需要允许连接到422端口的请求

```bash
iptables -A INPUT -i eth0 -p tcp --dport 422 -m state --state NEW,ESTABLISHED -j ACCEPT
iptables -A OUTPUT -o eth0 -p tcp --sport 422 -m state --state ESTABLISHED -j ACCEPT
```

### 25. 记录丢弃的数据表

第一步：新建名为LOGGING的链

```bash
iptables -N LOGGING
```

第二步：将所有来自INPUT链中的数据包跳转到LOGGING链中

```bash
iptables -A INPUT -j LOGGING
```

第三步：为这些包自定义个前缀，命名为”IPTables Packet Dropped”

```bash
iptables -A LOGGING -m limit --limit 2/min -j LOG --log-prefix "IPTables Packet Dropped: " --log-level 7
```

第四步：丢弃这些数据包

```bash
iptables -A LOGGING -j DROP
```
