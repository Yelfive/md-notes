# Docker logs

```shell
docker logs -f <container_name> --since 10m
```

## Where is log

```shell
docker inspect --format "{{.LogPath}}" <container_name>
```

## Clear the log

```shell
truncate -s 0 `docker inspect --format "{{.LogPath}}" <container_name>`
```