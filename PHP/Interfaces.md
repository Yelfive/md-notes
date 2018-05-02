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
        // Case 1: return scalar of null
        return 'Some scalar/null';

         // Case 2
    }
}

$obj = new SomeJsonObject();

echo json_encode($obj);
// Case 1: "'Some scalar/null'"
// Case 2: 
```