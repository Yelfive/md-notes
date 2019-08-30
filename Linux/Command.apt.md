# apt

## change `apt resources` using chinese

Source config file `/etc/apt/sources.list`.

The following command uses that of `TsingHua`

```bash
cat > /etc/apt/sources.list <<EOF
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ xenial-proposed main restricted universe multiverse
EOF
```

and run 

```bash
apt-get update
```

if you get error like 

```text
The following signatures couldn't be verified because the public key is not available: NO_PUBKEY xxxxxxxx
```

```bash
# apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 'xxxxxxxx'
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys '40976EAF437D05B5'
```

## See Also

- [修复The following signatures couldn't be verified because the public key is not available - 简书](https://www.jianshu.com/p/a026d08ce5a2)