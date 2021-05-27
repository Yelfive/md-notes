# Spring JdbcTemplate

Class: `org.springframework.jdbc.core.JdbcTemplate`

**Prepare**:

```java
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

DataSource dataSource = new DriverManagerDataSource("jdbc:mysql://localhost/db", "user", "pass");

JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
```

## Query

## For list

Interface `org.springframework.jdbc.core.RowMapper`

```java
List<Long> id = jdbcTemplate.query("SELECT * FROM roles ORDER BY id DESC", (rs, rowNum) -> {
    return rs.getLong("id");
});
```

### For single result

Interface `org.springframework.jdbc.core.ResultSetExtractor`

```java
Role role = jdbcTemplate.query("SELECT * FROM roles WHERE id=?", rs -> {
    if (rs.next()) {
        Role role1 = new Role();
        role1.setName(rs.getString("name"));
        return role1;
    } else {
        return null;
    }
}, 1);
```

### For scalar value

Interface `org.springframework.jdbc.core.ResultSetExtractor`

```java
String name = jdbcTemplate.query("SELECT * FROM roles WHERE id=?", rs -> {
    if (rs.next()) {
        return rs.getString("name");
    } else {
        return null;
    }
}, 1);

```

## Insert

### Get newly inserted id

```java
GeneratedKeyHolder holder = new GeneratedKeyHolder();
jdbc.update(con -> {
    PreparedStatement ps = con.prepareStatement("INSERT INTO user(name, slug, allow, group_name) VALUES(?, ?, ?, ?)", Statement.RETURN_GENERATED_KEYS);
    ps.setString(1, "James");
    ps.setString(2, "Some slug");
    ps.setString(3, "yes");
    ps.setString(4, "admin");
    return ps;
}, holder);

return Objects.requireNonNull(holder.getKey()).longValue();
```
