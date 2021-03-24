# Redis Basics

## 数据类型

1. String
2. List
3. Set：无需集合
4. Hash
5. ZSet：有序集合、根据分数排序
6. Bitmap：基于 String
7. HyperLogLogs：基于 String，集合的概率
8. Geospatial index：空间位置索引，提供基于经纬度的查询功能
9. Stream：类似日志，提供阻塞式的“生产者-消费者”模式的能力

## 数据淘汰策略

| 策略            | 描述                                                 |
| --------------- | ---------------------------------------------------- |
| volatile-lru    | 从已设置过期时间的数据集中挑选最近最少使用的数据淘汰 |
| volatile-ttl    | 从已设置过期时间的数据集中挑选将要过期的数据淘汰     |
| volatile-random | 从已设置过期时间的数据集中任意选择数据淘汰           |
| volatile-lfu    | 4.0 引入，Least Frequently Used                      |
| allkeys-lfu     | 4.0 引入                                             |
| allkeys-lru     | 从所有数据集中挑选最近最少使用的数据淘汰             |
| allkeys-random  | 从所有数据集中任意选择数据进行淘汰                   |
| noeviction      | 禁止驱逐数据                                         |

## Redis 单线程

是指网络IO时使用了单线程，在持久化之类的操作时，也会开启新线程处理。4.0之后，在某些操作也会支持多线程。

> For instance, using pipelining Redis running on an average Linux system can deliver even 1 million requests per second.
>
> &emsp;- From: [FAQ – Redis](https://redis.io/topics/faq)

- [为什么说Redis是单线程的以及Redis为什么这么快！_徐刘根的博客-CSDN博客_redis为什么快](https://blog.csdn.net/xlgen157387/article/details/79470556)

## 持久化

- RDB: Redis Database
- AOF: Append Of File

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
