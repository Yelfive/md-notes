# $_SERVER

- `SERVER_NAME` The configured server name of in http server such as Nginx conf.

    ```nginx
    server {
        server_name localhost;
    }
    ```

- `HTTP_HOST` The requested host.
    I.e. the URI host in browser url input box.
    _when you type `http://www.baidu.com` it's `www.baidu.com`_