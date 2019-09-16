# Start Applications at Boot Time

## 1. `crontab`

```bash
sudo crontab -e
```

```crontab
@reboot /path/to/executable
```

## 2. Services

```shell
sudo vim /etc/systemd/system/my.service
```

Edit the `service` file

```service
[Unit]
Description = API documentation service

[Service]
Type = simple
ExecStart = /usr/local/bin/docker-compose -f /srv/projects/ihappy/apidoc/docker-compose.yml start
ExecStart = /usr/local/bin/docker-compose -f /srv/projects/ihappy/apidoc/docker-compose.yml stop
RemainAfterExit = yes

[Install]
WantedBy = multi-user.target
```

Enable the `service`

```shell
sudo systemctl start my
```

If configuration is changed, **daemon MUST be reloaded**

```shell
sudo systemctl daemon-reload
```

### `xxx.service` file

#### `[Service]`

- `ExecStart` script and arguments to run at start-time
- `ExecStop` script and arguments to run at stop-time
- `WantedBy` After running `systemctl enable`, a **symlink** `/etc/systemd/system/multi-user.target.wants/foo.service` linking to the actual unit will be created. It tells `systemd` to pull in the unit when starting `multi-user.target`. The inverse `systemctl disable` will remove that **symlink** again.



## See Also

- [systemd.service](https://www.freedesktop.org/software/systemd/man/systemd.service.html)
- [systemd.unit](https://www.freedesktop.org/software/systemd/man/systemd.unit.html)