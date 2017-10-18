Basics
======

String
------

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

Boolean
-------

- True
- False

> Note: Watch for the cases.

None
----

None for null

list
----

Similar to array of other languages

- list.insert(index, value)
- list.append(value)
- list.pop(int index)


```python
l = [1, 2, 3]]
l[0] # 1
```

tuple
-----

Similar to list, but the data cannot be changed after defined, so no API available

```python
l = (1, )
l = (1, 2)
```

dict
----

Dictionary, similar to map of other languages

- `get(key)` retrieve data
- `pop(key)` get and then remove the key

```python
d = {'a': 1, 'b': 2}
```

set
---

Similar to list, but stored as dictionary, no-duplicates.

- `add` add a value to set, if it existed already, no effects will be taken

```python
>>> s = set([1, 2, 3, 4, 4])
{1, 2, ,3, 4}

>>> s.add(4)
{1, 2, 3, 4}
```

if
--

```python
if condition:
    # do something
elif condition:
    # do something
else:
    # do something
```

while, for
----------

```python
sum = 0
for x in range(101):
    sum = sum + x
print(sum)

sum = 0
n = 99
while n > 0:
    sum = sum + n
    n = n - 2
print(sum)
```

Operator
--------

**1. `//` floor division **

```python
10 // 3
# result 3, similar to floor(10/3)
```

** in **

Check if a key exists in dict, or a value exists in list

```python
d = {'a': None}
'a' in d # True

l = [1, 3, 5]
5 in l # True
```

Function
-----------------

#### common function

```python
def my_func(x, y):
    return x**3 + y

my_func(y = 1, x = 2) # result: 2^3 + 1 = 9

```

#### arguments variable

```python
# accept as tuple
def arguments_variable(*arguments):
    print(arguments)

data = [1, 2, 3]
arguments_variable(*data)
# same as
arguments_variable(data[0], data[1], data[2]) # prints (1, 2, 3)
```

#### keywords

```python
# accept as dict
def as_dict(x, **d):
    print(x, d) # d is a dictionary

as_dict('x', x = 1, y = 2) # prints {'x': 1, 'y': 2}
```

#### named keywords

Accept only the named argument after asterisk `*`, and error will be raised if any other argument is passed

```python

def a(x, *, b, c, d):
    print(x, b, c, d)

a('x', b = 1, c = 2, d = 3)
```
