# crontab

> Execute a script with interval, crontab checks task every one minute.

## Edit crontab jobs

```bash
crontab -e
```

After running the command, you will get the following format

```text
# inside crontab
*   *   *   *   * command
分  时  日  月   周 command
```

Individually it means

- `minute` 0~59
- `hour` 0~23
- `day` 1~31
- `month` 1~12
- `week` 0~6, sunday to saturday
- `command` The command column should always be absolute path of command, not shortened.

    ```bash
    # instead of just `ls -l`
    /usr/bin/ls -l
    ```

## Execution log

### Linux

```bash
# CentOS
less +G /var/log/cron

# Ubuntu
less +G /var/log/syslog
## This is not enabled by default on Ubuntu
less +G /var/log/cron
```

By default, Ubuntu does not log `/var/log/cron`, for this to be logged,

1. Uncomment `#cron.*` in `/etc/rsyslog.d/50-default.conf`
2. Restart syslog `sudo systemctl restart rsyslog`

## Examples

### restart lighthttpd every hour during 23:00 to 07:00 of the next day

```bash
0 23-7/1 * * * /usr/local/etc/rc.d/lighttpd restart
```

## Sending mail if something goes wrong

`sendmail` program should be installed.

```bash
sudo apt-get install sendmail
```

And then the mail can be sent and read by command `mail`

```bash
mail
```

## Execute command on startup

```bash
sudo crontab -e
```

```crontab
@reboot /path/to/executable
```

## See Also

- [CSDN crontab 定时写法整理](https://blog.csdn.net/bsf5521/article/details/76522222)
