# Start On Boot

## CentOS

```bash
systemctl enable nginx
```

Running the command will generate a file at `/lib/systemd/system/nginx.service
` which should read like this

```conf
[Unit]
Description=The nginx HTTP and reverse proxy server
After=network.target remote-fs.target nss-lookup.target

[Service]
Type=forking
PIDFile=/run/nginx.pid
# Nginx will fail to start if /run/nginx.pid already exists but has the wrong
# SELinux context. This might happen when running `nginx -t` from the cmdline.
# https://bugzilla.redhat.com/show_bug.cgi?id=1268621
ExecStartPre=/usr/bin/rm -f /run/nginx.pid
ExecStartPre=/usr/sbin/nginx -t
ExecStart=/usr/sbin/nginx
ExecReload=/bin/kill -s HUP $MAINPID
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

### Service fields

- Type
    
    Working type, fork means as daemon

- ExecStartPre

    Command before starting service

- ExecStart

    Command to start the service

- ExecReload

    Command to reload the service

- ExecStop

    Command to stop the service

- KillSignal

    Signal to kill the service, SIGQUIT(3)

- PrivateTmp

    `true` to indicates allocating private temporary space for the service


