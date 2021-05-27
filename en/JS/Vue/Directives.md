# Vue Directives

**Example**:

```html
<my-component v-bind:arg=""></my-component>
```

Directive   | Description
---         | ---
v-bind      | Bind of a tag attribute to a property.
v-on        | Listen to an event.
v-html      | Insert property as HTML without escape.
v-if        | Conditional rendering. Use `<template>` to wrap multiple elements, which will not in the final output.
v-else-if   | Pair of `v-if`.
v-else      | Pair of `v-if`.
v-show      | Similar to `v-if`, but using CSS `display:none` to hide element.Does not work with `<template>`.
v-for       | Iterates over an array or a object.
v-model     | Two-way data bindings on form elements such as input.

## Short hand

- `v-bind` vs. `:`

    ```html
    <!-- Original -->
    <my-component v-bind:title="title"></my-component>

    <!-- Short hand -->
    <my-component :title="title"></my-component>

    <!-- Dynamic argument -->
    <my-component :[prop]="title"></my-component>
    ```

- `v-on` vs. `@`

    ```html
    <!-- Original -->
    <input v-on:change="doSth" />

    <!-- Shorthand -->
    <input @change="doSth" />
    <!-- Dynamic argument -->
    <input @[eventName]="doSth" />
    ```

## Details about `v-bind`

### `:class`

```html
<div class="base-class" v-bind:class="{ active: isActive }"></div>
```

- `object` Conditional render, when `isActive` is `true`.
- `Array` Render all the classes specified in the array.

### `:style`

```html
<div v-bind:style="{height: 200px}"></div>
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

## Details about `v-for`

`v-for` can work with `<template>`.

```html
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
```

```js
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

`v-for` with optional second argument to represent for the index:

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

### `v-for` with `of`

```html
<div v-for="item of items"></div>
```

### `v-for` with object

```html
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```

> The `name` and `index` are optional.

### `v-for` with range

```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

> `v-for` has higher priority than `v-if`.
>
> ```html
> <li v-for="todo in todos" v-if="!todo.isComplete">
>   {{ todo }}
> </li>
> ```
>
> The above only renders the todos that are not completed.

## Details about `v-model`

It is a two-way data bindings, changes made on form element will change the bound data.

- It automatically picks the correct way to update the element based on the input type.
- `v-model` will ignore the initial value, checked, or selected attributes found on any form elements

v-model internally uses different properties and emits different events for different input elements:

- text and textarea elements use `value` property and `input` event;
- checkboxes and radios use `checked` property and `change` event;
- select fields use `value` as a prop and `change` as an event.

### Modifiers for `v-model`

- `.lazy`

  ```html
  <!-- synced after "change" instead of "input" -->
  <input v-model.lazy="msg">
  ```

- `.number`
- `.trim`
