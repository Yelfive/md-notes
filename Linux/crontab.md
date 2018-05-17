# crontab

> Execute a script with interval, crontab checks task every one minute.

```bash
crontab -e
```

```text
# inside crontab
*   *   *   *   * command
分  时  日  月   周 command
```

- `minute` 0~59
- `hour` 0~23
- `day` 1~31
- `month` 1~12
- `week` 0~6, sunday~saturday

## Execution log

- **Linux**

    `/var/log/cron`