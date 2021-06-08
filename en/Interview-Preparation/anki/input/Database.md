---
css: z_custom.css
---

# Database

## 并发事务的问题

1. 脏读：读未提交
2. 丢失修改
3. 不可重复读：修改
4. 幻读：增删

## 事务的隔离级别

| 隔离级别         | 脏读 | 不可重复读 | 幻读 |
| ---------------- | ---- | ---------- | ---- |
| READ UNCOMMITTED | Y    | Y          | Y    |
| READ COMMITTED   | N    | Y          | Y    |
| REPEATABLE READ  | N    | N          | Y    |
| SERIALIZABLE     | N    | N          | N    |

> READ COMMITTED 不能保证可重复度，短事务修改数据导致长事务两次修改结果不一致。

MySQL 默认使用 REPEATABLE READ 隔离级别。

## MVCC

多版本并发控制，Multi-Version Concurrency Control。利用版本号进行快照，每次开启事务都版本号自增。没有统一的标准，每个数据库引擎实现不一样，对于 InnoDB：

每行记录增加两个隐藏列：创建时间（版本号）、过期时间（删除时间，版本号）。大部分情况下可以不使用锁。

修改一行记录时，插入一条新纪录，同时标记原始记录的删除时间（当前版本号）。

MVCC 只在 REPEATABLE READ 和 READ COMMITTED 隔离级别起作用

## Redis 数据类型有哪些

### 基本类型

1. Strings：set, get, del, incr, incrby, decr
2. List: 双向连表
3. Map: hset, hget
4. Set: sadd, spop, scard(获取长度)
5. Sorted Set：score 字段存储排序值, zadd, zrange, zrem

### 其他类型

1. Bit map: based on strings
2. geo: sorted set

## Redis 分布式锁支持的方法

不存在时设置成功，否则失败。

1. setnx: SET if Not eXists
2. msetnx: Multiple set
3. hsetnx: Hash set, `hsetnx key field value`

## Redis 事务

将一组命令加入队列，之后一次性执行（不被抢占）。

1. `MULTI`：开启事务
2. `EXEC`: 执行队列
3. `DISCARD`: 放弃队列的执行
4. `WATCH`: 监听变量是否改动，若改动则 `EXEC` 时报错
5. `UNWATCH`: 取消所有监听

Redis 事务不满足原子性。

两个异常情况：

1. 将命令加入队列时错误（命令名错误、参数错误）：直接返回错误，此时执行 `EXEC` 无法成功
2. `EXEC` 时报错，队列继续执行后面任务。

## Redis 过期 key 删除策略

1. 惰性删除（Passive）：获取 key 时发现过期，删除
2. 定时删除（Active）：定时启动删除任务，概率保证已过期却没有被删除的比例为 1/4。过程如下（10次/s）

    1. 在设有过期时间的 key 中，随机抽取 20 个记录
    2. 删除已过期记录
    3. 若已删除记录超过 25%，立即重新启动算法

## MySQL vs. MongoDB

### MySQL 应用场景

1. 固定的数据结构
2. 事务
3. 数据量相对较小
4. 索引优化

### MongoDB 应用场景

1. 写频繁
2. 无固定数据结构
3. 大数据
