# Privileges

Table 6.2 Permissible Privileges for GRANT and REVOKE

Privilege | Column    | Context
--- |--- | ---
ALL [PRIVILEGES]    | Synonym for “all privileges” | Server administration
ALTER| Alter_priv   | Tables
ALTER ROUTINE       |   Alter_routine_priv|  Stored routines
CREATE              |  Create_priv |Databases, tables, or indexes
CREATE ROUTINE      | Create_routine_priv| Stored routines
CREATE TABLESPACE   |Create_tablespace_priv|  Server administration
CREATE TEMPORARY TABLES | Create_tmp_table_priv | Tables
CREATE USER | Create_user_priv | Server administration
CREATE VIEW | Create_view_priv | Views
DELETE  | Delete_priv | Tables
DROP    | Drop_priv | Databases, tables, or views
EVENT   | Event_priv | Databases
EXECUTE | Execute_priv | Stored routines
FILE    | File_priv | File access on server host
GRANT OPTION | Grant_priv | Databases, tables, or stored routines
INDEX   | Index_priv | Tables
INSERT  | Insert_priv | Tables or columns
LOCK TABLES | Lock_tables_priv | Databases
PROCESS | Process_priv | Server administration
PROXY   |See `proxies_priv` table | Server administration
REFERENCES | References_priv | Databases or tables
RELOAD  | Reload_priv Server administration
REPLICATION CLIENT | Repl_client_priv | Server administration
REPLICATION SLAVE | Repl_slave_priv | Server administration
SELECT  | Select_priv | Tables or columns
SHOW DATABASES | Show_db_priv | Server administration
SHOW VIEW   | Show_view_priv | Views
SHUTDOWN    | Shutdown_priv | Server administration
SUPER   | Super_priv | Server administration
TRIGGER | Trigger_priv | Tables
UPDATE  | Update_priv | Tables or columns
USAGE   | Synonym for “no privileges” | Server administration


```mysql
grant all privileges on *.* to jack@'localhost' identified by "jack"
```

- `*.*` is the table to grant, in form of `database.table`
- `all privileges` can be any of above
- `localhost` is the client address, `%` for all

## Flush Privileges

```sql
flush privileges;
```

## Show Grants

```mysql
show grants [for user@address]
```

If `[for user]` is omitted, it will be the current user

## Revoke a privilege

```mysql
revoke delete on *.* from 'user'@'address'
```

## Delete a user

```mysql
drop user 'username'@'address';
```

## Rename

```mysql
rename user 'username'@'address' to 'new_user@new_address'
```

## Change password

```mysql
SET PASSWORD FOR 'user'@'address' = PASSWORD('password');
```

```bash
mysqladmin -uroot -p123456 password 1234abcd
```

```mysql
UPDATE mysql.user SET PASSWORD=PASSWORD('1234abcd') WHERE user = 'root';
```

## When you forget root password

**1. Stop mysqld: kill all mysqld process**

```bash
# start mysqld without checking for grants
mysqld_safe --skip-grant-tables & 
```

**2. Just change password as MySQL never did have one**

```bash
mysqladmin -uroot password 'your_passwd_string'
```
