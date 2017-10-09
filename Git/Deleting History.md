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

5. Rename the current branch to master

   git branch -m master

6. Finally, force update your repository

   git push -f origin master