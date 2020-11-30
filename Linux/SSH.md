# SSH

## Run a command remotely and then use a pseudo TTY

```bash
ssh -tp port username@ip 'cd /path/to/directory'
```

## Configure

reside in file `~/.ssh/config`

```conf
# Send keep alive packet every 60s
ServerAliveInterval 60
Host *
    # Use private key without enter password
    UseKeychain yes

Host github.com
    Hostname github.com
    User git
    Port 22
```

## Configure multiple SSH keys for GitHub

### 1. Create a new pair of RSA keys

```bash
ssh-keygen -t rsa -C "your-email@domain.com" -f ~/.ssh/id_rsa-sth
```

### 2. Add key to SSH agent

SSH agent manages the private keys used to start a SSH connection

```bash
ssh-add ~/.ssh/id_rsa-sth
# the origin private key should also be added
# to ssh agent
ssh-add ~/.ssh/id_rsa
```

### 3. Configure the SSH

```bash
vim ~/.ssh/config
```

```conf
Host github.com-sth
    HostName github.com
    User git
    IdentityFile ~/.ssh/id_rsa-sth
```

### 4. git clone

```bash
git clone git@github.com-sth:username/xxx.git
```

## Using `SSH` as tunnel

```bash
ssh -NL :33777:127.0.0.1:33306 username@remote_server -p 5122
```

This will login to `remote_server` with user `username`, on port `5122`, and this connection will be kept as a tunnel.
Any data sent to port `33777` on local machine will be sent to host `127.0.0.1` and port `33306` like it's from `remote_server`.

For example, when run command at local machine:

```bash
mysql -u root -P33777 -h local_server
```

The traffic will be sent through the tunnel and it's like calling on the remote server:

```bash
mysql -u root -p -h 127.0.0.1 -P 33306
```

where

- `-N` means _No command_, meaning will not run command on this connection
- `-L` means _Link_

  `bind_address:local_port:remote_local_address:remote_local_port`

  - if no `bind_address` is specified, it will be localhost
  - `remote_local_address` is the service address to visit on remote server, can access this address on remote server
  - `remote_local_port` is the port of service on remote server

### Using `SSH` as `Socks5` proxy

Example:

```bash
ssh -D 1080 -fCN -p 22 ssh-user@ssh-server-ip
```

where

- `-D` Dynamic address binding, `-D [bind address:]port`, whats to forward
- `-f` Run in background
- `-N` No command
- `ssh-user@ssh-server-ip` The server you use to forward traffics

## Others

1. Calculate public key via private one

   ```bash
   ssh-keygen -f ~/.ssh/id_rsa -y > ~/.ssh/id_rsa.pub
   ```

### Appendix

- [How to manage multiple GitHub accounts on a single machine with SSH keys](https://medium.freecodecamp.org/manage-multiple-github-accounts-the-ssh-way-2dadc30ccaca)
- [Multiple SSH keys for different github accounts](https://gist.github.com/jexchan/2351996)