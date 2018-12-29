# Change root password

##### 1. MySQL Admin

```bash
mysqladmin -u root -p password 
```

##### 2. Set

```mysql
 set password for username@localhost=password('new password');
```

##### 3. Update

```mysql
update user set password=password('123') where user='root' and host='localhost'; 
flush privileges;
```

##### 4. When forgot

```bash
# `--skip-grant-tables` to skip privilege check
> mysqld --skip-grant-tables
```

Then to step [2. Set](#2-Set) or [3. Update](#3-Update)
