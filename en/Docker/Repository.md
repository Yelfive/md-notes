# Repository Mirror

- https://registry.docker-cn.com

  Sometimes get blocked

- https://docker.mirrors.ustc.edu.cn

  Works

- http://hub-mirror.c.163.com

  Some repository might not work

- Go to https://cr.console.aliyun.com/ to register a mirror link

  Untested

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

Configure the mirror

```json
{
  "registry-mirrors": ["https://registry.docker-cn.com"]
}
```

Restart to apply the change

```bash
systemctl restart docker
```



## 4. Available mirrors

```json
{
  "registry-mirrors" : [
    "http://ovfftd6p.mirror.aliyuncs.com",
    "http://registry.docker-cn.com",
    "http://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com"
  ],
  "insecure-registries" : [
    "registry.docker-cn.com",
    "docker.mirrors.ustc.edu.cn"
  ],
  "debug" : true,
  "experimental" : true
}
```

