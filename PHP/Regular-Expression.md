# Regular Expression

## [Assertions](http://php.net/manual/en/regexp.reference.assertions.php)

> An assertion is a test on the characters following or preceding the current matching point that does not actually consume any characters. The simple assertions coded as `\b, \B, \A, \Z, \z, ^ and $` are described in [escape sequences](http://php.net/manual/en/regexp.reference.escape.php). More complicated assertions are coded as sub-patterns. There are two kinds: those that _look ahead_ of the current position in the subject string, and those that _look behind_ it.

### \b \B

1. Boundary means two close characters must be one \w while another \W
2. Does not represent any visible or invisible character
3. `\b` asserts the exact position to be a boundary, e.g. `a\b"`, to assert boundary between `a` and `"`
4. `\B` assets the exact position not to be a boundary. e.g. `a\Bb` to asset no boundary between `a` and `b`

### Lookahead Assertions

Placed after a sub-pattern, to test if **lookahead assertion** appended this sub-pattern.

1. `(?=` Positive assertion

    ```regex
    foo(?=bar)
    ```

    Matches `foo` that is followed by `bar`, however `bar` is not a part of the match.

2. `(?!` Negative assertion

    ```regex
    foo(?!bar)
    ```

    Matches `foo` that is not followed by `bar`

### Lookbehind Assertions

Placed before a sub-pattern,
to test if **lookbehind assertion** preceded sub-pattern.

1. `(?<=` Positive assertion

    ```regex
    (?<=foo)bar
    ```

    Matches the `bar` preceded with a `foo`, but `foo` is not included in the match.

2. `(?<!` Negative assertion

    ```regex
    (?<!foo)bar
    ```

    Matches the `bar` that is **not** preceded with a `foo`.

## Cancel sub-mode

```regex
(?:\w)        //?:开头，表示取消子模式
```

## 回溯引用

回溯引用使用 `\num` 来引用某个子表达式，其中 `num` 代表的是子表达式的序号，从 `1` 开始。它和子表达式匹配的内容一致，比如子表达式匹配到 `abc`，那么回溯引用部分也需要匹配 `abc` 。

如匹配 `HTML`

```regex
<(h([1-6]))>(\w*?)<\/\1>
```

## 替换

在替换表达式中以 `$num` 表示使用第 `num` 个子模式进行替换，从 `1` 开始。

如针对上例中的查找表达式，使用下面的替换表达式

```regex
$2: $3
```

可以将

```html
<h1>Hello</h1>
<h2>World</h2>
```

替换成

```html
1: Hello
2: World
```

## 大小写转换

| 元字符 | 说明                                     |
| ------ | ---------------------------------------- |
| `\l`   | 把下个字符转换为小写                     |
| `\u`   | 把下个字符转换为大写                     |
| `\L`   | 把 `\L` 和 `\E` 之间的字符全部转换为小写 |
| `\U`   | 把 `\U` 和 `\E` 之间的字符全部转换为大写 |
| `\E`   | 结束 `\L` 或者 `\U`                      |

## 嵌入条件

条件为某个子表达式是否匹配，如果匹配则需要继续匹配条件表达式后面的内容。

::: warning
JS、Java、VSCode等均不支持嵌入条件
:::

### 回溯引用条件

对于查询表达式：

```regex
(\()?abc(?(1)\))
```

子表达式 `(\()` 匹配一个左括号，其后的 `?` 表示匹配 0 个或者 1 个。 `?(1)` 为条件，当子表达式 1 匹配时条件成立，需要执行 `)` 匹配，也就是匹配右括号。

## Examples

### Match for Chinese characters

```regex
/^['.chr(0xa1).'-'.chr(0xff).']+$/
/^[\x{4e00}-\x{9fa5}]+$/u
```

### Cell phone number

```regex
^(13\d|14[57]|15[^4,\D]|17[13678]|18\d)\d{8}|170[^346,\D]\d{7}$
```

```php
preg_replace($pattern， $replacement, $subject);
```

- `$pattern` 中 `/(\w)\\1/` `\\1` 代表 第一个 匹配子模式，`\\11`代表第11个，`(\\1)1` 代表第一个子模式后跟 `1`
- `$replacement` 中 `\\1` 代表 `1`, `$1` 代表第一个匹配模式, `${11}` 代表第 `11` 个匹配模式

## Appendix

- [PHP.net](http://php.net/manual/en/reference.pcre.pattern.syntax.php)
