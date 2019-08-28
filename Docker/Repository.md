# Repository Mirror

## 1. At daemon start time

```bash
docker --registry-mirror=https://registry.docker-cn.com daemon
```

## 2. At pull time

```bash
docker pull docker.mirrors.ustc.edu.cn/library/repo:tag
```

## 3. With configuration file

```bash
vim /etc/docker/daemon.json
```

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

And restart to apply the change

```bash
systemctl restart docker
```
