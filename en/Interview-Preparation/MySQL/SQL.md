# SQL

Structured Query Language

## LIKE Query

**语法：**

```sql
expr [NOt] LIKE pat [ESCAPE 'escape_char']
```

`ESCAPE` 指定用于转义的字符串，默认为 `\`。

**通配符：**

- `%` 任意 >=0 个字符
- `_` 任意1个字符
- ~~`[]` 集合匹配~~，MySQL和MariaDB都不支持 `LIKE [a-b]` 这种语法，但是可以使用正则表达式 `RLIKE` 或 `REGEXP` 代替

    ```sql
    SELECT * FROM account WHERE NAME RLIKE '^[ab]';
    ```

    得到输出

    ```
    +----+------+-------+
    | id | name | money |
    +----+------+-------+
    |  1 | aaa  |   100 |
    |  2 | bbb  |  1900 |
    +----+------+-------+
    ```

## JOINs

1. `INNER JOIN`：交集，两表 `ON` 字段均不为 `null` 时。
2. `NATURAL JOIN`：`INNER JOIN` 所有同名字段。
3. `OUTER JOIN`：`OUTER` 可以省略，即 `JOIN`。

### OUTER JOIN 与多表查询的区别

多表查询时结果为笛卡尔积，然后在其基础上筛选；`OUTER JOIN` 是依据指定表（`LEFT JOIN` 的左表，`RIGHT JOIN` 的右表）与另外一个表 `ON` 条件进行结合，并非整个指定表的笛卡尔积。

例如，对于 SQL 语句：

```sql
SELECT * FROM a,b;
-- vs. --
SELECT * FROM a LEFT JOIN b ON a.id=b.a_id;
```

在如下数据时

```
+------+--------+
| a.id | b.a_id |
+------+--------+
|   1  |    1   |
|   2  |    2   |
|   3  |    3   |
|   5  |        |
+------+--------+
```

区别在于

- `LEFT JOIN` 生成 5 条记录
- 多表查询生成 12 条记录，然后再 12 条记录中筛选出 `a.id=b.a_id` 的记录

## 视图（Views）

视图的好处

1. 简化复杂的 SQL 操作，比如复杂的连接；
2. 只使用实际表的一部分数据；
3. 通过只给用户访问视图的权限，保证数据的安全性；
4. 更改数据格式和表示。

**Example:**

创建视图：

```sql
CREATE VIEW ab AS SELECT a.id, b.num FROM account AS a LEFT JOIN account_bank AS b ON a.id=account_id;
```

```
Query OK, 0 rows affected (0.098 sec)
```

查询：

```sql
SELECT id, num FROM ab;
```

```
+----+-------+
| id | num   |
+----+-------+
|  1 | 11111 |
|  2 | NULL  |
|  3 | NULL  |
|  5 | NULL  |
+----+-------+
```

:::warning
视图中，禁止修改数据。
:::

## 存储过程（Procedure）

相当于自定义方法，SQL的批处理操作。

**好处：**

1. 代码封装，保证了一定的安全性
2. 代码复用
3. 预编译，提高性能

**特点：**

1. `delimiter /` 使用 `/` 代替 `;` 作为语句的结束符号
2. 参数包含三种类型：`in`, `out`, `inout`
3. 给变量赋值使用 `select ... into` 语法
4. 每次只能给一个变量赋值，**不支持集合操作**
5. 用 `call <procedure>(args)` 调用存储过程

**示例：**

创建：

```sql
delimiter |
CREATE PROCEDURE my_procedure(OUT ret INT)
    BEGIN
        DECLARE y INT DEFAULT -1;
        SELECT sum(col1) INTO y FROM account;
        SELECT y * y INTO ret;
    END
| -- Delimiter to end the CREATE statement
delimiter ;
```

调用：

```sql
call my_procedure(@ret);

select @ret; -- print variable @ret
```

### 游标（Cursor）

以下例子计算了 `SUM(account.money)`：

```sql
DELIMITER |

CREATE PROCEDURE my_sum(OUT rst INT)
    BEGIN
        DECLARE done BOOLEAN DEFAULT false;
        DECLARE m INT DEFAULT 0;
        DECLARE cur CURSOR for SELECT money FROM account;

        DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = true;

        OPEN cur;

        -- Otherwise `rst + m` results into `null`
        SET rst = 0;

        read_loop: LOOP
            FETCH cur INTO m;
            -- Without `done` check, this round will still
            -- get finished with `m` equals to its last value
            IF done THEN
                 leave read_loop;
            END IF;

            IF m IS NOT NULL THEN
                SET rst = rst + m;
            END IF;
        END LOOP;

        CLOSE cur;
    END |

