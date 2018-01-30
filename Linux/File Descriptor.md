# File Descriptor

File descriptor using an integer to represent the handler of a file or device.

The system defined three descriptors already:

- `0` stdin
- `1` stdout
- `2` stderr

## Define a descriptor

Command `exec` can be used to define a descriptor

```bash
exec 3> path/to/filename
```

And the descriptor follow these rules:

1. Descriptor is an integer
2. Descriptor is allowed from `3` to what `ulimit -n` allows
3. **Notice**
    3.1 No space after descriptor, `3` in this case
    3.2 Space after redirection operator `>`

After definition, it is available to access the file `path/to/filename` with this descriptor:

```bash
echo something >&3 # Notice no space between `>` and `&`
cat path/to/filename # you will see whatever you echoed to the descriptor

# also, read like this
cat n <&3
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
```
