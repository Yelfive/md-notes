# Redis Basics

## 数据类型

基本数据类型

1. Strings
2. List
3. Set：无需集合
4. Hash
5. Sorted Set：`Z-prefixed` 有序集合、根据分数排序

新数据类型

1. Bitmap：基于 String
2. HyperLogLogs：基于 String，集合的概率
3. Geospatial index：基于 sorted map，空间位置索引，提供基于经纬度的查询功能
4. Stream：类似日志，提供阻塞式的“生产者-消费者”模式的能力

## 数据淘汰策略

\# | 策略            | 描述                                                 |
---| --------------- | ---------------------------------------------------- |
1| volatile-lru    | 从已设置过期时间的数据集中挑选最近最少使用的数据淘汰 |
2| volatile-ttl    | 从已设置过期时间的数据集中挑选将要过期的数据淘汰     |
3| volatile-random | 从已设置过期时间的数据集中任意选择数据淘汰           |
4| volatile-lfu    | 4.0 引入，Least Frequently Used                      |
5| allkeys-lfu     | 4.0 引入                                             |
6| allkeys-lru     | 从所有数据集中挑选最近最少使用的数据淘汰             |
7| allkeys-random  | 从所有数据集中任意选择数据进行淘汰                   |
8| noeviction      | 禁止驱逐数据                                         |

## Redis 单线程

是指网络IO时使用了单线程，在持久化之类的操作时，也会开启新线程处理。4.0之后，在某些操作也会支持多线程。

> For instance, using pipelining Redis running on an average Linux system can deliver even 1 million requests per second.
>
> --- From: [FAQ – Redis](https://redis.io/topics/faq)

事实上，Redis 6.0 开始，支持多线程，不过此时仍然是单线程处理命令，只是在网络 I/O 使用了多线程，目的是为了利用多核，提高 I/O 效率。[^redis-6.0]

**See Also:**

- [为什么说Redis是单线程的以及Redis为什么这么快！](https://blog.csdn.net/xlgen157387/article/details/79470556)

[^redis-6.0]: [Redis 6.0 多线程重磅发布！](https://www.cnblogs.com/gz666666/p/12901507.html)

## 持久化

- RDB: <acr :offsets="[0, 6, 10]">Redis Database</acr>
- AOF: <acr>Append Only File</acr>

See Also:

- [详解Redis中两种持久化机制RDB和AOF（面试常问，工作常用）](https://baijiahao.baidu.com/s?id=1654694618189745916&wfr=spider&for=pc)
- [CS-Notes](http://cyc2018.gitee.io/cs-notes/#/notes/Redis?id=%e5%85%ab%e3%80%81%e6%8c%81%e4%b9%85%e5%8c%96)

**AOF 磁盘写频率配置：**

| 选项         | 同步频率                 |
| ------------ | ------------------------ |
| always       | 每个写命令都同步         |
| **everysec** | <3 每秒同步一次          |
| no           | 让操作系统来决定何时同步 |

## 事务

- 开启事务：`MULTI`
- 提交事务：`EXEC`
- 回滚事务：`DISCARD`

**其他：**

- `WATCH`：在 `MULTI` 之前调用，标记这些 `keys` 将用于接下来的事务，如果其他客户端修改了这键值，`EXEC` 将失败。
- `UNWATCH`：取消之前 `WATCH` 设置的 `keys`。

## I/O 多路复用 Multiplexing

select -> poll -> epoll

![picture 1](./images/index/io-multiplexing_20210325001113_88.png "I/O Multiplexing Performance. X axis: connections(As the application for testing is called DeadCon)")

- select
  1. 只支持1024个 sockets
  2. 只会返回数据，不会告知来源于哪个 socket
  3. 会修改传入数组 <Badge type="error" text="WHAT?"/>
  4. 非线程安全

- poll
  - 解决了 1、2、3，3个问题

- epoll
  - 线程安全

See also: [IO 多路复用是什么意思？ - 知乎](https://www.zhihu.com/question/32163005)

## Sentinel

哨兵，监听集群中的服务器，在主服务器下线之后选举新的主服务器

## 分片

类似横向分表，把数据拆分到不同服务器存储。

分片方式：

1. 客户端拆分：客户端根据 一致性 Hash 算法[^dht] 决定当前键应该存储到哪个节点。
2. 代理分片：客户端将请求发送给代理，代理再进行数据转发
3. 服务器分片：Redis Cluster

*[一致性 Hash 算法]: 一致性 Hash 算法是分布式 Hash 算法（Distributed Hash Table, DHT）的实现。

[^dht]: [一致性哈希算法原理 - lpfuture - 博客园](https://www.cnblogs.com/lpfuture/p/5796398.html)
