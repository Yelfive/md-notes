# Date

## date -s

```bash
# bash -s 'unix time'
bash -s "2017-01-01"
```

## Synchronize with network

```bash
ntpdate time.nist.gov
```

Some date server:

- time.nist.gov
- time.nuri.net
- 0.asia.pool.ntp.org
- 1.asia.pool.ntp.org
- 2.asia.pool.ntp.org
- 3.asia.pool.ntp.org

## hwclock

```bash
# write time to hardware clock
hwclock -w
```
