# Grammar Basics

## Overview

### What's GOPATH

`GOPATH` is the home of go, which contains three directories: `bin`, `pkg`, `src`.

If more than one path want specifying, separate them with semicolon (`:`)

```shell
export GOPATH=path1:path2
```

### Directory structure

```text
$GOPATH
|- /bin
|   |
|   ` binary_file
|- /pkg
|   |
|   ` pkg.a
`- /src
    |
    |- github.com
    |   |
    |   ` yelfie
    |       |
    |       ` pkg.go
    |- mypkg
    |   |
    |   ` mypkg.go
    `- myapp
        |
        ` myapp.go
```

- `bin`

    For executable binary files, *.exe for windows

- `pkg`

    For application packages. Which is created by running `go install packageName`, and the `packageName` has no `main` function.

- `src`

    For all source files: package, application etc.

### Applications vs. Packages

For go source files (`*.go`), when a package has a `main` function inside, it is called "**application**", and otherwise it's a "**package**"

### Directory

A go package can has multiple level directories, and the last part of the path is called `package name`. Such as:

- `$GOPATH/go/pkg/github.com/yelfive/mymath`
- `$GOPATH/go/pkg/mymath`

## Commands

### go run

To build application or packages(`$GOPATH/pkg/*.a`)

### go get

To download a go package, which generally works by cloning from repository and then run `go install`

`go get -u` will download the package and its dependencies.

### go build vs. go install

1. `go install` will generate files, depending on it's package(without `main` function) or executable(with `main` function), while `go build` may not.

    - `go install` will generate files in `/pkg` for packages and for executable it will be in `/bin`.
    - `go build` will generate a binary file in current directory.

2. `go build` will automatically choose go file with suffix according to the OS, such as
    - `array_linux.go`
    - `array_darwin.go`
    - `array_windows.go`
    - `array_freebsd.go`

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

## Interface

## define a interface

```go
type Name interface {
    methodName return_type
}
```

## implements a interface

```go
// Define a structure
type StructureName struct {
    // variables
}

// Implements the interface to the `StructureName`
func (StructureVariableName StructureName) methodName() return_type {
    // do something
}
// Then the interface `Name` is implemented by `StructureName`
```

**Note**: Interfaces must be defined and implemented outside functions

### Example

```go
package main

import "fmt"

type Phone interface {
    call()
}

type NokiaPhone struct {
    name string
}

func (nokiaPhone NokiaPhone) call() {
    nokiaPhone.name = "Nokia"
    fmt.Printf("Hello, I'm %s\n", nokiaPhone.name)
}

func main() {
    var phone Phone
    phone = new(NokiaPhone)
    phone.call() // prints: Hello, I'm Nokia
}
```

## panic

`panic` will print out error message and goroutine traces then exit with a none-zero status code.

It similar to PHP's throw exception, which output an error message and a runtime trace.

### syntax

```go
panic(interface{})
```

### example

```go
panic("something goes wrong")
panic(errors.New("something goes wrong"))
```
