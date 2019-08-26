
# Reverse Proxy

## Example

```nginx

upstream backend {
    server 192.168.1.27:8080 weight=6 max_fails=2 fail_timeout=5;
    server 192.168.1.27:8081 weight=4 max_fails=2 fail_timeout=5;
}

server {
    listen       80;
    # Proxy the HTTP protocol
    location / {
        rewrite .* /index.php break;
        proxy_pass http://backend;
        proxy_set_header   Host             $host; # host name passed to the proxied server
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
    }

    # Proxy the WebSocket protocol
    location ~ ^/socket.io {
        proxy_pass http://114.215.84.179:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'Upgrade';
    }   
}
```

For `WebSocket`

```nginx
server {
    location /api/ {
        proxy_pass http://localhost:8080;
        proxy_http_version  1.1;
        proxy_set_header    Host                $host;
        proxy_set_header    X-Real-IP           $remote_addr;
        proxy_set_header    X-Forwarded-For     $proxy_add_x_forwarded_for;
        proxy_set_header    Upgrade             $http_upgrade;
        proxy_set_header    Connection          Upgrade;
    }
}
```


# rewrite 

```nginx
rewrite regexp replacement [flag]

```

> [Rewrite][rewrite] URI and returns to the client by default.
> If `http(s)://` or `$scheme` is the replacement, the processing will stop and redirect is returned to the client.

### context

> server, location, if

### flag

- last 
    
    > stops processing the current set of ngx_http_rewrite_module directives and starts a search for a new location matching the changed URI;
    >
    > Last rule for this **block**

- break

    > stops processing the current set of ngx_http_rewrite_module directives as with the [break][break] directive;
    > 
    > Stop searching rules in this block, and if the rule is in `location`, it stays in `location`

- redirect

    > returns a temporary redirect with the 302 code; used if a replacement string does not start with “http://”, “https://”, or “$scheme”;

- permanent

    > returns a permanent redirect with the 301 code

## Reverse Proxy SSH

`SSH` traffic can be reverse proxied by `Nginx`. This is especially useful when you want to redirect traffic to a local machine, such as hosting a `GitLab` or `SSH server` on a local machine and with a server, which has public ip address. 

```conf
stream {
    upstream ssh_gitlab {
        # syntax
        # server ip:port
        server 118.113.177.164:712;
    }
    server {
        listen 22;
        proxy_pass ssh_gitlab;
    }
}
http {
    # ...
}
```

1. 

[break]: https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#break
[rewrite]: https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite


