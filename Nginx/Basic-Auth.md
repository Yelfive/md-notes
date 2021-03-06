# Basic Auth

## Directives

- auth_basic
- auth_basic_user_file

## Example

### Generate password

Create user `username` and store the user:password pair at /path/to/password.db

**htpasswd**

```bash
htpasswd -c /path/to/password.db username
```

**openssl**

```bash
openssl passwd -crypt 123456 | args -I {} echo username:{} >> /etc/nginx/passwd.db
```

### Nginx conf

```nginx
server {
    # something
    auth_basic "prompt when auth required";
    auth_basic_user_file /path/to/password.db;
}
```

## Syntax

### auth_basic

```nginx
Syntax:     auth_basic string | off;
Default:    auth_basic off;
Context:    http, server, location, limit_except
```

String to prompt when auth required.

> Enables validation of user name and password using the “HTTP Basic Authentication” protocol. The specified parameter is used as a realm. Parameter value can contain variables (1.3.10, 1.2.7).

> The special value `off` allows cancelling the effect of the auth_basic directive inherited from the previous configuration level.

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

- encrypted with the **crypt()** function; can be generated using the **"htpasswd"** utility from the Apache HTTP Server distribution or the **"openssl passwd"** command;
- hashed with the Apache variant of the MD5-based password algorithm (apr1); can be generated with the same tools;
- specified by the **"{scheme}data"** syntax (1.0.3+) as described in [RFC 2307][2307]; currently implemented schemes include PLAIN (an example one, should not be used), SHA (1.3.13) (plain SHA-1 hashing, should not be used) and SSHA (salted SHA-1 hashing, used by some software packages, notably OpenLDAP and Dovecot).

    > Support for SHA scheme was added only to aid in migration from other web servers. It should not be used for new passwords, since unsalted SHA-1 hashing that it employs is vulnerable to rainbow table attacks.

[2307]: https://tools.ietf.org/html/rfc2307#section-5.3
