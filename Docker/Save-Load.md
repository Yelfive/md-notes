# Docker Save Image to and Load Image from archive

By saving a image to an archive, you can move the image around,`scp`/ `cp` `rsync` etc, and `load` the archive to make the archive an image again.

## Basic usage

### Save to an archive

```bash
docker save -o path/to/archive IMAGE [IMAGE]...
```

It's better use image name when saving, because when using image id, the image name will not be persist.

### Load from an archive

By loading, docker will create an image from that archive.

```bash
docker load -i path/to/archive
```
