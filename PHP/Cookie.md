# Cookie

> setcookie() defines a cookie to be sent along with the rest of the HTTP headers. Like other headers, cookies must be sent before any output from your script (this is a protocol restriction). This requires that you place calls to this function prior to any output, including `<html>` and `<head>` tags as well as any whitespace.

## Signature

```php
<?php
setcookie(string $name, string $value, time() - 1, string $path, string $domain, bool $secure, bool $http_only);
```

## Set a cookie

```php
<?php
setcookie($name, $value, time() + 86400);
```

## Expires a cookie

```php
<?php
setcookie($name, $value, time() - 1);
```

