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

or
--

```python
sum = 0
for x in range(101):
    sum = sum + x
print(sum)

for key in dict

for value in dict.values()

for k, v in dict.items()

for k, v in [[k1, v1,], [k2, v2]]
```

while 
------

```python
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

#### arbitrary arguments

```python
# accept as tuple
def arbitrary_arguments(*arguments):
    print(arguments)

arbitrary_arguments(1, 2, 3) # prints (1, 2, 3)
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

#### destructing

Destructing a list, set, tuple or dictionary, to pass to a function

**how**

```python
# destruct a list, set, tuple with one asterisk `*`
*(1,2)
*set([1, 2, 3])
*[1,2]
# destruct a dictionary with two asterisks `**`
**{'a': 1, 'b': 2}
```

**call a function**

```python
func(*list)
# same as
func(list[0], list[1], list[2])

dict = {'a': 1, 'b': 2}
func(**dict)
# same as
func(a = 1, b = 2)
```

Slice of list/tuple
-------------------

Operation   | Result
---         | ---
s[i:j]      | slice from i to j(not included)
s[i:j:k]    | slice from i to j(not included) with step k

```python
s = [1,2,3,4]
print(s[1, 3]) # result: [2, 3]; s[3]=4 is not included
print(s[1, 3, 2]) # result: [2]; s[3]=4 is not included; s[2] is not included, for its in the step

s = tuple(s)
print(s[1, 3]) # ditto
```

List comprehensions
-------------------

```python
[expression for p in data]
```

**example**

```python
>>> [ x*x for x in range(1, 10)]
[1, 4, 9, 16, 25, 36, 49, 64, 81]
```

Generator
---------

Similar to list comprehensions, but with parenthesis instead of brackets

```python
>>> g = ( xx for in range(1, 10))
>>> type(g)
<class 'generator'>
>>> g.current()
```



