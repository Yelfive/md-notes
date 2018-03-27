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

## 1. Modify `/composer.json`

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

## Appendix

- [Developing composer packages locally](https://johannespichler.com/developing-composer-packages-locally/)
- [Repositories](https://getcomposer.org/doc/05-repositories.md)