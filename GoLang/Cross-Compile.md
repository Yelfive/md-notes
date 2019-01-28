# Cross Compile

## Environment

OS      | ARCH              | OS version
--      | ---               | --
linux   | 386 / amd64 / arm | >= Linux2.6
darwin  | 386 / amd64       | OS X (Snow Leopard + Lion)
freebsd | 386 / amd64       | >= FreeBSD 7
windows | 386 / amd64       | >= Windows 2000

```bash
GOOS=linux GOARCH=amd64 go build hello.go
```
