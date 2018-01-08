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

## Variables

### $expect_out

see [expect.$expect_out](#expect_out_1)

## set

### set timeout

Default timeout for expect is 10s, and this can be customized by

```bash
set timeout 20
```

## spawn

## expect

### $expect_out

Stores current standard output 

```bash
#!/usr/bin/env expect

send "All input: <$expect_out(buffer)> \n"
send "Matched:  <$expect_out(0,string)>\n"
```

### expect eof/EOF

Print until the end of connection

## send

## interact
