# CREATE PROCEDURE and CREATE FUNCTION

## Syntax

### procedure

```mysql
CREATE
    [DEFINER = { user | CURRENT_USER }]
    PROCEDURE sp_name ([proc_parameter[,...]])
    [characteristic ...] routine_body

proc_parameter:
    [ IN | OUT | INOUT ] param_name type
```

### function

```mysql
CREATE
    [DEFINER = { user | CURRENT_USER }]
    FUNCTION sp_name ([func_parameter[,...]])
    RETURNS type
    [characteristic ...] routine_body

func_parameter:
    param_name type
```

### common properties

```mysql

type:
    Any valid MySQL data type

characteristic:
    COMMENT 'string'
  | LANGUAGE SQL
  | [NOT] DETERMINISTIC
  | { CONTAINS SQL | NO SQL | READS SQL DATA | MODIFIES SQL DATA }
  | SQL SECURITY { DEFINER | INVOKER }

routine_body:
    Valid SQL routine statement
```


## Examples

### Function

```sql
CREATE FUNCTION hash_plate(plate_number VARCHAR(10))
RETURNS BIGINT DETERMINISTIC
BEGIN
  DECLARE i INT DEFAULT 1;
  DECLARE c CHAR DEFAULT '';
  DECLARE hashed TEXT DEFAULT '';
  DECLARE code INT;
  DECLARE pad_length INT;

  SET plate_number = UPPER(plate_number);
  WHILE i <= CHAR_LENGTH(plate_number) DO
    SET c = SUBSTRING(plate_number, i, 1);

    IF c REGEXP '^[0-9]$' THEN
      # Digital
      SET code = c;
      SET pad_length = 6;
    ELSEIF c REGEXP '^[A-Z]$' THEN
      # Alphabet, ASCII 65-90
      # minus 55
      SET code = ORD(c) - 55;
      SET pad_length = 6;
    ELSE 
      # Chinese
      SET code = ORD(c);
      SET pad_length = 24;
    END IF;
    
    SET hashed = CONCAT(hashed, LPAD(CONV(code, 10, 2), pad_length, 0));
    SET i = i + 1;
    
  END WHILE;
  
  RETURN CONV(hashed, 2, 10);
END;
```
