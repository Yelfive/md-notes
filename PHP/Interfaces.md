# Interfaces

## JsonSerializable 

Custom serialized data when using `json_encode()`,
the returned value is with type of *mixed* and
will be recursively json serialized until it is a scalar/null.

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

         // Case 2: return array/object
         // json_encode();
         return [1, 2, 3];
    }
}

$obj = new SomeJsonObject();

echo json_encode($obj);
// Case 1: "'Some scalar/null'", returns scalar or null
// Case 2: [1, 2, 3], returns json_encode(array/object)
```