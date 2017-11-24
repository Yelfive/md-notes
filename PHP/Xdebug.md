# XDebug

```bash
git clone https://github.com/xdebug/xdebug.git
cd xdebug
phpize
./configure
make
cp .lib/xdebug.so /usr/local/lib/php/extensions/no-debug-non-zts-20160303/
```


```ini
[Xdebug]
zend_extension = xdebug.so
xdebug.remote_enable = on
xdebug.remote_handler = dbgp
xdebug.idekey = PHPSTORM
xdebug.remote_host = 10.254.254.254
xdebug.overload_var_dump = Off
```

## xdebug.remote_host

> Type: string, Default value: localhost

Selects the host where the debug **client** is running,
you can either use a host name or an IP address.
This setting is ignored if `xdebug.remote_connect_back` is enabled.
