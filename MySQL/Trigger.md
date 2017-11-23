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

