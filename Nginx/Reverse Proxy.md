
Reverse Proxy
=============

```nginx

upstream backend {
    server 192.168.1.27:8080 weight=6 max_fails=2 fail_timeout=5;
    server 192.168.1.27:8081 weight=4 max_fails=2 fail_timeout=5;
}

server {
    listen       80;
    location / {
        rewrite .* /index.php break;
        proxy_pass http://backend;
        proxy_set_header   Host             $host; # host name passed to the proxied server
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
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


[break]: https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#break
[rewrite]: https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite


