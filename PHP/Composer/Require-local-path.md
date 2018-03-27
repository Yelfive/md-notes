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
        
    }
}
```

## Appendix

- [Developing composer packages locally](https://johannespichler.com/developing-composer-packages-locally/)
- [Repositories](https://getcomposer.org/doc/05-repositories.md)