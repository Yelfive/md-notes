# Gogs

## backup & restore

### backup

#### inside docker container

Set environment variable `USER=git`

```bash
USER=git ./gogs backup
```

### restore

#### creating tmp directory

If `/data` is mounted to docker container and `/tmp` not, when `gogs` restores using the `/tmp` and performs `mv /tmp/xxx /data/gogs/xxx` which are in different filesystem, the operation will fail with error `Failed to import 'custom': rename /tmp/gogs-backup/custom /data/gogs: invalid cross-device link`.

```bash
rm -rf tmp
mkdir -p tmp/gogs-backup/data/{attachments,avatars}
```

#### restore using created tmp

```bash
USER=git /app/gogs/gogs restore --from /path/to/gogs-backup-xxx.zip -t tmp
```

### See Also

- [Gogs dump in docker - Getting Help - Gogs Discussion](https://discuss.gogs.io/t/gogs-dump-in-docker/451)
- [How to backup, restore and migrate - Tips, Tricks, and How-To's - Gogs Discussion](https://discuss.gogs.io/t/how-to-backup-restore-and-migrate/991)
- [Cannot restore backup · Issue #4641 · gogs/gogs](https://github.com/gogs/gogs/issues/4641#issuecomment-318011581)