DELIMITER ;

CALL my_procedure(@rst);

SELECT @rst;
```

对数据库每一行进行遍历，然后可以根据条件进行处理，包括对数据的 *CRUD* 操作。

其中 `FETCH cur into m` 相当于

```sql
DECLARE pos INT DEFAULT 0;

SELECT money INTO m FROM account LIMIT 1 offset pos;

SET pos = pos + 1;
```

游标的使用步骤：

1. 定义游标 `DECLARE cursor_name CURSOR FROM select_clause`

    定义游标时，可以定义多个字段，在 `FETCH` 时，分别获取

    ```sql
    DECLARE cur CURSOR FROM SELECT a,b FROM my_table WHERE id < 10;

    FETCH cur INTO val_a, val_b;
    ```

2. 打开游标 `OPEN cursor_name`
3. 循环查询

    ```sql
    loop_name: LOOP
        FETCH cursor_name INTO var;
    ```

4. 关闭游标 `CLOSE cursor_name`

See also: [Cursors](https://dev.mysql.com/doc/refman/8.0/en/cursors.html).

## 函数（Function）

- [CREATE FUNCTION - MariaDB Knowledge Base](https://mariadb.com/kb/en/create-function/)
- [CREATE FUNCTION UDF - MariaDB Knowledge Base](https://mariadb.com/kb/en/create-function-udf/)

```sql
CREATE FUNCTION func() {

}
```

## 触发器

见 [Trigger](./../../MySQL/Trigger.md)

## 事务（Transaction）

SAVEPOINT
    : `SAVEPOINT name`。保存点，设置后可以使用 `ROLLBACK TO name` 回退到保存点。之后的 `COMMIT` 只会提交到保存点位置。

> MySQL 的事务提交默认是隐式提交，每执行一条语句就把这条语句当成一个事务然后进行提交。当出现 `START TRANSACTION` 语句时，会关闭隐式提交；当 `COMMIT` 或 `ROLLBACK` 语句执行后，事务会自动关闭，重新恢复隐式提交。
>
> 设置 `autocommit` 为 0 可以取消自动提交；`autocommit` 标记是针对每个连接而不是针对服务器的。
>
> 如果没有设置保存点，`ROLLBACK` 会回退到 `START TRANSACTION` 语句处；如果设置了保存点，并且在 `ROLLBACK` 中指定该保存点，则会回退到该保存点。[^cs-note-transaction]

## 字符集（Charset）

字符集
: 字母和符号的集合

    ```sql
    CHARACTER SET|CHARSET utf8mb4
    ```

校对字符集
: 如何比较字符，主要用于排序和分组

    ```sql
    COLLATE utf8mb4_unicode_ci;
    
    ORDER BY name COLLATE utf8mb4_unicode_ci;
    ```

编码（非 MySQL）
: 某个字符集成员的内部表示

## 权限管理

1. 创建账户

    ```sql
    CREATE USER username IDENTIFIED BY 'my_password';
    ```

2. 修改用户名

    ```sql
    RENAME USER old_name TO new_name;
    ```

3. 删除账户

    ```sql
    DROP USER username;
    ```

4. 查看权限

    ```sql
    SHOW GRANTS FOR username
    ```

5. 授予权限

    ```sql
    GRANT ALL PRIVILEGES ON db_name.* TO username@host IDENTIFIED BY 'my_password';
    ```

    其中，
    - `ALL PRIVILEGES` 代表所有权限，可以使用具体 `SELECT, INSERT` 表示 ++查、增++ 权限
    - `db_name.*` 表示可以访问数据库 `db_name` 下所有表（`*`）
    - `username@host` 表示在主机 host 使用 username 进行访问
    - `IDENTIFIED BY` $Optional$，表示用户需要使用的密码

6. 删除权限

    ```sql
    REVOKE SELECT, INSERT ON db_name.* FROM username;
    ```

7. 修改密码

    ```sql
    SET PASSWORD FOR username = PASSWORD('new_password');
    ```

:::tip
`GRANT` 和 `REVOKE` 都可以细化权限：

- 特定列：`GRANT SELECT(a, b)...`
- 特定存储过程、函数：`GRANT ... ON my_func|my_proc`
:::

[^cs-note-transaction]: [CS Note](http://cyc2018.gitee.io/cs-notes/#/notes/SQL%20%E8%AF%AD%E6%B3%95?id=%e4%ba%8c%e5%8d%81%e4%b8%80%e3%80%81%e4%ba%8b%e5%8a%a1%e7%ae%a1%e7%90%86)