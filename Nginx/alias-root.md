# Nginx directives: `alias` and `root`

Directives `alias` and `root` both are used declare the root directory to serve.
The difference is, `alias` is used to tell this path is the directory, and `root` is used to tell path uses the following directory as root.

## Exmaple

### `alias`

```nginx
location /abc/ {
    alias /var/www/html/;
}
```

A request to `/abc/def` will fetch resource located at `/var/www/html/def`.

> **CAUTION** about the ending slash of `alias`. Without the slash, nginx will look for resource with path `/var/www/htmldef`.

### `root`

```nginx
location /abc/ {
    root /var/www/html;
}
```

A request to `/abc/def` will fetch resource located at `/var/www/html/abc/def`.
