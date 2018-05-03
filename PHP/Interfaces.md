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
         // json_encode([1, 2, 3]);
         return [1, 2, 3];
    }
}

$obj = new SomeJsonObject();

echo json_encode(['value' => $obj]);
// Case 1: {"value": "Some scalar/null"}, returns scalar or null
// Case 2: {"value": [1, 2, 3]}, returns json_encode(array/object)
```

## Traversable

This is the base class of all iterable

> Abstract base interface that cannot be implemented alone. Instead it must be implemented by either IteratorAggregate or Iterator.

## Iterator

Can be used by `foreach`

```php
<?php
interface Iterator extends Traversable
{
    /* Methods */
    abstract public mixed current ( void )
    abstract public scalar key ( void )
    abstract public void next ( void )
    abstract public void rewind ( void )
    abstract public bool valid ( void )
}
```

## IteratorAggregate

To create an iterator that can be used externally.

```php
<?php

interface IteratorAggregate extends Traversable
{
    /* Methods */
    abstract public Traversable getIterator ( void )
}
```

### example

```php
class MyIterator implements IteratorAggregate
{
    public function getIterator()
    {
        Array
    }
}
```