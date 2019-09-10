# Docker Troubleshooting

## driver "overlay" failed to remove root filesystem, ... device or resource busy

The filesystem for the container is still mounted, so the container cannot be removed.

Involved commands: `up`, `rm`

### Solution

When running `docker rm container_name`, you get the error:

```text
ERROR: driver "overlay" failed to remove root filesystem for 738f492a57f80951b279c3bd82f59b6230275a298ab74d7f26c4564cf3d1cf2c: remove /var/lib/docker/overlay/6031651302dba6053c5fde07937f4fd00dfc063577fa343b12c83f1c26b77887/merged: device or resource busy
```

```bash
grep docker /proc/*/mountinfo|grep 6031651302dba6053c5fde07937f4fd00dfc063577fa343b12c83f1c26b77887
```

and it will result

```text

```
