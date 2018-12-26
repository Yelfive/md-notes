# Grammar Basics

## Constants

```go
const NAME = "Felix"
const (
    A = 1
    B = "hello"
)
```

### iota

```go
const (
    A = iota // a: 0
    B = iota // b: 1
    C        // `c = iota` c: 2
)
```

## Closure

```go
func getClosure() func(func_list) (return_types) {
    func (x int, y int) int {
        return x + y
    }
}
func (x int, y int) int {
    return x + y
}
```

## Array

```go
var variable_name [size] type

var variable_name = [size]type{elements list}

// Without initial values
var balance [5] int
// With initial values
var balance = [5] int {1, 2, 3, 4, 5}
// Without specifying size
var balance = [...] int {1, 2, 3, 4, 5}
```

## Slice

A size variable array, can be enlarged or extended by `append` copied by `copy`

### definition

```go
// By define a size-less array
var slice_name [] element_type

// By `make`
slice_name := make([] int, length, capacity)
```

## Map

### definition

```go
var map_name map[key_type]value_type

// Example
var bookInfo map[string] string

bookInfo["author"] = "Felix"
BookInfo["price"] = "Priceless"
```