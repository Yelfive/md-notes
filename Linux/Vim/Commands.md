# Commands of Vim

### save when open without privilege

```vim
:w !sudo tee %
```

where

- `%` means current file name