# Mount Shared Folders

```bash
sudo mount -t vboxsf -o uid=$UID,gid=$(id -g) ShareName NewFolder
```

```fstab
webroot /srv/webroot vboxsf umask=002,uid=1000,gid=1000 0 0
```

- shared folder name
- mount point
- filesystem
- options

## Mac

/etc/exports

```text
/Users/felix/projects -alldirs -mapall=felix:staff (rw)
```

### nfs server

```bash
sudo nfsd enable
sudo nfsd disable
sudo nfsd start
sudo nfsd stop
```

## Ubuntu

/etc/fstab

```text
192.168.2.12:/Users/felix/projects /srv/projects nfs auto,noatime,bg 0 0
```

- `192.168.2.12` is the server ip(MacPro ip)
- `/srv/projects` is the mount point

```bash
sudo mount /srv/projects
```

You can access /srv/projects now

## When Ubuntu hosted on Win10

It will need extra work when hosted on Win10 to use bridged network for VirtualBox

1. Choose `Settings->Newwork->Host-Only Network`
2. Open Win10 network adapter setting, select "host-only" and local adapter, right click, choose `Birgde Connections`
3. Setting on virtual machine
  ```bash
  sudo vim /etc/network/interfaces
  ```
  
  ```text
  auto enp0s8
  iface enp0s8 inet static
  address 192.168.10.100
  netmask 255.255.255.0
  gateway 192.168.10.1
  ```
  
  ```bash
  ifup enp0s8 # install ifupdown if ifup not found
  ```
4. Choose `Birdged Network` in VirtualBox Settings
5. Done!
