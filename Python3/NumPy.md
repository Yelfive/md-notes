# NumPy

## axis

`axis=i` means along the change of `i`, with other dimensions fixed.

Especially, `axis=-1` means the last axis

e.g.

```python
import numpy as np

x = np.array([[4, 6], [2, 1]])

y = np.sort(x, axis=0) # result: [[2, 1], [4, 6]]

z = np.sort(x, axis=1) # axis=-1 means the last axis, result: [[4, 6], [1, 2]]
```