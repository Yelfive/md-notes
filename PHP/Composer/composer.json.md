# composer.json

## config

### config.preferred-install

```json
{
    "config": {
        "preferred-install": {
            "fk/*": "source",
            "*": "dist"
        }
    }    
}
```

Can be both string or map to indicates whether `source` or `dist` is preferred

**string**

Applies to all packages

```json
{
    "preferred-install": "dist"
}
```

**map**

Applies more respectively to packages

Asterisk(`*`) to indicate all packages

> Order matters: the installer performs when the first pattern satisfied

```json
{
    "preferred-install": {
        "fk/*": "source",
        "*": "dist"
    }
}
```

_It reads_

- `fk/*` All packages under vendor `fk` to be installed as `source`
- `*` All other packages to be installed as `dist`

### repositories

Setting repositories to overwrite default

```json
{
    "repositories": {
        "packagist": {
            "type": "composer",
            "url": "https://packagist.phpcomposer.com"
        }   
    }   
}
```
