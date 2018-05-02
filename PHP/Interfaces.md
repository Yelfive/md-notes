# Interfaces

## JsonSerializable 

Custom serialized data when using `json_encode()`,
the returned value is with type of *mixed* and will be recursively 

```php
<?php
interface JsonSerializable {
    abstract public mixed jsonSerialize ( void )
    }
}
```
