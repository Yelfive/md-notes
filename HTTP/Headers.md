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

## WWW-Authenticate and Authentication

```http
WWW-Authenticate: <type> realm=<realm>, <charset>
```

When a resource needs user's authentication, this header should be returned, defining the authentication type should be used.

- type
    The authentication type, defined ones: `Basic`
- realm
- charset


```http
Authentication: <type> <credential>
```

