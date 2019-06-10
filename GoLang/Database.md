# Database

## MySQL

### Connection

Actually `sql.Open` does not open a database connection,
it simply registers the config,
and when a connection is needed to perform actions such as `SELECT`,
an actual connection will be get from connection pool(created or not)

```golang
import (
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)

func init() {
    db, err := sql.Open("mysql", "user:pass@tcp(localhost:3306)/dbname")
    if err != nil {
        log.Fatal("Error occurs when connecting database: ", err)
    }
}
```

### Handle when database fields unknown

```golang
func main() {
    rows : = db.Query("SHOW DATABASES")

    colFields, _ := rows.Columns()

    var dbRows []map[string]interface{}

    for rows.Next() {
        // placeholders to hold values
        var colValues = make([]interface{}, len(colFields))
        // placeholders to hold pointer of colValues
        // which is used for rows.Scan
        var colPointers = make([]interface{}, len(colFields))
        for i := 0; i < len(colFields); i++ {
            colPointers[i] = &colValues[i]
        }
        _ = rows.Scan(colPointers...)

        // A map to hold row data
        dbRow := map[string]interface{}{}
        for i := 0; i < len(colFields); i++ {
            dbRow[colFields[i]] = colValues[i]
        }
        // Append to list of dbRow
        dbRows = append(dbRows, dbRow)
    }

    for _, m := range dbRows {
        for k, v := range m {
            fmt.Printf("%s=%s\n", k, v)
        }
    }
}
```