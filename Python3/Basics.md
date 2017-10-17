Basics
======

Variable types
--------------

#### String

**character set**

- `bytes` 
    - The serial number for a string to store or transport, in hexadecimal, started with a `b`.
- `String.encode(string charset)` 
    - To encode the string into computer character as `charset`
- `String.decode(string charset)`
    - To change the string from computer characters to human readable characters


```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# encode as UTF-8
'中文'.encode('utf-8');
b'\xe4\xb8\xad\xe6\x96\x87'

# encode as GBK
'中文'.encode('gbk');
b'\xd6\xd0\xce\xc4'
```

**formatting**

```python
string % (variable list)

# prints `hello, Felix`
'hello, %s' % ('Felix')
```

#### Boolean

- True
- False

> Note: Watch for the cases.

#### list

Unique-membered list

```python
l = (1,)
# (1,)
l = (1, 1, 2)
# (1, 2)
```

#### tuple

Similar to list, but the data cannot be changed after defined

```python

```

Operator
--------

**1. `//` floor division **

```python
10 // 3
# result 3, similar to floor(10/3)
```