Master-Slave
===

slaveof jkhz.alijian.net 7379
slave-read-only no

#如果master有密码保护，则在slave与master进行数据同步之前需要进行密码校验，否则master会拒绝slave的请#求。
#
masterauth ALiJian@Redis
 
#当slave丢失与master的连接时，或者slave仍然在于master进行数据同步时（还没有与master保持一致），#slave可以有两种方式来响应客户端请求：
#
# 1) 如果 slave-serve-stale-data 设置成 'yes' (the default) slave会仍然响应客户端请求,此时可能会有问题。
#
# 2) 如果 slave-serve-stale data设置成  'no'  slave会返回"SYNC with master in progress"这样的错误信息。 但 INFO 和SLAVEOF命令除外。
#
slave-serve-stale-data yes
 
############### 安全 ###################################
 
# 需要客户端在执行任何命令之前指定 AUTH <PASSWORD>
#
# requirepass ALiJian@Redis