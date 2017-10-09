Deleting History
================

#### Checkout

   git checkout --orphan latest_branch

#### Add all the files

   git add -A

#### Commit the changes

   git commit -am "commit message"

#### Delete the branch

   git branch -D master

#### Rename the current branch to master

   git branch -m master

#### Finally, force update your repository

   git push -f origin master

Second
------

```bash
rm -rf .git
git init
git remote add origin some-site
git commit -am "initial commit"
git push -f origin master
```
