
# Contributing

## Git Workflow

Setup git configuration:

```bash
git config branch.autosetuprebase always
git config merge.ff only
git config core.pager "less -r"
```

When preparing a new feature/bugfix/etc:

```bash
# Create a new branch off of master
git checkout -b my-feature-branch master
# Make and commit changes, push them
git commit ...
git push -u origin my-feature-branch
# When preparing to merge, rewrite history
git rebase -i master
# Force changes upstream
git push -f
```
