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
