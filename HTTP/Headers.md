# Headers

## X-Forwarded-Proto

When reverse-proxied, this header is used to store the origin protocol. Such as when the client started as `https` but proxied as `http`, this header can tell the server it started as `https`.

```http
GET / HTTP/1.1
X-Forwarded-Proto: https
```
