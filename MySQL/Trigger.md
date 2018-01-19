# Trigger

```sql
CREATE
    [DEFINER = { user | CURRENT_USER }]
    TRIGGER trigger_name
    trigger_time trigger_event
    ON tbl_name FOR EACH ROW
    [trigger_order]
    trigger_body

trigger_time: { BEFORE | AFTER }

trigger_event: { INSERT | UPDATE | DELETE }

trigger_order: { FOLLOWS | PRECEDES } other_trigger_name
```

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
DELIMITER |
CREATE TRIGGER trigger_name BEFORE INSERT ON table_name FOR EACH ROW
BEGIN
    UPDATE user SET order_count=order_count+1 WHERE id=NEW.created_by;
    
    IF NEW.amount < 0 THEN
       SET NEW.amount = 0;
    ELSEIF NEW.amount > 100 THEN
       SET NEW.amount = 100;
    END IF;
END;
|
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

## Notice

1. Cannot use a `CALL` to procedures that return data to client or those use dynamic SQLs
2. Cannot begin or end a transaction, except for `ROLLBACK TO SAVEPOINT` which does not end a transaction

## Appendix

- [dev.mysql.com](https://dev.mysql.com/doc/refman/5.7/en/create-trigger.html)

    