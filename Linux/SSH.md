# SSH

## Run a command remotely and then use a pseudo TTY

```bash
ssh -tp port username@ip 'cd /path/to/directory'
```

## Configure

reside in file `~/.ssh/config`

```conf
Host github.com
    User git
    Hostname github.com
    Port 22
```

## Configure multiple ssh keys for the same