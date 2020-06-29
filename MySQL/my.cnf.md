# my.cnf

```conf
[mysqld]
server-id=1
log-bin=mysql-bin
general_log_file        = /var/lib/mysql/sql.log
general_log             = 1
default-time_zone = '+8:00'
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci

[Slow Query]
slow_query_log = on
long_query_time = 2s

[client]
default-character-set = utf8mb4

[mysql]
default-character-set = utf8mb4
```