# Dictionary

Term    | Description
---     | ---
FIFO    | First-In, First-Out
IFS     | Internal Field Separator, in bash `echo $IFS`, default to be `\n`
Tcl     | Tool Command Language
Fixture Test    | 基境,夹具测试
Pod     | 豆荚，包括应用服务器、持久储存，或两者兼有。 豆荚是沿Z轴最常见的拆分，就想把客户数据拆分到不同的豆荚中。豆荚有时和泳道混用。他也是一直和池的概念交替使用，用于指网络或者应用服务
Cluster | 集群。有时用来指以同一模式像池样配置的网络和应用服务器。在这种情况下，集群是指类似功能或目的的X轴扩展，这样所有的节点或者参与者都是活跃的。 通常集群共享某种高于和超出池的分布式状态，但这种状态在大事务量下可能会导致可扩展性瓶颈。集群也可以配置成主动/被动模式，其中一个或多个设备处于被动状态，在其他设备出故障时，可以升级成为“主动”节点
Pool    | 池，是按照类似功能分组或可能按照客户分组的服务器。该术语通常指前端服务器，但有些公司指的是具有某些特性的数据库服务池。池指的是先按照功能（Y轴）或者客户（Z轴）划界，然后对服务器进行典型的X轴复制（克隆）
Shard   | 分片是对数据库或搜索引擎进行水平分区。水平分区意味着跨数据库的表、数据库实例或物理数据库服务器进行数据拆分。分片通常沿Z轴扩展（例如在客户之间分片），但有些公司是指按照功能（Y轴）分区
Swimlane| 泳道，是用来表示故障隔离域的术语。不允许跨越泳道边界进行同步调用。换言之，用到围绕一组同步调用定义。泳道内一个组件发生故障，不会影响到其他泳道内的组件。因此，共享组件不能跨越泳道。 泳道时发生同步调用的最小边界
overload    | 重载
Generics    | 泛型
STOMP       | Simple (or Streaming) Text Orientated Messaging Protocol<ol><li>[STOMP](http://stomp.github.io/)</li><li>[STOMP Over WebSocket](http://jmesnil.net/stomp-websocket/doc/)</li></ol>