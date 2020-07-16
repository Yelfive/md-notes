# sudo

## Configure the sudo

Via command:

```bash
visudo
```

or

```bash
vim /etc/sudoers
```

## Rules

- __root__   ALL=(ALL:ALL) ALL
  The first field indicates the username that the rule will apply to (`root`).
- demo     __ALL__=(ALL:ALL) ALL
  The first `ALL` indicates that this rule applies to all hosts.
- demo     ALL=(__ALL__:ALL) ALL
  This `ALL` indicates that the `root` user can run commands as all users.
- demo     ALL=(ALL:__ALL__) ALL
  This `ALL` indicates that the `root` user can run commands as all groups.
- demo     ALL=(ALL:ALL) **ALL**
  The last `ALL` indicates these rules apply to all commands.

## Editing

```bash
# Edit the following
root ALL=(ALL) ALL
user machine=commands
# user `installer` is allowed to sudo yum install/unstall/search...
installer ALL=/usr/bin/yum
# user `installer` is allowed to `sudo yum install` only
installer ALL=/usr/bin/yum install
```

```bash
user/group host=[(user/group could be changed into)] [whether password needed] command list separated by comma
```

```text
role host=[(another_role)] [password_config] command
```

Fields within `[]` is optional.

- `role`

  Could be either `user` or `group` started with a `%`:

  - `root` for user root
  - `%root` for group root

- `host`
  
  Which host the user logged in can use the `sudo` command

  `ALL` for all the hosts

- `another_role` **optional**
  
  The role to run `sudo` as.

  `ALL` means all users

  ```bash
  sudo -u user command
  ```

  Default to be `root` if omitted.
  If set, the parenthesis`()` is required.

- `password_config` **optional**

  Whether password is required when using `sudo`. Options available `NOPASSWD:`, and the colon(`:`) is required.

  This password affects only the first subsequent command.

  ```text
  felix ALL=(root) NOPASSWD: yum install
  ```

- `command`

  Any command to be allowed to be executed using `sudo`.

  `ALL` means all commands.

  > **Notes**:
  >
  > 1. Commands should be listed in absolute path
  > 2. Commands should be called with `path/to/command`, absolute or relative

## Multiple commands

Every after `role host=` is repeatable, for example:

```bash
deployer ALL= NOPASSWD: /home/deployer/bin/docker-phpfpm.sh, NOPASSWD: /usr/bin/docker ps
```

to allow `deployer` from `ALL` host to sudo `docker-phpfpm.sh` and `docker ps` without password.

you can then using these two commands prefix with `sudo` as normal ones

```bash
> sudo ~/bin/docker-phpfpm.sh
> sudo docker ps
```

No password will be asked for.

## Notice

### 1. Setting for sudo does not work

There may be another setting overwrites your setting bellow:

```sudoers
felix   ALL=(ALL:ALL) NOPASSWD: /usr/bin/docker
%sudo   ALL=(ALL:ALL) ALL
```
if the `felix` is also in group `sudo`, then the previous setting will not take effects.

### 2. If you happen to lock yourself out of `sudo`, worry not

Enter recovery mode to modify the `/etc/sudoers`

In Ubuntu,

1. press and hold the <kbd>shift</kbd> untill in the start up menu
2. choose recovery mode
3. run `mount -o rw,remount /` to make the file system writeable
4. working on the `/etc/sudoers` file

## Appendix

- [sudoers的深入介绍与用户权限控制](https://segmentfault.com/a/1190000007394449)
