# SQL Modes

<span style="width: 50px;display:inline-block;" > ![](https://labs.mysql.com/common/logos/mysql-logo.svg?v2#100) </span>

## my.cnf

```conf
sql_mode = STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION
```

## Modes list

- `ANSI`

    Equivalent to `REAL_AS_FLOAT, PIPES_AS_CONCAT, ANSI_QUOTES, IGNORE_SPACE, ONLY_FULL_GROUP_BY`and (as of MySQL 5.7.5) ONLY_FULL_GROUP_BY.

- `STRICT_TRANS_TABLES`

    Enable strict SQL mode for **transactional storage engines**, and when possible for non-transactional storage engines.
    If a value could not be inserted as given into a transactional table, abort the statement. For a non-transactional table, abort the statement if the value occurs in a single-row statement or the first row of a multiple-row statement

    **Strict mode** controls how MySQL handles invalid or missing values in **data-change statements** such as `INSERT` or `UPDATE`. A value can be invalid for several reasons. For example, it might have the wrong data type for the column, or it might be out of range. A value is missing when a new row to be inserted does not contain a value for a non-NULL column that has no explicit `DEFAULT` clause in its definition. (For a NULL column, NULL is inserted if the value is missing.) Strict mode **also affects DDL** statements such as `CREATE TABLE`.

    Effected:

    - division by zero
    - zero date `0000-00-00`
    - partial zero date `2018-00-01` or `2018-01-00`

- `STRIC_ALL_TABLES`

    Enable strict SQL mode for all tables.

- `ONLY_FULL_GROUP_BY`

    Reject queries for which the `select` list, `HAVING` condition, or `ORDER BY` list refer to non-aggregated columns that are neither named in the `GROUP BY` clause nor are functionally dependent on (uniquely determined by) `GROUP BY` columns.

- `NO_ENGINE_SUBSTITUTION`

    Control automatic substitution of the default storage engine when a statement such as `CREATE TABLE` or `ALTER TABLE` specifies a storage engine that is disabled or not compiled in.

    The default SQL mode includes `NO_ENGINE_SUBSTITUTION`.

    Because storage engines can be pluggable at runtime, unavailable engines are treated the same way:

    With `NO_ENGINE_SUBSTITUTION` **disabled**, for `CREATE TABLE` the default engine is used and a warning occurs if the desired engine is unavailable. For ALTER TABLE, a warning occurs and the table is not altered.

    With `NO_ENGINE_SUBSTITUTION` **enabled**, an error occurs and the table is not created or altered if the desired engine is unavailable.

## Appendix

- [MySQL](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html)