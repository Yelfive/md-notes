# Headers

## X-Forwarded-Proto([see also][nginx-proxy])

When reverse-proxied, this header is used to store the origin protocol. Such as when the client started as `https` but proxied as `http`, this header can tell the server it started as `https`.

```http
GET / HTTP/1.1
X-Forwarded-Proto: https
```

## X-Forwarded-For([see also][nginx-proxy])

Stores the proxy it passed trough.

```http
GET / HTTP/1.1
X-Forwarded-For: 192.168.1.2, 192.168.1.3
```

**Nginx**

```nginx
server name {
    location / {
        proxy_pass http://example.com;
        proxy_set_header X-Forwarded-For $proxy_x_add_forwarded_for;
    }
}
```


[nginx-proxy]: https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/

## WWW-Authenticate

```http
WWW-Authenticate: <type> realm=<realm>, <charset>
```

When a resource needs user's authentication, this header should be returned, defining the authentication type should be used.

- type
    The authentication type, defined ones: `Basic`, `Bearer`, `Digest`, `HOBA`, `Mutual`, `Negotiate`, `OAuth`, `SCRAM-SHA-1`, `SCRAM-SHA-256`, `vapid`
- realm
    The description of the area/resource to be protected
- charset

**example**

```http
WWW-Authenticate: Basic realm="Access to the staging site", charset="UTF-8"
```

## Authentication

```http
Authentication: <type> <credential>
```

When a client receives a `WWW-Authenticate` header with status `401`, it should prepare it's authentication and resend the previous request with this in header `Authentication`

**example**

```http
Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l
```

