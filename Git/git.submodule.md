# git submodule

### add a sub repository to current one

```bash
git submodule add [--name <name>] <repository> <path>
```

### initialize

```bash
git submodule init
```

### pull from submodule

```bash
git submodule update
```

## Push to a submodule

### cd to inner submodule

```bash
cd <submodule>
```

### checkout a branch

```bash
git checkout master
```

### add-commit-push

```bash
git add/commit/push
```

### cd out of submodule

```bash
cd ..
```

### update binding of submodule

```bash
git add -u
```

### push main repository branch

```bash
git commit -m "update latest submodule commit id"
git push
```

### List all the submodules

```bash
git ls-files --stage | grep 160000
```


