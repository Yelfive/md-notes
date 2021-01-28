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

## Chinese support

```dockerfile
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8
```

- [解决docker容器中,日志中文乱码问题_yf.z的专栏-CSDN博客_docker 日志乱码](https://blog.csdn.net/zyf_balance/article/details/53172581)
