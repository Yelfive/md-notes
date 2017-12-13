# LetsEncrypt

HTTPS with certbot on nginx

nginx

    # ssl
    ssl on;
    ssl_certificate /etc/letsencrypt/live/api-test.alijian.net/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api-test.alijian.net/privkey.pem;
    ssl_ciphers "EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH";
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;

letsencrypt.org

certbot.eff.org

## Step 1.

```bash
certbot certonly --webroot -w /path/to/webroot -d domain.com -w /path/to/another -d domain2.com

# generate some verify documents under directory specified by -w
# check if you owns the domain
# success
# certs will be placed at /etc/letsencrypt/live/, which is actually a link to certs and keys
# each `certbot certonly blah blah` will generate one cert and one key
```

## Step 2.

import cert and key on server config file
like above

## Step 3.

restart the server
nginx restart

> NOTE: restart nginx needed when renewed certs

