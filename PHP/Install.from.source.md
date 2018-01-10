# Install from source

## 1. download

```bash
wget http://cn2.php.net/distributions/php-7.1.13.tar.gz
tar -zxf php-7.1.13.tar.gz php-7.1.13
```

## 2. Configure

```bash
cd php-7.1.13
./configure --help
./configure \
--prefix=/usr/local \
--with-config-file-path=/usr/local/etc/php \
--with-config-file-scan-dir=/usr/local/etc/php/conf.d \

```

