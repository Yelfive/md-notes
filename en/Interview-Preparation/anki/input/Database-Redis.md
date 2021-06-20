---

css: z_custom.css
---

# Database::Redis

## Redis 数据类型有哪些

### 基本类型

1. Strings：set, get, del, incr, incrby, decr
2. List: 双向连表
3. Map: hset, hget
4. Set: sadd, spop, scard(获取长度)
5. Sorted Set：score 字段存储排序值, zadd, zrange, zrem

> `incr`, `decr` 等返回修改后的值

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

## 为什么防超卖用 Redis 不用 Java 锁

Redis 可以持久化、可以做分布式，这都是 Java 锁机制不具备的。我们可以用多个 Redis 节点去存储库存，Java 的话每个节点的数据不能同步，而且如果遇到宕机，无法恢复。而 Redis 可以通过主备，即使一个节点宕机，也可以保证其他节点可用。
