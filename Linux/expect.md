# expect

## example

```bash
#!/usr/bin/env expect

spawn telnet localhost 11300
expect "Connected"
send "stats\n"
expect "hostname"
send "quit"
expect EOF
```

or 

```bash
expect <<EOF
spawn telnet localhost 11300
expect "Connected"
send "stats\n"
expect "hostname"
send "quit\n"
expect eof
EOF
```

## 

## expect eof/EOF

Print until the end of connection
