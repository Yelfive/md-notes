# Regular Expression

## [Assertions](http://php.net/manual/en/regexp.reference.assertions.php)

> An assertion is a test on the characters following or preceding the current matching point that does not actually consume any characters. The simple assertions coded as `\b, \B, \A, \Z, \z, ^ and $` are described in [escape sequences](http://php.net/manual/en/regexp.reference.escape.php). More complicated assertions are coded as sub-patterns. There are two kinds: those that _look ahead_ of the current position in the subject string, and those that _look behind_ it.

### \b \B

0. Boundary means two close characters must be one \w while another \W
1. Does not represent any visible or invisible character
2. `\b` asserts the exact position to be a boundary, e.g. a\b", to assert boundary between a and "
3. `\B` assets the exact position not to be a boundary. e.g. a\Bb to asset no boundary between a and b

### Lookahead ones

Which is placed after a sub-pattern, it means, find the sub-pattern that is (not) appended by this sub-pattern.

#### 1. `(?=` Positive assertion

```
foo(?=bar)
```

Matches `foo` that is followed by `bar`, however `bar` is not a part of the match.

#### 2. `(?!` Negative assertion

```
foo(?!bar)
```

Matches `foo` that is not followed by `bar`

### Lookbehind ones

Placed before a sub-pattern, test a string if this sub-pattern does (or not) have an **lookbehind assertion** preceded it.

#### 1. `(?<=` Positive assertion

```
(?<=foo)bar
```

Matches the `bar` preceded with a `foo`, but `foo` is not included in the match.

#### 2. `(?<!` Negative assertion

```
(?<!foo)bar
```

Matches the `bar` that is **not** preceded with a `foo`.

## Cancel sub-mode

```
(?:\w)        //?:开头，表示取消子模式
```

## <font color="red">  Not to match </font>

### empty allowed

No `string` contained, 

```
(?!string)       // 不是aaa, 包含空；[^aaa] 不为aaa且不为空
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

## Appendix

- [PHP.net](http://php.net/manual/en/reference.pcre.pattern.syntax.php)