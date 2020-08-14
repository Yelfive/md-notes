# Vue options

## computed

This is like the getter method of a property.

```html
<div id="example">
  <p>Original message: "{{ message }}"</p>
  <p>Computed reversed message: "{{ reversedMessage }}"</p>
</div>
```

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: 'Hello'
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.message.split('').reverse().join('')
    }
  }
})
```

### With _getter_ and _setter_

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

## methods

```html
<div>{{ reverseMessage() }}</div>
```

```js
methods: {
  reverseMessage: function () {
    return this.message.split('').reverse().join('')
  }
}
```

## watch

Watches and acts when a property changes, recommended for asynchronous or expensive operations, which takes time.

```js
var vm = new Vue({
  el: '#demo',
  data: {
    question: 'Foo',
  },
  watch: {
    question: function (val) {
        // do sth with question with heavy overload.
    }
  }
})
```
