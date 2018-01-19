# Functions

## FIND_IN_SET(str, strlist)

## REGEXP

```sql
'string' REGEXP 'pattern'
```

```sql
select 'abc123' REGEXP '[0-9]{3}'
```

## upper/lower

```sql
select upper('abcd');
# ABCD
```

## CAST

Cast a value as a certain type

```sql
CAST(expression AS data_type)
```

```sql
select CAST('1' + '1' AS INT) AS result
```

## CONVERT

1. Cast a value as a certain type

    ```sql
    # equivalent to `CAST(expression AS type)`
    CONVERT(expression, type)
    ```

2. Converts data between different character sets

    ```sql
    CONVERT(expression USING transcoding_name)
    ```
