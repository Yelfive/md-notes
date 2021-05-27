Internet Architecture
===

```
Application layer

Presentation layer

Session layer

Transport layer

Network layer

Data Link layer

Physical layer
------------------------------------------------------------------------
Application layer

Transport layer

Internet layer

Network Access layer
```


# IP: Internet Protocol

## IP Headers

<table style="text-align: center;">
    <thead>
        <tr>
            <th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th>
            <th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th>
            <th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th>
            <th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="4">Version</td>
            <td colspan="4">IHL</td>
            <td colspan="8">TOS/DSCP/ECN</td>
            <td colspan="16">Total Length</td>
        </tr>
        <tr>
            <td colspan="16">Identification</td>
            <td colspan="3">Flags</td>
            <td colspan="13">Fragment Offset</td>
        </tr>
        <tr>
            <td colspan="8">Time To Live</td>
            <td colspan="8">Protocol</td>
            <td colspan="16">Header Checksum</td>
        </tr>
        <tr><td colspan="32">Source Address</td></tr>
        <tr><td colspan="32">Destination Address</td></tr>
        <tr>
            <td colspan="25">Options</td>
            <td colspan="7">Padding</td>
        </tr>
    </tbody>
</table>

- Version

    > Offset 0-3, 4 bits in total.
    > IP Version in binary.

    - IPv4: 0100
    - IPv6: 0110

- IHL

    > Offset 4-7, 4 bits in total.
    > Internet Header Length, to tell the whole length of the `IP headers` in 32 bit. Say minimum `5` means `5 * 32` bits. Maximum of `2^4 - 1 = 15` 32-bits. This field may indicates the length of `Option` field.

- TOS/DSCP/ECN

    > Offset 8-15, 8 bits in total.
    > Notify the end nodes about a route's congestion
    > 
    > - First 6 bits is used for `ECN`
    > - Last 2 bits for `ECT` and `CE`

    **terms in history**

    - `TOS` Type Of Service
    - `DSCP` Differentiated Services Codee Point
    - `ECN` Explicit Congestion Notification
        + `ECT` ECN Capability Transport
        + `CE` Congestion Experienced

- Total Length

    > Offset 16-31, 16 bits in total.
    > Total size of a packet, including headers and everything.
    > In octets/bytes, maximum of `65535(2^16 - 1)` bytes for a single packet

- Identification
    
    > Offset 32-47, 16 bits in total.
    > For large packets of data, the packet will be separated into fragments, every fragments has the same `Identification`. Combined with `Fragment Offset` to help to reassembly of fragmented packets.

- Flags

    > Offset 48-50, 3 bits in total.
    > For Every Bit:
    > 
    > - First bit: reserved, not used, fixed `0`
    > - Second bit: whether the packet is intact, 1=intact, not fragmented; 0=no,got fragmented 
    > - Third bit: whether more packets fallows, 1=yes; 0=no

- Fragment Offset
    
    > Offset 51-63, 13 bits in total.
    > Indicates where this packet belongs to, against all the packets

- TTL - Time To Live

    > Offset 64-71, 8 bits in total.
    > How long the packets should live across the Internet. Every process touches the packet should remove part of the time, so that when it reaches zero, it will be destroyed and a `ICMP Time Exceeded` message should be sent to the sender.

- Protocol

    > Offset 72-79, 8 bits in total.
    > Indicates the protocol of next layer, say `TCP`, `UDP` or `ICMP` etc.

- Header Checksum

    > Offset 80-95, 16 bits in total.
    > Checksum of the header, recomputed by every host that changes the header(s), hosts change TTL header at least.

- Source Address

    > Offset 96-127, 32 bits in total.
    > IP address of 4 octets in binary, tells where the packet come from, corresponding to dot separated numbers like 127.0.0.1 for example

- Destination Address

    > Offset 128-159, 32 bits in total.
    > IP address of where to send the packet to.

- Options

    > Offset 160-479, this field is with optional length, may not exits at all.
    > Mainly used for test usage. It starts with a brief 8 bit field that lets us know which options are used in the packet.

- Padding

    > Offset and size varies. Used to pad the header into size of multiple of 32 bits

# TCP

## TCP headers

# Appendix

### TCP options







