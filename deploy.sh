#!/bin/bash
echo -e "\033[0;32mCompile TypeSctipt to JavaScript...\033[0m"
tsc
echo -e "\033[0;32mDeploying updates to GitHub...\033[0m"

git add .

# Commit changes.
msg="rebuilding site `date`"
if [ $# -eq 1 ]
  then msg="$1"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin 2.0.0

# Publish
echo -e "\033[0;32mPublishing...\033[0m"

npm publish