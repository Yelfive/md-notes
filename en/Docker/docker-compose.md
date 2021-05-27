# Docker Compose Tips

## Specifying multiple docker-compose.yaml

```bash
docker-compose -f docker-compose.1.yaml docker-compose.2.yaml
```

By default, docker-compose reads

- `docker-compose.yaml`
- `docker-compose.override.yaml`

and the later overrides the former.

## Mount on Mac

```yaml
volumes:
  - host/path:container/path:delegated
```

All configurations are:

- `consistency` default
- `cached` Host is authoritative, changes made on host will be synced to container with delay.
- `delegated` **Best performance.** Container is authoritative, changes inside container will be synced to host with delay.

## Frequently used configure

### Chinese supporting in `docker logs`

```yaml
services:
  java:
    environment:
      LANG: en_US.UTF-8
      LANGUAGE: en_US:en
      LC_ALL: en_US.UTF-8
```
