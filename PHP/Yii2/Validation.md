# Validation

## Overview

6种方式验证, 5种方式自定义, 1种内置.

## 执行先后顺序

```php
<?php

new CustomValidator,  // Instance of Validator
[['password'], 'validatePassword'],     // InlineValidator
[['password'], function () {}],     // InlineValidator/Closure
[['field'], 'string'] // built in validators
[['content'], 'app\rules\TextLawful'],
[['content'], ['class' => 'app\rules\TextLawful', 'property1' => 'value1' [, ...]]],
```

## 验证调用堆栈

```php
<?php

$model->validate()
-> getActiveValidators
-> getValidators
-> createValidators
-> validateAtrributes
-> validateAttribute
-> validateValue
```

### 失败条件

是否有错误信息

```php
<?php

class yii\base\Model
{
    public function validate()
    {
        // Other statements
        return !$this-hasErrors();
    }
}
```

> **注意:** `FilterValidator` 将返回值设为元素新值,此外, return 值不会有任何其他作用, 不会影响验证结果

## Declare in instance of \yii\db\Model：

```php
<?php

public function rules()
{
     return [
         [['title', 'content',], 'required'],
         [['username', 'content'], 'string'],
         // Other validators
     ];
}
```

---

## Validators

### app\rules\TextLawful

```php
<?php

namespace app\rules;

class TextLawful extends \yii\validators\Validator
{

    /**
     * Validates a value.
     * A validator class can implement this method to support data validation out of the context of a data model.
     * @param mixed $value the data value to be validated.
     * @return array|null the error message and the parameters to be inserted into the error message.
     * Null should be returned if the data is valid.
     * @throws NotSupportedException if the validator does not supporting data validation without a model
     */
    public function validateValue($value)
    {
        // do something here
    }

}

```

---

### Inline validator

```php

['password', 'validatePassword'],

['password', function () {}],

```

#### Source code

**\yii\base\Model::createValidators**

```php
<?php

/**
 * Creates validator objects based on the validation rules specified in [[rules()]].
 * Unlike [[getValidators()]], each time this method is called, a new list of validators will be returned.
 * @return ArrayObject validators
 * @throws InvalidConfigException if any validation rule configuration is invalid
 */
public function createValidators()
{
    $validators = new ArrayObject;
    foreach ($this->rules() as $rule) {
        if ($rule instanceof Validator) {
            $validators->append($rule);
        } elseif (is_array($rule) && isset($rule[0], $rule[1])) { // attributes, validator type
            $validator = Validator::createValidator($rule[1], $this, (array) $rule[0], array_slice($rule, 2));
            $validators->append($validator);
        } else {
            throw new InvalidConfigException('Invalid validation rule: a rule must specify both attribute names and validator type.');
        }
    }
    return $validators;
}
```

**yii\validators\Validator::createValidator**

```php
<?php

/**
 * Creates a validator object.
 * @param mixed $type the validator type. This can be a built-in validator name,
 * a method name of the model class, an anonymous function, or a validator class name.
 * @param \yii\base\Model $model the data model to be validated.
 * @param array|string $attributes list of attributes to be validated. This can be either an array of
 * the attribute names or a string of comma-separated attribute names.
 * @param array $params initial values to be applied to the validator properties
 * @return Validator the validator
 */
public static function createValidator($type, $model, $attributes, $params = [])
{
    $params['attributes'] = $attributes;

    if ($type instanceof \Closure || $model->hasMethod($type)) {
        // method-based validator
        $params['class'] = __NAMESPACE__ . '\InlineValidator';
        $params['method'] = $type;
    } else {
        if (isset(static::$builtInValidators[$type])) {
            $type = static::$builtInValidators[$type];
        }
        if (is_array($type)) {
            $params = array_merge($type, $params);
        } else {
            $params['class'] = $type;
        }
    }

    return Yii::createObject($params);
}
```

**InlineValidator**

```php
<?php

/**
 * InlineValidator represents a validator which is defined as a method in the object being validated.
 *
 * The validation method must have the following signature:
 *
 * ```php
 * function foo($attribute, $params)
 * ```
 *
 * where `$attribute` refers to the name of the attribute being validated, while `$params`
 * is an array representing the additional parameters supplied in the validation rule.
 *
 * @author Qiang Xue <qiang.xue@gmail.com>
 * @since 2.0
 */

/**
 * @inheritdoc
 */
public function validateAttribute($model, $attribute)
{
    $method = $this->method;
    if (is_string($method)) {
        $method = [$model, $method];
    }
    call_user_func($method, $attribute, $this->params);
}
```


