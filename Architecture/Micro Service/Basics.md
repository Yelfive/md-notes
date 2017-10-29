# Basics

## API Gateway

A single entry point into a system, encapsulates services to serve the clients.

>  authentication, access control, load balancing requests, caching responses, and provides application- aware health checks and monitoring

- Node.js
- Nginx plus

### Handling Partial Failures

- [Netfix Hystrix](https://github.com/Netflix/Hystrix) for JVM environment

    Which kills calls exceeded specific threshold

- [phystrix](https://github.com/upwork/phystrix) of PHP

    A PHP Circuit Breaker library for fault tolerance

### Service Invocation

1. Asynchronous messaging-based mechanism
2. Synchronous HTTP or Thrift

### Service Discovery

### Service Registry

1. Self-Registry
2. Registrar



