# Mount Shared Folders

```bash
sudo mount -t vboxsf -o uid=$UID,gid=$(id -g) ShareName NewFolder
```

```text
webroot /srv/webroot vboxsf umask=002,uid=1000,gid=1000 0 0
```