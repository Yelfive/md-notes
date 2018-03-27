# Require Local Path

## 1. Create your package with `composer.json` in

```text
+ fk/exceptions/
|
+-- composer.json
|
+-- src/
```

```json
{
    "name": "fk/exceptions",
    "autoload": {
        "psr-4": {
            "fk\\exceptions\\": "./src"
        }
    }
}
```

## 2. Modify `/composer.json`

```json
{
    "repositories": {
        "fk/exceptions": {
            "type": "path",
            "url": "path/to/fk-exceptions"
        }
    }
}
```

- The `type: path` defines the the package name same as the key `fk/exceptions` should be loaded from locally.
- The `url` is the local path, either absolute or relative is ok.
- The composer use `symlinks` as default option to not copy the files under the package, and can be overwritten (which copies the package to `vendor/`)
    ```json
    {
        "type": "path",
        "url": "path/to/package"
        "options" {
            "symlink": false
        }
    }
    ```

## Note

1. The key of the `repositories` should be the package name

## Appendix

- [Developing composer packages locally](https://johannespichler.com/developing-composer-packages-locally/)
- [Repositories](https://getcomposer.org/doc/05-repositories.md)