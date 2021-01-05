# Linux iptables

## Signature

```bash
iptables [-t table] options [chain] [rule] [-j target]
```

Where

- `[rule]` can be either rule specification or rule number.
- `-j, --jump` indicates that if the packet matches this rule, then the next rule should be `target`, which can be either of `ACCEPT`, `DROP` and `RETURN`.

### General relations

table->chain->rule->target(when rule is true)

| table  | chain                  | rule | target                    |
| ------ | ---------------------- | ---- | ------------------------- |
| filter | FORWARD, INPUT, OUTPUT |      | ACCEPT, DROP, REJECT, LOG |

## iptables common used options

| Option | Description                                  |
| ------ | -------------------------------------------- |
| `-F`   | Flush all rules                              |
| `-P`   | Set a **default** policy(target) for a chain |
| `-A`   | Add a rule for a chain                       |
| `-D`   | Delete a rule                                |
| `-L`   | List chains and rules                        |

### iptables -A

> Add a rule for a chain

```bash
iptables -A chain-name -i interface -j target
```

| option      | description                                                      |
| ----------- | ---------------------------------------------------------------- |
| -p          | Protocol: TCP, UDP, ICMP(Internet Control Message Protocol), ALL |
| --icmp-type | ICMP type, number, combined with `-p icmp`                       |
| -s          | Source IP, to match the incoming IP address                      |
| --sport     | Source port, used with `-s` to specify port of source IP         |
| -d          | Destination IP                                                   |
| --dport     | Destination Port: Port of destination IP                         |

#### ICMP Types

| Code | Description |
| ---- | ----------- |
| 8    | Ping        |

```bash
#example

# Drop all pings
iptables -A INPUT -i eth1 -p icmp --icmp-type 8 -j ACCEPT

```

### iptables -D

> Drop a rule

```bash
# rule-specification should exactly the same with `iptables -A chain`
iptables -D chain rule-specification

# rule-number can be get by calling `iptables -L --line-numbers`
iptables -D chain rule-number
```

### iptables -L

> List chains and rules

```bash
# display rules with line numbers
iptables -L --line-numbers
```

```text
            (Network)
                |
        +---------------+
        |Raw            |
        |PREROUTING     |
        +---------------+
                |
        +---------------+
        |mangle         |
        |PREROUTING     |
        +---------------+
                |
        +---------------+
        |nat            |
        |PREROUTING     |
        +---------------+
                |
        <Routing Decision>
                |
                + -------------------- forward ---------------------+
                |                                                   |
              local                                                 |
                |                                                   |
        +---------------+                                   +---------------+
        |mangle         |                                   | mangle        |
        |INPUT          |                                   | FORWARD       |
        +---------------+                                   +---------------+
                |                                                   |
        +---------------+                                   +---------------+
        |filter         |                                   | filter        |
        |INPUT          |                                   | FORWARD       |
        +---------------+                                   +---------------+
                |                                                   |
            local process                                           |
                |                                  + -------------- +
        <Routing Decision>                         |
                |                                  |
        +---------------+                          |
        |    raw        |                          |
        |    OUTPUT     |                          |
        +---------------+                          |
                |                                  |
        +---------------+                          |
        |    mangle     |                          |
        |    OUTPUT     |                          |
        +---------------+                          |
                |                                  |
        +---------------+                          |
        |   nat         |                          |
        |   OUTPUT      |                          |
        +---------------+                          |
                |                                  |
        +---------------+                          |
        |   filter      |                          |
        |   OUTPUT      |----<Routing Decision>----+
        +---------------+           |
                                    |
                            +---------------+
                            | mangle        |
                            | POSTROUTING   |
                            +---------------+
                                    |
                            +---------------+
                            |   nat         |
                            | POSTROUTING   |
                            +---------------+
                                    |
                                (Network)

```

## Tables

- nat

    > `Network Address Translation`. It should only be used to translate the packet's source field or destination field. Note that, only the first packet in a stream will hit this table. After this, the rest of the packets will automatically have the same action taken on them as the first packet.

- raw

    > The raw table is mainly only used for one thing, and that is to set a mark on packets that they should not be handled by the connection tracking system. This is done by using the `NOTRACK` target on the packet. If a connection is hit with the `NOTRACK` target, then conntrack will simply not track the connection.

- filter

    > The filter table is mainly used for filtering packets. We can match packets and filter them in whatever way we want. This is the place that we actually take action against packets and look at what they contain and DROP or /ACCEPT them, depending on their content. Of course we may also do prior filtering; however, this particular table is the place for which filtering was designed. Almost all targets are usable in this table. We will be more prolific about the filter table here; however you now know that this table is the right place to do your main filtering.

## See Also

- [25 Examples for iptables](./iptables-examples.md)
