# Export/Import MySQL Data

## Export

### Export All Databases

```bash
mysqldump -u root -p --all-databases > backup.sql
```

### Export Whole Database

```bash
mysqldump -u root -p database_name > backup.sql
```

### Export Specified Tables

```bash
mysqldump -u root -p database_name table_1 table_2 > backup.sql
```

### Export Only Structures

With option `--no-data`, only structure will be exported.
This option can be applied to any of above exporting actions.

```bash
mysqldump --no-data -u root -p database_name > backup.sql
```

## Import
