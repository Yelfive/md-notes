# ShadowSocks With Privoxy

## ShadowSocks

[GitHub](https://github.com/shadowsocks)

### Ubuntu

#### AppImage

Use [AppImage](https://github.com/shadowsocks/shadowsocks-qt5/wiki/Installation#appimage) directly

#### Optional

```bash
# install qt5
sudo add-apt-repository ppa:hzwuang/ss-qt5
sudo apt-get update
sudo apt-get install -y shadowsocks-qt5

# start qt5
sudo ss-qt5
```

## Privoxy

Redirect traffic to another `address:port`, even to a different protocol(such as socks5 of Shadowsocks)

```confg
# /etc/privoxy/config

# The address/interface and port should listen to
# traffic going through here will be forwarded
# via `forward-xyz`
listen-address 127.0.0.1:8118

## redirect all traffic(`/`) to `127.0.0.1:1080`, which is a socks5 proxy
forward-socks5 / 127.0.0.1:1080 .
```

## Terminal

```bash
# Set http(s) proxy to point to Privoxy
export http_proxy="127.0.0.1:8118"
export https_proxy="127.0.0.1:8118"
```

# Appendix

- [Linux中使用ShadowSocks+Privoxy代理](https://docs.lvrui.io/2016/12/12/Linux%E4%B8%AD%E4%BD%BF%E7%94%A8ShadowSocks-Privoxy%E4%BB%A3%E7%90%86/)
- [Ubuntu 14.04下shadowsocks-qt5的安装](https://my.oschina.net/HeAlvin/blog/487954)
