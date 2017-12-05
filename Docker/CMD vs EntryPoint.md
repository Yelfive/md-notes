# CMD vs Entrypoint

> The main purpose of a CMD is to provide defaults for an executing container. 
> 
> When used in the shell or exec formats, the CMD instruction sets the command to be executed when running the image.

## So

`entrypoint` is the command to executed when running

- `docker run <image>`
- `docker exec <container name>`

When there's no `entrypoint`, the executable `CMD` will takes its role.

When there is `entrypoint`, `CMD` is the default value for it.

On the command line, anything after `exec <image>` will overwrite the `CMD`, takes its place as arguments of `entrypoint` 

## For example

When running

```bash
docker exec -it phpfpm bash
```

it actually run in docker container, despite the `CMD`

```bash
phpfpm-entrypoint bash
```

## Finally

Both `CMD` and `entrypoint` can have only one active value, the later precedes.
