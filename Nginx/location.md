# location

It is important to understand that, by default, Nginx will serve regular expression matches in preference to prefix matches. However, it evaluates prefix locations first, allowing for the administer to override this tendency by specifying locations using the = and ^~ modifiers. 

#### syntax

```nginx
location modifier uri {

}
```

`uri` here means string prefix(start of a string) or regular expression, depends on the modifier

#### context

- server
- location

#### modifier

- `=`
    
    Exact match, non-regular

    ```nginx
    #nginx
    location = / {
        # match http://www.domain.com
    }
    ```

- `~`

    **Regular match**

    Case sensitive match

- `~*`

    **Regular match**

    Case insensitive match

- `^~`

    Matches prefix string, and no regular expression location will be checked.

    Similar to `=`, while the later means **exact match**.

#### Example

```nginx
location = / {
    #[ configuration A ]
}

location / {
    #[ configuration B ]
}

location /documents/ {
    #[ configuration C ]
}

location ^~ /images/ {
    #[ configuration D ]
}

location ~* \.(gif|jpg|jpeg)$ {
    #[ configuration E ]
}
```

- The `/` request will match configuration A
- The `/index.html` request will match configuration B
- The `/documents/document.html` request will match configuration C
- The `/images/1.gif` request will match configuration D
- The `/documents/1.jpg` request will match configuration E.

## More about prefix string

> **In response to a request with URI equal to this string, but without the trailing slash, a permanent redirect with the code 301 will be returned to the requested URI with the slash appended**. If this is not desired, an exact match of the URI and location could be defined like this:
> 
> ```nginx
> location /user/ {
>     proxy_pass http://user.example.com; 
> }
>
> location = /user {
>     proxy_pass http://login.example.com; 
> }
> ```
> _Referenced from [Nginx docs](https://nginx.org/en/docs/http/ngx_http_core_module.html#location)_

Which means, if you visit path `http://example.com/client/hello` and with configuration:

```nginx
location /client/ {
    # [some configuration]
}
```

you will actually get a response:

```http
HTTP/1.1 301 Moved Permanently
Location: http://example.com/client/hello/
```