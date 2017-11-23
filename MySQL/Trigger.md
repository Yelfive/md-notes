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

- `NEW` Represents the new row, event `DELETE` does not have one.
- `OLD` Represents the old row, event `INSERT` does not have one.