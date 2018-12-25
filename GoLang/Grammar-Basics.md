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
