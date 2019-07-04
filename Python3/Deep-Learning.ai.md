# Deep Learning

## Troubleshooting

### has no attribute `imgread`

```bash
pip install imageio
```

```python
import imageio
imageio.imread(filepath)
```

### module 'scipy.misc' has no attribute 'imresize'

```bash
pip install scikit-image
```

```python
from skimage.transform import resize

resize(image, (width, height))
```