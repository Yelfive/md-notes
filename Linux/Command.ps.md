# Command `ps`

```bash
ps aux
```

- `-a` all

## -U

Display the processes belonging to the specified real user IDs.

## -x

When displaying processes matched by other options, include processes which do not have a controlling terminal.  This is the opposite of the `-X` option.  If both `-X` and `-x` are specified in the same command, then ps will use the one which was specified last.

```text
root@59c79b4bb81f:/var/www/html/ali/yaoyue# ps x
  PID TTY      STAT   TIME COMMAND
    1 ?        Ss     0:25 php-fpm: master process (/usr/local/etc/php-fpm.conf)
 1721 ?        S      0:02 php yii queue/start-beanstalk -d
 1841 ?        Ss     0:00 bash
 1937 ?        Ss+    0:00 bash
 1990 ?        R+     0:00 ps x
```

```text
-U      Display the processes belonging to the specified real user IDs.
-u      Display the processes belonging to the specified usernames.
```
