# Brief

## Desktop

Start of all desktop system - `X Desktop System`
- `startx` start the desktop

## Array

### set

```bash
a = (1 2 3 4)
a[1] = 22 # set from 2 to 22
```

### unset

```bash
# remove variable `a`
unset a
# remove second member of `a`
unset a[1]
```

### read

```bash
echo ${a[0]} # 1
echo ${a[1]} # 2
echo ${a[2]} # 3
# ...
```

#### All members separated by space

```bash
echo ${a[@]}
echo ${a[*]}
```

#### Length of the array

```bash
echo ${#a[@]}
echo ${#a[*]}
```

**See Also** https://www.cnblogs.com/chengmo/archive/2010/09/30/1839632.html


