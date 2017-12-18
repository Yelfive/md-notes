# Rate Limit

## Directives

- limit_req_zone
- limit_req

**example**

```nginx

limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
limit_req zone=one nodelay;

```

+ $binary_remote_addr
    
    Client IP address

+ zone=one:10m
    
    Defines a zone with name "one" in memory to hold the buffer, and the buffer size is 10 megabytes

+ rate=1r/s
    
    1 request per second

    Available units:

    * `r/s`
    * `r/min`

+ nodelay

    return `limit_req_status` immediately, instead of waiting for processing. 
