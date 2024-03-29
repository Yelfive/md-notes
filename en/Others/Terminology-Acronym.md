# Terminology Acronym

## Organizations

1. IEEE

    负责管理 MAC 地址。

2. ICANN: Internet Corporation of Assigned Names and Numbers

   负责管理域名、IP 地址。

3. ARQ: Automatic Repeat reQuest
4. SR: Selective Repeat
5. NIC: Network Interface Card
6. MAC: Medium Access Control
7. ISO: Internet Standard Organization

## Network Layer

1. CIDR: Classless Inter-Domain Routing, 无类别域间路由选择
2. MSL: Maximum Segment Lifetime, is the time a TCP segment can exist in the inter-network system. It is arbitrarily defined to be 2 minutes long.

   During the closing process, client will wait for 2-MSL to close the connection.

## Link layer protocol

1. PPP: Point to Point protocol
1. HDLC: High-level Data Link Control protocol
1. CDMA: Code Division Multiple Access, 码分多址。以太网帧广播协议。
1. CSMA: Carrier Sense Multiple Access, 载波监听多路访问。无线Lan（WiFi）协议，IEEE 的 802.11 标准。
1. CSMA/CA: CSMA with Collision Avoidance, “带冲突避免的” CSMA。
1. CSMA/CD: CSMA with Collision Detection, “带冲检测的” CSMA。

### Link Layer Error Detection and Correction in Network

1. FEC: Forward Error Correction
1. CRC: Cyclic Redundancy Check
1. EDC: Error Detection and Correction

---

1. BASE: Basic Availability, Soft-state, Eventual consistency

    - Basic Availability
        The database appears to work most of the time.
    - Soft-state
        Stores don’t have to be write-consistent, nor do different replicas have to be mutually consistent all the time.
    - Eventual consistency
        Stores exhibit consistency at some later point (e.g., lazily at read time).

1. POJO: Plain Old Java Object, initially denoted a Java object which does not follow any of the major Java object models, conventions, or frameworks.^[[POJO wikipedia](https://en.wikipedia.org/wiki/Plain_old_Java_object)]
