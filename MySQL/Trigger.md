# Trigger

## Create a trigger

```sql
CREATE TRIGGER trigger_name
BEFORE|AFTER
INSERT|UPDATE|DELETE
ON table_name
FOR EACH ROW
SET something=something_else;
```

### BEGIN...END

Used for more complicated trigger statement.

```sql
DELIMITER //
CREATE TRIGGER trigger_name BEFORE INSERT ON table_name FOR EACH ROW
BEGIN
    UPDATE user SET order_count=order_count+1 WHERE id=NEW.created_by;
END;//
DELIMITER ;
```

### Create a trigger with existed-event

Add `FOLLOWS` or `PRECEDS` after `FOR EACH ROW` statement
to indicates proceeding after or before the `existed_trigger_name` respectively

```sql
CREATE TRIGGER trigger_name
BEFORE|AFTER
INSERT
on table_name
FOR EACH ROW
-- Here --
FOLLOWS|PRECEDES
existed_triiger_name
SET something=something_else
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
