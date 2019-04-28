# Go Modules for v1.12.x

At the time of writing the document, GoLang released its version 1.12, and GoLang plans to release its 1.13, which enables modules by default.

So this document is written for 1.12

## Versioning

```txt
v<major>.<minor>.<patch>
```

1. Package major version should be specified in path: `rsc.io/quote/v3`, starts from `v2`.
   This way, different versions of a package can be used in the same project.

## Commands

### go get host/vendor/package

1. Get latest version

  ```bash
  go get host/vendor/package
  ```

2. Get specific version

  ```bash
  go get host/vendor/package@v1.3.1
  ```

### Update dependencies

Dependencies will be updated automatically into `go.mod` when running the following command:

1. `go test`
2. `go build`

### List modules(`go list`)

1. List all modules current project depends on.

  ```bash
  go list -m all
  ```

2. List available version

  ```bash
  go list -m -version host/vendor/package
  ```

3. List modules with wildcard: `...`

  ```bash
  go list -m rsc.io/q...
  ```

### Clean dependency

```bash
go mod tidy
```