# Interfaces

## JsonSerializable 

Custom serialized data when using `json_encode()`, the returned value will 

```php
<?php
interface JsonSerializable {
    abstract public mixed jsonSerialize ( void )
    }
}
```
