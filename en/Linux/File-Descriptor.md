# File Descriptor

File descriptor using an integer to represent the handler of a file or device.

The system defined three descriptors already:

- `0` Standard input or stdin, usually the keyboard
- `1` Standard output or stdout, usually the screen
- `2` Standard error or stderr, usually the screen

## Define a descriptor

Command `exec` can be used to define a descriptor

```bash
exec 3>path/to/filename
```

And the descriptor follow these rules:

1. Descriptor is an integer
2. Descriptor is allowed from `3` to what `ulimit -n` allows
3. **Notice:** There's no space after descriptor(`3` in this case), otherwise, the `exec` will take the `3 > path/to/file` as the files to be executed. **Descriptor is always with redirection.**

After definition, it is available to access the file `path/to/filename` with this descriptor:

```bash
echo something >&3      # Notice no space between `>` and `&`
cat path/to/filename    # you will see whatever you echoed to the descriptor
```

The descriptors are file handlers, so should not be accessed like file, but with redirection:

```
cat <&3
```

## [Redirection Operator](/Redirect.md)

1. `>`
2. `>>`
3. `<`
4. `<<`

## Null Device

Anything redirects to this device will just vanish.

```    
/dev/null
```

**example**

```bash
echo something>/dev/null
# Nothing comes after
```
