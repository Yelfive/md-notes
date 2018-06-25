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
- `week` 0~6, sunday~saturday
- `command` The command column should always be absolute path of command, not shortened.

    ```bash
    # instead of just `ls -l`
    /usr/bin/ls -l
    ```

## Execution log

### Linux

    `/var/log/cron`

## Examples

### restart lighthttpd every hour during 23:00 to 07:00 of the next day

```bash
0 23-7/1 * * * /usr/local/etc/rc.d/lighttpd restart
```

## See Also

- [CSDN crontab 定时写法整理](https://blog.csdn.net/bsf5521/article/details/76522222)