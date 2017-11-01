# scripts(root-only)

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

## References

- https://getcomposer.org/doc/articles/scripts.md