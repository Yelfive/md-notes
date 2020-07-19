# Upstream for SLB

> Server Loading Balance

## Example

```nginx

upstream upstream_name {
    server domain.com weight max_fails  ;
    server 127.0.0.1;
}

# Define upstream failure definition, with status code
# Status code starts with `http_`

proxy_next_upstream http_400;

```

## Directives

### upstream

#### syntax

```nginx
upstream hello {
    server address [parameters];
    server address [parameters];
}
```

#### context

> upstream

#### address

- IP address with optional port number
- domain name with optional port number
- UNIX-domain socket `unix:`

#### parameters

- `weight = number`

    > Default 1
    >
    > Weight of the server.

- `max_conns = number`

    > Default 0, no limit.
    >
    > Limits the maximum number of simultaneous active connections to the proxied server

- `max_fails = number`

    > Default 1; 0 for no-limit
    >
    > Sets the number of unsuccessful attempts to communicate with the server that should happen to be considered as **unavailable**

- `fail_timeout = time`

    > Default 10 seconds.
    >
    > 1. After `max_fails`, the server will be considered as **unavailable**
    > 2. After becoming unavailable, the next `fail_timeout` will be considered as unavailable and after which, the server will be tried again

- `backup`

    > Marks the server as backup server, it will be used **only** when **all** primary servers are unavailable

- `down`

    > Marks the server permanently unavailable

## proxy_next_upstream

### syntax

```nginx
proxy_next_upstream parameters;
```

### context

> http, server, location

### default

> proxy_next_upstream error timeout

### parameters

- non_idempotent

    > Allows for non idempotent request methods(POST, PUT, DELETE) to be passed to next server

- error

    > Error occurs while establishing a connection with a server,
    > passing a request to it, reading the response header.
    >
    > Always set, event not in option list

- timeout

    > Timeout while establishing a connection with a server,
    > passing a request to it, reading the response header.
    >
    > Always set, event not in option list

- invalid_header

    > A server returned an empty or invalid response
    > 
    > Always set, event not in option list

- http_*

    > For code `4XX` , the request will be passed to other servers,
    > but will never be considered as
    > **unsuccessful attempts**(for max_fails counting)
    > or **service unavailable**

    Status Code |Description
    ---         |---
    403         |Forbidden
    404         |Not Found
    429         |Too Many Requests
    500         |Server Internal Error
    502         |Bad Request
    503         |Service Unavailable
    504         |Gateway Timeout

## proxy_next_upstream_tries

> To specify how many times to try the upstreams, every try counts, including the first one, no matter failed or not

### syntax

```nginx
proxy_next_upstream_tries number
```

#### number

- `0` means no limitation
- `1` means try just once, if this one fails, the error response will be sent
