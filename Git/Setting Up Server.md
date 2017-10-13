Setting Up Server
=================

1. Install git
--------------

```bash
yum install -y git
```

2. Make directory
-----------------

```bash
mkdir -p /srv/git/my-repository.git
```

3. Initialize repository
------------------------

```bash
cd /srv/git/my-repository.git
git init --bare
```

4. Add authorization key
------------------------

```bash
cat key.pub >> ~/.ssh/authorized_keys
```

> Note: Remember to `chmod 600 ~/.ssh/authorized_keys`

5. Git clone
------------

```bash
git remote set-url  origin ssh://root@mylord.cn:9527/srv/git/outsource/geeqee/smart-home-app.git
```

