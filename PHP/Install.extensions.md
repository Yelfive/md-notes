# Install

#### Download

> wget http://cn2.php.net/get/php-7.1.6.tar.bz2/from/this/mirror -O php-7.1.6

#### Un-archive

> tar -jxf php-7.1.6
> cd php-7.1.6

#### Configure

**help**

> ./configure --help

**dependencies**

－ CentOS

> yum install -y openssl-devel libxml2-devel libcurl-devel libicu-devel gcc-c++

##### configure

- Linux

    > ./configure --prefix=/usr/local/lib/php --with-curl --enable-intl --enable-mbstring --with-mysqli --enable-pcntl --with-pdo-mysql --with-openssl --with-pear

- Mac

    _specifying libxml2 directory_

    > ./configure --with-libxml-dir=/usr/local/Cellar/libxml2/2.9.4_3/ 

##### make && make install

> make && make install

-----

# Build From Git

> @see [Build PHP from git](http://php.net/git.php)

- Clone from git
- Checkout a branch
- Run `./buildconf`
- Install as a unzipped source package




