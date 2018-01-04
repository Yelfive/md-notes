# Setting Up Server

## 1. Install git

```bash
yum install -y git
```

## 2. Make directory

```bash
mkdir -p /srv/git/my-rep
ository.git
```

## 3. Initialize repository

```bash
cd /srv/git/my-repository.git
git init --bare
```

## 4. Add authorization key

```bash
cat key.pub >> ~/.ssh/authorized_keys
```

> Note: Remember to `chmod 600 ~/.ssh/authorized_keys`

## 5. git clone

```bash
git remote add origin ssh://root@mylord.cn:9527/srv/git/outsource/geeqee/smart-home-app.git
```

> Clone with protocol `ssh://user@site[:port]/path/to/repository.git`

If you are at the where the git repositories stores, you can set origin like this(with absolute path)

```bash
git remote add origin /srv/git/something.git
```
