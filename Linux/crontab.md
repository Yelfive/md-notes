crontab
===

> Execute a script with interval, crontab checks task every one minute 

```bash
crontab -e
```

```
# inside crontab
*   *   *   *   * command
分  时  日  月   周 command
```

## Execution log

- **Linux**

    `\var\log\cron`