# File System

```bash
mount [-trw] disk directory
```

## On System Start Up

```text
# > cat /etc/fstab
# /etc/fstab
# <file system> <mount point>   <type>  <options>   <dump>  <pass>
```

## Install a disk

### 1. fdisk

> Creates disk partitions

- sd`x`, the first partition would be a, second b and so on

### 2. mkfs

> Creates file system in the partition

### 3. fsck

> File System ChecK, checks the file system if there's error

### 4. mount

> Mounts the partition to a directory

```bash
mount /dev/sdb1 /data
```

## Install a swap partition

### 1. fdisk

### 2. mkswap

> Initialize a partition to be swap

```bash
mkswap /dev/sdb2
```

### 3. swapon

> Check and activate swap partition

```bash
swapon /dev/sdb2
```

## RAID & LVM

### RAID

Binds multiple hard disks together to present as a single hard disk to user or LVM. Managed with `mdadm`, which should be installed first.

### LVM

Takes multiple independent hard disks as a "volume group", volume group can be divided into several logic volumes. This can be useful when one partition is not large enough, and wanna add some space.

## File Types

> `ls -l` to list the files in specified directory, with its file type 

1. `-` binary file
2. `d` directory
3. `c` Character device, ordered device, saving in order, like a tape
4. `b` Block device, like hard disk
5. `s` 本地域套接口
6. `p` 有名管道
7. `l` symbol link




