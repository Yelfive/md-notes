# Trigger

## Create a trigger

```sql
CREATE TRIGGER trigger_name
BEFORE|AFTER
INSERT|UPDATE|DELETE
ON table_name
FOR EACH ROW  SET some=something_else;
```

## Drop a trigger

```sql
DROP TRIGGER table_name.trigger_name
```

## Within trigger body

- `NEW`

    1. Represents the new row, event `DELETE` does not have one.
    2. Can be modified via `SET NEW.col_name=new_value`.
    3. Value of trigger `BEFORE`'s `NEW.<AUTO_INCREMENT field>` is 0.

- `OLD`

    1. Represents the old row, event `INSERT` does not have one.
    2. Read-only
