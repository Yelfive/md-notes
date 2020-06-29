# Download Subdirectory from GitHub

## Summary

Git does not provide any method to download a subdirectory from a repository, however, if a request comes from `svn` to `Github.com`, `GitHub` will take and perform this `svn` request, and `svn` supports to download a subdirectory. 

## Prerequisite

You need to install the `svn`.

```bash
apt install -y subversion
```

## How to

### 1. download the whole `master`

```bash
svn export https://github.com/username/project/trunk
```

### 2. download `path/to/some_files` from `master` on GitHub

```bash
svn export https://github.com/username/project/trunk/path/to/some_files
```

Of course, if you want to download from some specified branch, you can run

```bash
svn export https://github.com/username/project/branch_name/path/to/some_files
```

### 3. to list the branches or trunk files

```bash
svn ls https://github.com/username/project
```

and generally you will get

```text
branches/
trunk/
tags/
```

You could iteratively explore the repository this way.

## See Also

- [How to download a project subdirectory from GitHub (Example)](https://coderwall.com/p/o2fasg/how-to-download-a-project-subdirectory-from-github)
- [git export from github remote repository - Stack Overflow](https://stackoverflow.com/questions/9609835/git-export-from-github-remote-repository/18324428#18324428)