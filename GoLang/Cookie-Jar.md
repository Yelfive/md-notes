# Cookie Jar

```go
type CookieJar interface {

}
```

```go
type Jar struct {

}
```

## Usage

```go
jar = cookiejar.New(nil)

client = &http.Client{
    Jar: jar
}
```