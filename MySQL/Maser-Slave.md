# MySQL Master and Slave

## 1. Configure the `master`

First of all, you should create a slave account:

```bash
mysql -e 'GRANT REPLICATION SLAVE ON *.* TO slaves@"%" IDENTIFIED BY "password"
```

### Optionally you can

#### 1.1. Show master status

```bash
mysql -e 'show master status \G'
```

and you will get the following:

```text
*************************** 1. row ***************************
                File: mysql-bin.000003
            Position: 154
        Binlog_Do_DB:
    Binlog_Ignore_DB:
Executed_Gtid_Set:
```

#### 1.2. Or clean up master log

Run inside master database

```mysql
reset master
```

> **UNCONFIRMED**: then slave just set `master_log_file=mysql-bin.000003,master_log_pos=0` ?

## 2.  Configure the `slave`

The following command declares this is a slave database, and its master is from host `master_host` and the name which the master gives is `slaves` and with password `password`

```bash
mysql -e 'CHANGE MASTER TO MASTER_HOST="master_host", MASTER_USER="slaves", MASTER_PASSWORD="password", MASTER_LOG_FILE="mysql-bin.000003", MASTER_LOG_POS=154, MASTER_PORT=3306'
```

> Notice: the `MASTER_LOG_FILE` and the `MASTER_LOG_POS` need to be replaced by information queried by step 1.

### 2.1. START SLAVE

```mysql
START SLAVE
```

### 2.2. SHOW SLAVE STATUS \G

```mysql
SHOW SLAVE STATUS \G
```

## 3. Proxy

- Amoeba
- mysql router
- cat
