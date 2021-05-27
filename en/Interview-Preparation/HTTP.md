# Interview Preparation for HTTP

## Keep-Alive

According to [RFC 2616](http://tools.ietf.org/html/rfc2616):

> 1. By opening and closing fewer TCP connections, CPU time is saved in routers and hosts (clients, servers, proxies, gateways, tunnels, or caches), and memory used for TCP protocol control blocks can be saved in hosts.
> 2. HTTP requests and responses can be pipelined on a connection. Pipelining allows a client to make multiple requests without waiting for each response, allowing a single TCP connection to be used much more efficiently, with much lower elapsed time.
> 3. Network congestion is reduced by reducing the number of packets caused by TCP opens, and by allowing TCP sufficient time to determine the congestion state of the network.
Latency on subsequent requests is reduced since there is no time spent in TCP's connection opening handshake.
> 4. HTTP can evolve more gracefully, since errors can be reported without the penalty of closing the TCP connection. Clients using     future versions of HTTP might optimistically try a new feature, but if communicating with an older server, retry with old   semantics after an error is reported.
