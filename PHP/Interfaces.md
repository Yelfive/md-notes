# Interfaces

## JsonSerializable 

Custom serialized data when using `json_encode()`,
the returned value is with type of *mixed* and
will be recursively json serialized until it is a string.

```php
<?php
interface JsonSerializable {
    abstract public mixed jsonSerialize ( void )
    }
}
```

### examples

```php
<?php

class SomeJsonObject implements JsonSerializable
{
    public function jsonSerialize()
    {
        return 'aaa';
    }
}
```