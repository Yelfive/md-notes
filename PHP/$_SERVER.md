# $_SERVER

- `SERVER_NAME` The first configured server name of in http server such as Nginx conf.

    ```nginx
    server {
        server_name localhost example.com;
    }
    ```

    And you will always get localhost.

- `HTTP_HOST` The requested host. 
    I.e. the URI host in browser url input box.
    _when you type `http://www.baidu.com` it's `www.baidu.com`_

## See Also

- [PHP $_SERVER](http://php.net/manual/zh/reserved.variables.server.php)