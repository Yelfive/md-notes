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

```bash
sudo nfsd enable
sudo nfsd disable
sudo nfsd start
sudo nfsd stop
```

## Mac

/etc/exports

```text
/Users/felix/projects -alldirs -mapall=felix:staff (rw)
```

## Ubuntu

/etc/fstab

```text
192.168.2.12:/Users/felix/projects /srv/projects nfs auto,noatime,bg 0 0
```

- 192.168.2.12 is the server ip(MacPro ip)

```bash
sudo mount /srv/projects
```