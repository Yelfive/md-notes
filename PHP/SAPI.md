# Server Application Programming Interface

## Executing Process

> When we run a PHP program, it goes through the following process

- Application (input)
- SAPI
- Zend Engine
- Application (output)

Events
------

> Events during a request to SAPI

- Module Init(MINIT)

    > Calling all `PHP_MINIT_FUNCTION`.
    > Initialize internal variables, allocate resource, register resource processor.
    > This is will happen only once during PHP's life circle

- Request Init(RINIT)

    > Calling all `PHP_RINIT_FUNCITON` functions registered by modules, initialize environments for request, allocate resource.

- _Handling the request_
- Request Shutdown (RSHUTDOWN)

    > Calling all `PHP_RSHUTDOWN_FUNCTION` functions registered by modules, to gc. It happens when script finished or `exit/die` called

- Module Shutdown (MSHUTDOWN)

    > Calling all `PHP_MSHUTDON_FUNCTION`, to gc the module, close module's sub-system.

SPIs List
---------

**Common used**

- CGI/CLI `Command Line`
- Multiprocess `Apache`
- Multithreaded `Apache`
- FastCGI `Nginx`
- Embeded
    
    > Allowing C/C++ to make PHP call

**Others**

- apache
- apache2filter
- apache2handler
- caudium
- continuity
- isapi
- litespeed
- milter
- nsapi
- phttpd
- pi3web
- roxen
- thttpd
- tux
- webjames

PHP Lifespan
--------------

PHP's life circle differs from SAPIs, it starts when PHP starts, ends when PHP stops.

- CGI/CLI

    > **Starts** -> `MINIT` -> `RINIT` -> _handling request_ -> `RSHUTDOWN` -> `MSHUTDOWN` -> **Ends**

- Multiprocess `Apache`

    > Apache forks child processes to handle PHP request.
    > `MINIT` is called when child process created.
    >
    > `MSHHUTDOWN` is called when child process exits.
    >
    > `RINIT -> Request -> RSHUTDOWN` happens for every PHP request.

- Multithreaded `Apache`

    > Similar to multiprocess

- FastCGI `Nginx`

    > Similar to multiprocess.
    > FPM(FastCGI Process Manager) creates CGI process and do the `MINIT`,
    > waiting for requests and when it comes,
    > repeats the `RINIT -> Request -> RSHUTDOWN` phases.
    > `MSHUTDOWN` when CGI process exits.

- Embeded
    
    > Same as CGI


Appendix: Lifespan
--------

### CGI/CLI

```flow
> php test.php

    MINIT
      Read test.php
    RINIT
      Execute test.php
    RSHUTDOWN
    MSUTDOWN
      Terminated

```

### Multiprocess

```flow
            +------------+
            |   Apache   |
            +------------+
              |        |
+---------------+   +---------------+
| Child process |   | Child process |
+---------------+   +---------------+
        |                   |
+---------------+   +---------------+
    MINIT               MINIT
      RINIT               RINIT
      script              script
      RSHUTDOWN           RSHUTDOWN

      RINIT               RINIT
      script              script
      RSHUTDOWN           RSHUTDOWN

      ...                 ...
      ...                 ...
      ...                 ...
    MSHUTDOWN           MSHUTDOWN
+---------------+   +---------------+
        |                   |
+---------------+   +---------------+
| Child process |   | Child process |
| terminated    |   | terminated    |
+---------------+   +---------------+

```


Execute a script
----------------

Zend engine will will go through 4 phases to execute a script:

1. Scanning: extract tokens from source script
2. Parsing: translate tokens into expressions
3. Compilation: compile expressions into opcodes
4. Execution: execute the opcodes, one at a time





