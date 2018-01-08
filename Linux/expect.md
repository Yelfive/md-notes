# expect

## example

```bash
#!/usr/bin/env expect

spawn telnet localhost 11300
expect "Connected"
send "stats\n"
expect "\n"
send "quit"
```

## 