# 

1. form
2. grid

## model

1. `form/grid` translation using `Model::attributeLabels();` by default
2. rules using `Model::rules` by default

## 1. form

```php
/*
 <div class="readonly">
    <input readonly="readonly" />
 </div>
 */
$form->file()->readonly();

// <input readonly="readonly">
$form->file()->findInput('selector')->readonly();
```

## 2. grid

```php
// generate a link to redirect to edit/view page
$grid->column()->linkToEditPage();
```

## 3. `Laravel-admin` uses pjax, which has bug with PHP

Consider this example

```php
<?php

$dom = new \DOMDocument('1.0', 'utf-8');
$dom->loadHTML(<<<HTML
<script>
let a = <span>123</span>
</script>
HTML
);

echo $dom->saveHTML();
```

will result:

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
<html><head><script>
let a = '<span>123';
</script></head></html>
```

with **closing tag removed**. In fact, everything after the closing tag is removed too.

`Laravel-Admin` uses `\Symfony\Component\DomCrawler\Crawler`, which uses `\DOMDocument`, which uses `libxml` to get pjax container's content. And this is a known bug with `libxml`, which does not support `HTML5`.

With this bug under consideration, the pjax response passing should take place at browser side, instead of server side.