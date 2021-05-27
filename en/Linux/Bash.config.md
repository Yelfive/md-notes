# Bash Config

## vi mode

```bash
vim ~/.bashrc
```

Put the config in

```bashrc
set -o vi
bindkey -v
bindkey '^R' history-incremental-search-backward
```
