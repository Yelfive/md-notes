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

    ```conf
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

    Terminate non-regular expression match

    This works for **non-regular expression** only

#### Example

```conf
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
