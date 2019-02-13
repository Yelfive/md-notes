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