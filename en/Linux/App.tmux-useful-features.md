# Useful Features of Tmux

## Change default working directory of a existed session

```bash
tmux attach -c path/to/directory -t session_name
```

in which the `path/to/directory` should be absolute path.

## Command Cheat Sheet

### join-pane

Join split panes into target window, this is the reverse option of `break-pane`

```tmux
join-pane -s source_pane -t target_pane
```

Where the **target_pane** should in the form of

```text
window_number.pane_number
```

and the source pane will be appended to target_pane

Full example:

```tmux
join-pane -s 0 -t 1.2
```

> Appending pane 0 in current window after window 1, pane 2,
> which makes `0` to be pane 3 in window 1.

### break-pane

Create and move pane to new window
