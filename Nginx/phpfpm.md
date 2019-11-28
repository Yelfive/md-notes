# Connecting to PHP-FPM

```conf
server {
    listen      80 default_server;
    server_name localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/log/host.access.log  main;

    root   /var/www/html/public;
    index  index.html index.htm index.php;

    try_files $uri $uri/ /index.php?$query_string;

    # error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    # error_page   500 502 503 504  /50x.html;
    # location = /50x.html {
    #    root   /usr/share/nginx/html;
    # }

    location ~ \.php$ {
        fastcgi_pass   phpfpm:9000;
        fastcgi_index  index.php;
        fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
        fastcgi_param PATH_INFO       $fastcgi_path_info;
        fastcgi_param PATH_TRANSLATED $document_root$fastcgi_path_info;

        include        fastcgi_params;
    }
}
```