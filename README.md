## Signature Generator

Editing involves...

```
npm install
coffee compile.coffee
```

Because of a post-commit hook `git push -all` will update the `gh-pages`.
You can set this up by saving the following to `.git/hooks/post-commit`.

```
#!/bin/sh
git checkout gh-pages
git rebase master
git checkout master
```
