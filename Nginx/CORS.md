# Cross Origin Resource Sharing

## Nginx

```nginx
    add_header Access-Control-Allow-Origin http://example.com;
    add_header Access-Control-Allow-Credentials true;
    add_header Access-Control-Allow-Headers Content-Type,Accept;
    add_header Access-Control-Allow-Methods GET,POST,DELETE,PUT;
    if ($request_method = 'OPTIONS') {
        return 204;
    }
```

## PHP

```php
header('Access-Control-Allow-Origin: http://example.com');
header('Access-Control-Allow-Methods: DELETE, PUT');
header('Access-Control-Allow-Headers: X-Access-Token, X-Test');
header('Access-Control-Allow-Credentials: true');
```
