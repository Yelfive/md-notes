# SQLs

### Disable constrain checks

```sql
set unique_checks = 0
set foreign_key_checks = 0
```

### Update a column based on value of another table

```sql
update ic_excel_car_relation as r, ic_excel as e set r.created_by=e.created_by where r.excel_id=e.id
```
