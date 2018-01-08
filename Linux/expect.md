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

## Keywords

- `set` Set variables
- `spawn` Start a script or program
- `expect` Waiting for program output until timeout
- `send` Sending a reply to the spawned script or program
- `interact` Allowing to interact with the script or program

## set

## spawn

## expect

### $expect_out

### expect eof/EOF

Print until the end of connection

## send

## interact
