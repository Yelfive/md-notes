# Network interface



## Restart

### `ifconfig`

```bash
sudo ifconfig enp0s3 down
sudo ifconfig enp0s3 up
```



### `ifdown/up`

```bash
sudo ifdown enp0s3
sudo ifup enp0s3
```



### `ip`

```bash
sudo ip link set dev enp0s3 down
sudo ip link set dev enp0s3 up
```

