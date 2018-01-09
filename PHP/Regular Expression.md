# Regular Expression

## \b \B

0. Boundary means two close characters must be one \w while another \W
1. Does not represent any visible or invisible character
2. `\b` asserts the exact position to be a boundary, e.g. a\b", to assert boundary between a and "
3. `\B` assets the exact position not to be a boundary. e.g. a\Bb to asset no boundary between a and b

## Cancel sub-mode

```
(?:\w)        //?:开头，表示取消子模式
```

## Not to match

```
(?!aaa)       // 不是aaa, 包含空；[^aaa] 不为aaa且不为空
```

### Match for Chinese characters

```
'/^['.chr(0xa1).'-'.chr(0xff).']+$/'
'/^[\x{4e00}-\x{9fa5}]+$/u'
```

### Cell phone number

```
^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7}$
```

preg_replace($pattern， $repalcement, $subject);
$pattern 中 '/(\w)\\1/'      \\1 代表 第一个 匹配子模式，\\11代表第11个，(\\1)1代表第一个子模式后跟1
$replacement 中           \\1 代表 1 ; $1 代表1 ; ${11}代表11

