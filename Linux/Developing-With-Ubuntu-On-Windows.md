# Developing With Ubuntu on Windows

## Preface

When we're developing, we always enjoy the test evironment Linux brings us,
and the tools(IDE, DBMS, Axure, IM etc) that windows provides,
but we cannot have them both.
And what if there is a way, allows us to develop with awesome tools on Windows
and test our code on Linux. Or maybe you don't want to jeopardise your machine
with vulnerable developing tools which might crush or even damage the whole OS.

What we need here is 

- VirtualBox(or another machine)
- SMB, for file sharing

### What do we do ?

We install `VirtualBox` on `Windows`, and within `VirtualBox` machine we install `Ubuntu`(any distribution is fine).
And on the `Ubuntu`, we install `SMB`, configure the shared directory, set permissions.
Finally, connect to this `Ubuntu` from `Windows` to the shared project directory.
After all these steps, we are allowed to use `IDE`(and others) on Windows to develop as if the code is on Windows.

The only defect which makes the developing a litte bit inconvenient is that, you have to ssh into the Ubuntu in order
to test your code.

## How do we do that?

### 1. Install SMB on Ubuntu (skipping the install Ubunut part)

```bash
sudo apt-get install -y samba
```

### 2. Configure your SMB

Open config file

```bash
sudo vim /etc/samba/smb.conf
```

Append the config

```ini
[projects]
    path = /srv/projects
    browseable = yes
    guest ok = no
    guest only = no
    writable = yes
    read only = no
    valid users = felix
    force create mode = 0755
    force directory mode = 0755
```

- `[projects]` the name of the shared, consider a "folder"

### 3. Create and Enable SMB user

```bash
sudo smbpasswd -a <username>
sudo smbpasswd -e <username>
```

### 4. Start the SMB server

```bash
sudo systemctl start smdb
```

### 5. Connect from Windows (actually, any OS is fine)

1. Open up File Explorer and in the left pane right-click on `This PC`.
2. Select `Choose a custom network location` and then click `Next`.
2. In `Internet or network address`, enter the address of the Samba share in the following format `\\samba_hostname_or_server_ip\sharename`.

## See also

- [How to Install and Configure Samba on Ubuntu 18.04](https://linuxize.com/post/how-to-install-and-configure-samba-on-ubuntu-18-04/)
