# How to Require from Local Path

Composer allows you to load from local filesystem for packages. This is achieved through `composer.json` under root of your project.

## Prerequisites

1. `git`

   For local path, Composer will use `git` to check the version of the package. Without `git`, Composer will simply ignore this path, and download the package from other repositories specified in `composer.json`.

## Your package

Assuming that we have a package at `~/projects/packages/my-local-package`

```text
my-local-package/
|
`-- composer.json
|
`-- src/
    |
    ` <source files>
```

And the `composer.json` looks like

```json
{
    "name": "my/local-package",
    "autoload": {
        "psr-4": {
            "fk\\exceptions\\": "./src"
        }
    }
}
```

> **Note that**, the above describes a package, not a project.

## Your project

`composer.json` under the project root,

```json
{
  "requires": {
    "my/local-package": "dev-dev"
  },
  "repositories": [
    { "packagist.org": false },
    {
      "type": "path",
      "url": "~/projects/packages/my-local-package"
    },
    {
      "type": "composer",
      "url": "https://mirror.packagist.com"
    }
  ]
}
```

### Some explanations

- **Order is significant here**. When looking for a package, Composer will look from the first to the last repository, and pick the first match. By default Packagist is added last which means that custom repositories can override packages from it.[^1]

- `"type": "path"` indicates the `url` is local path.

- `url` is the local path, either absolute or relative is ok.

- The composer use `symlink` as default option in order not to copy the files under the package, so that the changes under package developing workspace can take effects immediately after modification, this can be overwritten, which copies the package to `vendor/`, by setting `symlink: false`:

  ```json
  {
      "type": "path",
      "url": "~/projects/packages/my-local-package",
      "options": {
          "symlink": false
      }
  }
  ```

- `{ "packagist.org": false}` to disable default official Composer repository, otherwise, such official repository will be appended to the `repositories` specified in `composer.json`

- `url` of `"type": "path"`, can include wildcards like `*` or `?` , For details, see the [PHP glob function](http://php.net/glob). For example, configuration

  ```json
  {
    "repositories": [
      {
        "type": "path",
        "url": "~/projects/packages/*"
      }
    ]
  }
  ```

  will look for packages under directory `~/projects/packages`, including the `my/local-package` in former example.

## Versioning

When you are using local; packages, you are actually working on a branch such as `master`, or `dev` as I prefer. After making some changes, you install it to your project with

```bash
composer require my/local-package dev-dev
```

That might be where the problem comes up. Say another repository you installed `my/another-package` requires `my/local-package` with version `1.0`, and your current package is at branch `dev`. These two versions conflicts, you cannot install `dev-dev` anymore, because `my/another-package` requires `1.0` and have it already installed.

There are typically two solutions,

1. Remove `1.0` and reinstall using version `dev-dev`
2. Configure your `extra.branch-alias` in  `my/local-package/composer.json`

And I'm gonna go through the second solution with an example.

### branch-alias

```json
{
  "name": "my/local-package",
  "extra": {
    "branch-alias": {
      "dev-dev": "1.x-dev"
    }
  }
}
```

`branch-alias` aliases branch `dev` (`dev-xxx` for branch `xxx`) as version `1.x`.

The syntax of `branch-alias` is

```json
{
  "extra": {
    "brach-alias": {
      "dev-<branch name>": "<version number>-dev"
    }
  }
}
```

- `<branch name>` is the actual branch name, the working branch.
- `<version number>` is the version you want Composer takes this branch for. If you set it to be `1.x`, then any packages requires `1.x` will think this `<branch name>` is the `1.x` branch.
- `dev-` and `-dev` are static parts for source and dest respectively.

So this way you can the conflicting problem previously mentioned.

## Full Example

### package/composer.json

```json
{
  "name": "fk/laravel-utility",
  "description": "Making laravel more practical",
  "require": {
    "laravel/framework": ">=5",
    "my/http-status": "*"
  },
  "autoload": {
    "psr-4": {
      "fk\\utility\\": ""
    }
  },
  "extra": {
    "branch-alias": {
        "dev-dev": "2.x-dev"
    }
  }
}
```

### project/composer.json

```json
{
    "name": "laravel/laravel",
    "type": "project",
    "description": "The Laravel Framework.",
    "keywords": [
        "framework",
        "laravel"
    ],
    "license": "MIT",
    "require": {
        "php": "^7.2",
        "ext-json": "*",
        "fk/helpers": "dev-dev",
        "fk/http-status": "dev-dev",
        "fk/laravel-references": "dev-dev",
        "fk/laravel-utility": "dev-dev",
    },
    "repositories": [
        {
            "packagist.org": false
        },
        {
            "type": "path",
            "url": "~/projects/packages/*"
        },
        {
            "type": "composer",
            "url": "https://packagist.custom.com"
        }
    ]
}
```

Install Git on Alpine

```bash
apk add git
```

Install package

```bash
composer require fk/laravel-utility dev-dev
```

## Appendix

- [Developing composer packages locally](https://johannespichler.com/developing-composer-packages-locally/)
- [Composer Repositories](https://getcomposer.org/doc/05-repositories.md)

## References

[^1]: [Composer JSONSchema](https://getcomposer.org/doc/04-schema.md#repositories)
