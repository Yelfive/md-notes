# Docker Restart Policies

Docker provides a set of restart polices, which controls the behavior after a container stopped or exited.

You can control the restart policy by three means:
`docker run`,
`docker update`
or specify in `docker-compose.yml`

## `docker run`

Through this way, you're declaring the restart policy by creating a container.

```bash
docker run --restart unless-stopped -t container_name image_name
```

## `docker update`

When a container is already created, you can change the restart policy:

```bash
docker update --restart unless-stopped container_name
```

## `docker-compose.yml`

```yml
version: "3.8"
services:
  app:
    restart: unless-stopped
```

and run

```bash
docker-compose up -d
```

## Polices

### `no`
  
Do not automatically restart the container. (the **default**)

### `on-failure`

Restart the container if it exits due to an error, which manifests as a non-zero exit code.

### `always`

Always restart the container if it stops. If it is manually stopped,
it is restarted only when Docker daemon restarts or the container itself is manually restarted.
(See the second bullet listed in [restart policy details][restart-policy])

### `unless-stopped`

Similar to `always`, except that when the container is stopped (manually or otherwise),
it is not restarted even after Docker daemon restarts.

For clarity, if the container is stopped manually, after restarted docker daemon,
the container will not be started.
While with `always`, the container will always be started after the docker daemon is started,
even when the container is previously stopped manually.

## See More

- [Start containers automatically](https://docs.docker.com/config/containers/start-containers-automatically)

[restart-policy]: https://docs.docker.com/config/containers/start-containers-automatically/#restart-policy-details
