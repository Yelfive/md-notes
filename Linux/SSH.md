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

### 1. Create a new pair of rsa keys

### Appendix

- [How to manage multiple GitHub accounts on a single machine with SSH keys](https://medium.freecodecamp.org/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca)
- [Multiple SSH keys for different github accounts](https://gist.github.com/jexchan/2351996)