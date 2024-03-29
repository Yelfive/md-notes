---
recommend: true
---

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
3. `go build` will ignore the files starts with `_` or `.`.

### go clean

To clean compiled files, which should not be committed to repositories.

### go test

It reads `*_test.go` under current package.

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

## Anonymous field in structure

```go
struct Human {
    name string
    age uint
    weight uint
}

struct Man {
    /*
     * Anonymous field allows `Man` to have all fields in `Human`
     */
    Human // Anonymous field
    Hair string
}

mark := Man{Human{"Mark", 16, 175}, "Black"}

fmt.Println("name is", mark.name)
```

## struct tags


```go
package main

import (
    "fmt"
    "reflect"
)

type T struct {
    bar string "I am a tag"
    foo string `one:"1" two:"2"blank:""`
}
func main() {
    t := reflect.TypeOf(T{})
    f, _ := t.FieldByName("foo")
    fmt.Println(f.Tag) // one:"1" two:"2"blank:""
    v, ok := f.Tag.Lookup("one")
    fmt.Printf("%s, %t\n", v, ok) // 1, true
    v, ok = f.Tag.Lookup("blank")
    fmt.Printf("%s, %t\n", v, ok) // , true
    v, ok = f.Tag.Lookup("three")
    fmt.Printf("%s, %t\n", v, ok) // , false
}
```

Tags of `struct` is optional for one field, it can be retrieved by GoLang `reflect`. However if tags are given in form of `key="value" key="value"`, reflect can conveniently get values for keys like the example above.

- If the tag is not conveniently formed, `string(Tag)` can be used to get the literal string.
- If the tag is conveniently formed, `StructTag.Lookup` and `StructTag.Get` can be used to "get value by key"

    ```go
    func (tag StructTag) Lookup(key string) (value string, ok bool)
    func (tag StructTag) Get(key string) string
    ```

Struct tag can be used in occasion like `json`, `xml`, `orm` etc.

### See Also

