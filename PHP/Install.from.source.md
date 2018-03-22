# Install from source

This article is based on `PHP 7.1.13`, may differs from versions

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
--with-curl \
--with-libxml-dir \
--enable-intl \
--enable-mbstring \
--with-mysqli \
--with-pdo-mysql \
--enable-pcntl \
--enable-zip \
--with-openssl \
--with-pear \
--with-zlib \
--with-gd \
--with-readline
```

### 2.1 Dependencies

#### CentOS

```bash
yum install -y libcurl-devel libxml2-devel libicu-devel libpng-devel libreadline-devel
```

#### Ubuntu

```bash
sudo apt-get install -y libcurl-dev libxml2-dev libicu-dev libpng-dev libreadline-dev
```

## Appendix

name    | description
---     | ---
--with-readline | 