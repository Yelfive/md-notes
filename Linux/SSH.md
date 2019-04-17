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

## Configure multiple ssh keys for GitHub

### 1. Create a new pair of rsa keys

```bash
ssh-keygen -t rsa -C "your-email@domain.com" -f ~/.ssh/id_rsa-sth
```

### 2. Add key to ssh agent

SSH agent manages the private keys used to start a SSH connection

```bash
ssh-add ~/.ssh/id_rsa-sth
```

### 3. Configure the ssh

```bash
vim ~/.ssh/config
```

```text

```

### Appendix

- [How to manage multiple GitHub accounts on a single machine with SSH keys](https://medium.freecodecamp.org/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca)
- [Multiple SSH keys for different github accounts](https://gist.github.com/jexchan/2351996)