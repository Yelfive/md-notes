Basics
======

Variable types
--------------

**String**

- _bytes_ The serial number for a string to store or transport, in hexadecimal, started with a `b`

```python
# encode as UTF-8
'中文'.encode('utf-8');
b'\xe4\xb8\xad\xe6\x96\x87'

# encode as GBK
'中文'.encode('gbk');
b'\xd6\xd0\xce\xc4'
```


**Boolean**

- True
- False

> Note: Watch for the cases.

Operator
--------

**1. `//` floor division **

```python
10 // 3
# result 3, similar to floor(10/3)
```