- [Tags in Golang](https://medium.com/golangspec/tags-in-golang-3e5db0b8ef3e)
- [reflect#StructTag](https://golang.org/pkg/reflect/#StructTag)

## About methods

```go
type Box struct {
    Color string
}

func (b *Box) PaintBlack() {
    b.Color = "black"
}

func (b *Box) PaintRed() {
    b.Color = "red"
}

func main() {
    box := Box{}
    box.PaintBlack()
    fmt.Println(box.Color)
    (&box).PaintRed()
    fmt.Println(box.Color)
}
```

output:

```text
black
red
```

### Conclusion

When a receiver is defined as a pointer, no matter whether the caller is a pointer or not, go will automatically translate it to a pointer if not.

Similarly, If the receiver is defined as a non-pointer, the caller will be translated into a non-pointer if it is a pointer.

## Object-Oriented

### Inherit

```go
type Human struct {
    name string
    age uint
}

type Student struct {
    // Anonymous field
    Human
    Major string
}

// Define a method on Human
// and it will be inherited by Student
func (h *Human) SayHi() {
    fmt.Printf("Hi, I'm %s", h.name)
}

func main() {
    s = Student{"Felix", 29}
    s.SayHi()
}
```

and it will print

```text
Hi, I'm Felix
```

### Overwrite

```go
// ...
// Student/Human definition

// Overwrite the `SayHi` method defined on `Human`
func (s *Student) SayHi() {
    fmt.Printf("Hello, my name is %s\n", s.name);
}

func main() {
    // Same as above
}
```

and it will print

```text
Hello, my name is Felix
```

## type `interface{}`

In GoLang every data type implements `interface{}`, so if a variable is defined as `interface{}`, it can be assigned any value.

```go
var v interface{}
i := 1
s := "hello"

v = i // integer
v = s // string
```

### determine what type is stored inside a `interface{}`

#### Comma-ok assertion

```go
var a interface{}
a = 1

if value, ok := a.(int); ok {
    fmt.Println("int", value)
} else if _, ok := a.(string); ok {
    fmt.Println("string")
}
```

#### switch assertion

```go
var a interface{}
a = 1

switch value := a.(type) {
    case int:
        fmt.Println("int", value)
    case string:
        fmt.Println("string", value)
}
```

> Note: `a.(type)` notation is only available inside switch.

### extends

```go

type Interface1 interface {
    method1()
}

type Interface2 interface {
    Interface1
    method2()
}

// Interface2 has both method1 and method2 then.
```

**See Also** https://blog.golang.org/laws-of-reflection

## Reflection

- `reflect.ValueOf(i)`

    Returns a new `Value` initialized to the concrete value stored in the interface i. ValueOf(nil) returns the zero `Value`.

- `reflect.TypeOf(i)`

    Returns the reflection `Type` that represents the dynamic type of i. If i is a `nil` interface value, `TypeOf` returns `nil`.

## `runtime` methods

- `runtime.Goexit` Exit current goroutine, which `defer` to being exectued.
- `runtime.Gosched()` tells CPU to leave some interval to other tasks, not taking all CPU time(scheduled).
- `runtime.NumCPU` Returns the number of CPUs
- `runtime.NumGoroutine` Returns the total number of gorouines, including running and scheduled tasks.
- `runtime.GOMAXPROCS` Set the the max number of CPU cores available for concurrently computing and returns the original value.

## regexp

```go
regexp.MatchString(pattern string, data) (matched bool, err error)
```

## import

### 1. dot `.`

```go
import (
    . "fmt"
)

Println(sth) // instead of fmt.Println
```

### 2. alias

```go
import (
    f "fmt"
)

f.Println(sth) // instead of fmt.Println
```

### 3. underscore `_`

```go
import (
    _ "some/package"
)
```

Call the `init` function inside `some/package`

## exception control

Go does not have mechanism as `try...catch`, it provides a `panic & recover` mechanism

```go
func sth() {
    defer func() {
        if x := recover; x != nil {
            // do something here
        }
    }()

    goPanicHere()
}
```

### panic

`panic` will print out error message and goroutine traces then exit with a none-zero status code.

It's similar to PHP's throw exception, which output an error message and a runtime trace.

#### syntax

```go
panic(interface{})
```

#### example

```go
panic("something goes wrong")
panic(errors.New("something goes wrong"))
```

### recover

`recover` can only used when in deferred function, and it returns the `interface{}` being panicked, and if it's called out of `defer`, it returns `nil`.

```go
defer func () {
    if err := recover; err != nil {
        //something goes wrong
    }
}

// or you can even return something here
func sth() (inReturn string) {
    defer func () {
        if err:=recover; err != nil {
            inReturn = "oops, something goes wrong"
        }
    }
    somethingCausePanic()
    return
}
```

## Regular Expression

In GoLang, regular expression is provided by package `regexp`, it contains methods of four types:

- `Match`
- `Compile`
- `Find`
- `Replace`

## switch

`switch` clause will automatically `break` after each `case`, `fallthrough` will force it not to `break` and continue calling the next `case`

```go
switch cond {
case 1:
    fallthrough
case 2:
    // something else
}
```

## sync.WaitGroup

```go
// 等待所有 goroutine 执行完毕
// 使用传址方式为 WaitGroup 变量传参
// 使用 channel 关闭 goroutine

func main() {
    var wg sync.WaitGroup
    done := make(chan struct{})
    ch := make(chan interface{})

    workerCount := 2
    for i := 0; i < workerCount; i++ {
        wg.Add(1)
        go doIt(i, ch, done, &wg)    // wg 传指针，doIt() 内部会改变 wg 的值
    }

    for i := 0; i < workerCount; i++ {  // 向 ch 中发送数据，关闭 goroutine
        ch <- i
    }

    close(done)
    wg.Wait()
    close(ch)
    fmt.Println("all done!")
}

func doIt(workerID int, ch <-chan interface{}, done <-chan struct{},
// It MUST be reference argument, or else to `wg` will be copied and won't affect the main process
 wg *sync.WaitGroup,
 ) {
    fmt.Printf("[%v] is running\n", workerID)
    defer wg.Done()
    for {
        select {
        case m := <-ch:
            fmt.Printf("[%v] m => %v\n", workerID, m)
        case <-done:
            fmt.Printf("[%v] is done\n", workerID)
            return
        }
    }
}
```

## init & main

`init` and `main` are reserved function name.

`init` is the function invoked after a package is loaded. Inside a package, there can be multiple `init` function defined, but one for each package is recommended.

`main` is the function distinguish a **package** from a **executable**. The package without a `main` function is package library and the other a executable library.

The following image illustrates init and main calling stack.

![init stack](https://raw.githubusercontent.com/astaxie/build-web-application-with-golang/master/zh/images/2.3.init.png)

## go database sql

```go
var (
    id int
    name string
)
rows, err := db.Query("select id, name from users where id = ?", 1)
if err != nil {
    log.Fatal(err)
}
defer rows.Close()
for rows.Next() {
    err := rows.Scan(&id, &name)cszxdc 
    if err != nil {
        log.Fatal(err)
    }
    log.Println(id, name)
}
err = rows.Err()
if err != nil {
    log.Fatal(err)
}
```

1. `defer rows.Close()`, `rows` should always be closed to tell the pool this connection is available

    > Second, as long as there’s an open result set (represented by `rows`), the underlying connection is busy and can’t be used for any other query. That means it’s not available in the connection pool. If you iterate over all of the rows with `rows.Next()`, eventually you’ll read the last row, and `rows.Next()` will encounter an internal EOF error and call rows.Close() for you. But if for some reason you exit that loop – an early return, or so on – then the `rows` doesn’t get closed, and the connection remains open. (It is auto-closed if `rows.Next()` returns false due to an error, though). This is an easy way to run out of resources.

    See also [Retrieving Result Sets](http://go-database-sql.org/retrieving.html)