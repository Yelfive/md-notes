# Docker Compose Tips

## Specifying multiple docker-compose.yaml

```bash
docker-compose -f docker-compose.1.yaml docker-compose.2.yaml
```

By default, docker-compose reads

- `docker-compose.yaml`
- `docker-compose.override.yaml`
