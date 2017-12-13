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


## Issues

### 'pyOpenSSL' module missing

#### problem

```bash
> certbot

Traceback (most recent call last):
  File "/usr/bin/certbot", line 7, in <module>
    from certbot.main import main
  File "/usr/lib/python2.7/site-packages/certbot/main.py", line 21, in <module>
    from certbot import client
  File "/usr/lib/python2.7/site-packages/certbot/client.py", line 10, in <module>
    from acme import client as acme_client
  File "/usr/lib/python2.7/site-packages/acme/client.py", line 31, in <module>
    requests.packages.urllib3.contrib.pyopenssl.inject_into_urllib3()
  File "/usr/lib/python2.7/site-packages/requests/packages/urllib3/contrib/pyopenssl.py", line 112, in inject_into_urllib3
    _validate_dependencies_met()
  File "/usr/lib/python2.7/site-packages/requests/packages/urllib3/contrib/pyopenssl.py", line 147, in _validate_dependencies_met
    raise ImportError("'pyOpenSSL' module missing required functionality. ")
ImportError: 'pyOpenSSL' module missing required functionality. Try upgrading to v0.14 or newer.
```

#### solution

Check

```bash
pip list 2>/dev/null | grep requests

```

and

```bash
rpm -q python-requests --queryformat '%{VERSION}\n'
```

If they're different, try

```bash
pip install --upgrade --force-reinstall 'requests==2.6.0'
```

