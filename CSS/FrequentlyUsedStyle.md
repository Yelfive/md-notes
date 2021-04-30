# Frequently Used Cascaded Style Sheet

## String Cut Out

```html
<div style="width: 40px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">Arbitrary length of characters</div>
```

## Forbid Scaling

```html
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0">
</head>
</html>
```

## Box Size

Normally, the border with be attached outside the box. For example, if a box is with size `x` and border width `y`,
the whole container will be with size `x + y`.

The following style will cancel the expansion, which means the container will be still at size `x`,
so the content will be wrapped in the width of `x - y`.

```css
div{
    -webkit-box-sizing: border-box; /* Safari/Chrome, other WebKit */
    -moz-box-sizing: border-box;    /* Firefox, other Gecko */
    box-sizing: border-box;         /* Opera/IE 8+ */
}
```
