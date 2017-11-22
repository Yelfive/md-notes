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