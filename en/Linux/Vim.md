# Vim

## common setting

```vim
syntax on
set nu
set whichwrap=b,s,<,>,[,]  
set sw=4
set ts=4
# expand tab
set et
set smartindent
```

## Write with `sudo`

```bash
:w !sudo tee %
```

`%` stands for current file, `w` is for signature:

```txt
:[range]w[rite] [++opt] !{cmd}
                        Execute {cmd} with [range] lines as standard input
                        (note the space in front of the '!').  {cmd} is
                        executed like with ":!{cmd}", any '!' is replaced with
                        the previous command |:!|.
```

## introduce

- Cancel indent when paste: `:set paste`, to enter paste mode
