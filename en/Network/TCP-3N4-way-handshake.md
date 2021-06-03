# 3 and 4 way handshake in TCP

## 3-way Handshake

## 4-way Handshake

```mermaid
sequenceDiagram
    autonumber
    participant c as Client
    participant s as Server

    c ->> +s: FIN
    s ->> -c: ACK
    Note right of s: Server knows the client won't send any data<br> and refuse any subsequent data.

    Note over s, c: Server can still send data to client

    s ->> +c: FIN
    Note right of s: Server decides to close the connection
    c ->> -s: ACK
    Note right of s: Server closes the connection
    Note left of c: Client waits for the time out.
    c -->> c: time_wait: 2MSL
```

@@caption Fig. 2  4-way handshake to close the connection

:::tip Terminology
MSL: <acr>Maximum Segment Lifetime</acr>, see [here](../../en/Others/Terminology-Acronym.md#Network-Layer) for more information
:::

**Q: Why need 4-way handshake, not just 2?**

**Q: Why need the time_wait?**
