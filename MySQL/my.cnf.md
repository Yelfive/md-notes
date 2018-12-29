# my.cnf

```conf
[mysqld]
general_log_file    = /var/lib/mysql/sql.log
general_log         = 1

[Slow Query]
slow_query_log  = on
long_query_time = 2s
```