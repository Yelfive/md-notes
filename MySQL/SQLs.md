# SQLs

## Disable constrain checks

```sql
set unique_checks = 0
set foreign_key_checks = 0
```

## Update a column based on value of another table

```sql
update ic_excel_car_relation as r, ic_excel as e set r.created_by=e.created_by where r.excel_id=e.id
```

## Read and execute from sql file

```bash
mysql -u root -p table_name < file.sql
```

> If every goes well, no output will be generated. You should output with SQL instead.

## Export to csv

```sql
SELECT order_id,product_name,qty
FROM orders
WHERE foo = 'bar'
INTO OUTFILE '/var/lib/mysql-files/orders.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n';
```