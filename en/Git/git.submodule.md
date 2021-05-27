# git submodule

## Add a sub repository to current one

```bash
git submodule add [--name <name>] <repository> <path>
```

## Initialize

```bash
git submodule init
```

## pull from submodule

> Should initialize before update

```bash
git submodule update
```

## Push to a submodule

### 1. `cd` to inner submodule

```bash
cd <submodule>
```

### 2. checkout a branch

```bash
git checkout master
```

### 3. add-commit-push

```bash
git add/commit/push
```

### 4. cd out of submodule

```bash
cd ..
```

### 5. update binding of submodule

```bash
git add -u
```

### 6. push main repository branch

```bash
git commit -m "update latest submodule commit id"
git push
```

## List all the submodules

```bash
git ls-files --stage | grep 160000
```

## Remove a submodule

To remove a submodule you need to:

- Delete the relevant section from the .gitmodules file.
- Stage the .gitmodules changes `git add .gitmodules`
- Delete the relevant section from .git/config.
- Run `git rm --cached path_to_submodule` (no trailing slash).
- Run `rm -rf .git/modules/path_to_submodule` (no trailing slash).
- Commit `git commit -m "Removed submodule <name>"`
- Delete the now untracked submodule files `rm -rf path_to_submodule`
