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

```expect
set timeout 20
```

## spawn

## expect

1.
```expect
expect pattern {
    action
}
```

2. 
```expect
expect {
    pattern_1 action_1
    pattern_2 action_2
}
```

3.

```expect
expect pattern
action
```

wildcard(`*`) can be used

```expect
# this expects string starts with `a`
expect "a*\r"
```

### $expect_out

An array contains the results of the previous `expect`

```bash
#!/usr/bin/env expect

send "All expected input: <$expect_out(buffer)> \n"
send "Matched expect:  <$expect_out(0,string)>\n"
```

### expect eof/EOF

Print until the end of connection

## send

## interact
