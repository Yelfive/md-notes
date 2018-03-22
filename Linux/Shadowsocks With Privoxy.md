# ShadowSocks With Privoxy

## ShadowSocks


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


```bash
# Set http(s) proxy to point to Privoxy
export http_proxy="127.0.0.1:8118"
export https_proxy="127.0.0.1:8118"
```

