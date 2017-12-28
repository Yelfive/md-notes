# Basic Auth

## Directives

- auth_basic
- auth_basic_user_file

## Example

```nginx

```

## Syntax

### auth_basic

```nginx
Syntax:     auth_basic string | off;
Default:    auth_basic off;
Context:    http, server, location, limit_except
```

> Enables validation of user name and password using the “HTTP Basic Authentication” protocol. The specified parameter is used as a realm. Parameter value can contain variables (1.3.10, 1.2.7). The special value off allows cancelling the effect of the auth_basic directive inherited from the previous configuration level.

### auth_basic_user_file

```nginx
Syntax:     auth_basic_user_file file;
Default:    —
Context:    http, server, location, limit_except
```

> Specifies a file that keeps user names and passwords, in the following format:

```
# comment
name1:password1
name2:password2:comment
name3:password3
```

The file name can contain variables.

The following password types are supported:

encrypted with the crypt() function; can be generated using the “htpasswd” utility from the Apache HTTP Server distribution or the “openssl passwd” command;
hashed with the Apache variant of the MD5-based password algorithm (apr1); can be generated with the same tools;
specified by the “{scheme}data” syntax (1.0.3+) as described in RFC 2307; currently implemented schemes include PLAIN (an example one, should not be used), SHA (1.3.13) (plain SHA-1 hashing, should not be used) and SSHA (salted SHA-1 hashing, used by some software packages, notably OpenLDAP and Dovecot).