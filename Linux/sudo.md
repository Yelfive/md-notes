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

## Editing

```visudo
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

    ```
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

## Appendix

- [sudoers的深入介绍与用户权限控制](https://segmentfault.com/a/1190000007394449)
