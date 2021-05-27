# git merge



## Use theirs version

```bash
git merge -s recursive -X theirs dev
```

- `-s`  strategy
- `-X` strategy options, `theirs` to use theires version

**See also** `git merge --help`

> The **merge** mechanism (`git merge` and `git pull` commands) allows the backend merge strategies to be chosen with `-s` option. Some strategies can also take their own options, which can be passed by giving `-X<option>` arguments to `git merge` and/or `git pull`.

