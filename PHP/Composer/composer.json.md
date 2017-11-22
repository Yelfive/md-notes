# composer.json

## config

### config.prefered-install

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

```json
{
    "preferred-install": {
        "fk/*": "source",
        "*": "dist"
    }
}
```

- `fk/*` All packages under vendor `fk` to be installed as `source`
- `*` All other packages to be installed as `dist`

