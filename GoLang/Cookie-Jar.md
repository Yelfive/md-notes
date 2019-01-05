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
jar := cookiejar.New(nil)

// Set cookies
jar.SetCookies()

client := &http.Client{
    Jar: jar
}

// Perform request
client.Get(uri)

// Get cookie set by response
jar.Cookie()
```

## See also

- url.Parse(rawUrl string)