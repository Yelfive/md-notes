# Rate Limit

## Directives

- limit_req_zone
- limit_req
- limit_req_status
- limit_req_log_level

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

## limit_req_zone

```
Syntax:     limit_req_zone key zone=name:size rate=rate;
Default:    —
Context:    http
```

Define a request zone, and how it checks the rate(`$binary_remote_addr` means for every IP)

**example**

```nginx
limit_req_zone $binary_remote_addr zone=one:10m rate=1r/s;
```

## limit_req

```
Syntax:     limit_req zone=name [burst=number] [nodelay];
Default:    —
Context:    http, server, location
```

Apply the limit on request

- `burst` integer value to indicate how many request to delay before error
- `nodelay` to raise an error `limit_req_status` when rate is over even `burst`

## limit_req_status

```
Syntax:     limit_req_status code;
Default:    limit_req_status 503;
Context:    http, server, location
This directive appeared in version 1.3.15.
```

## limit_req_log_level

```
Syntax:     limit_req_log_level info | notice | warn | error;
Default:    limit_req_log_level error;
Context:    http, server, location
This directive appeared in version 0.8.18.
```


