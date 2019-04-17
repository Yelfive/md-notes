# SSH

## Run a command remotely and then use a pseudo TTY

```bash
ssh -tp port username@ip 'cd /path/to/directory'
```

## Configure

reside in file `~/.ssh/config`

```conf
Host github.com
    Hostname github.com
    User git
    Port 22
```

## Configure multiple ssh keys