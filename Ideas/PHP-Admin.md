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

Consider this