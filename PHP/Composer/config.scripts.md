# scripts(root-only)

```json
{
    "scripts": {
        "name": ["list or string of php "] 
    }
}
```

## @

- `@scriptName` Calls another composer script

    ```json
    {
        "scripts": {
            "test": [
                "@clearCache",
                "phpunit"
            ],
            "clearCache": "rm -rf cache/*"
        }
    }
    ```

- `@composer` Calls a composer command

    ```json
    {
        "scripts": {
            "test": [ "@composer install", "phpunit"]
        }
    }
    ```

- `@php` Executes a PHP script

    > It seems to be acting the same as just `php`

    ```json
    {
        "scripts": {
            "test": ["php scripts.php", "@php scripts.php"]
        }
    }
    ```

## References

- https://getcomposer.org/doc/articles/scripts.md