# Cascade Operations

Cascade in DBS means to do something along with some action.

Such as to

```sql
UPDATE/DELETE a table.field when another table.filed is updated/deleted
```

## SQL:2011 Spec

`ON DELETE CASCADE`: if a row of the referenced table is deleted, then all matching rows in the referencing table are deleted.

`ON DELETE SET NULL`: if a row of the referenced table is deleted, then all referencing columns in all matching rows of the referencing table to be set to null.

`ON DELETE SET DEFAULT`: if a row of the referenced table is deleted, then all referencing columns in all matching rows of the referencing table to be set to the column’s default value.

`ON DELETE RESTRICT`: it is prohibited to delete a row of the referenced table if that row has any matching rows in the referencing table.

`ON DELETE NO ACTION` (the default): there is no referential delete action; the referential constraint only specifies a constraint check, which in _MySQL_ equals to `ON DELETE RESTRICT`

## Doctrine cacade

```php
<?php

namespace App\Entity;

class Comment
{
    /**
     * @var User
     * @ORM\ManyToOne(targetEntity="App\Entity\User", cascade={"all"})
     */
    protected $user;
}
```

### cascade candidates

```doctrine
cascade={"persist", "remove"}
```

- `persist`
- `remove`
- `merge`
- `detach`
- `refresh`
- `all` All of the above

## See Also

- [MySQL: Using Foreign Key Constraints](https://dev.mysql.com/doc/refman/8.0/en/create-table-foreign-keys.html)