# Go Modules for v1.12.x

At the time of writing the document, GoLang released its version 1.12, and GoLang plans to release its 1.13, which enables modules by default.

So this document is written for 1.12

## Commands

### go get host/vendor/packet

1. Get latest version

  ```bash
  go get host/vendor/packet
  ```

2. Get specific version

  ```bash
  go get host/vendor/packet@v1.3.1
  ```

### go list

1. List all modules

  ```bash
  go list -m all
  ```

2. List available version

  ```bash
  go list -m -version host/vendor/packet
  ```

