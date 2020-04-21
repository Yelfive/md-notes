# jQuery

## event.namespace

- Event **`click.sth`** listens on both **`click`** and **`click.sth`**
- Event **`click`** listens on only **`click`**

Syntax

```js
/**
 * click.sth event listens on both 'click' and 'click.sth'
 */
$(selector).on('click.sth', function (event) {
  // do sth with event.namespace
});

$(selector).trigger('click');     // trigger click and click.<namespace>
$(selector).trigger('click.sth'); // trigger click.sth specifically, but not click
```

Example

```js
$(selector).on('click click.init', function (event) {
    // do something
});

$(selector).trigger('click') 		// will execute this function twice
$(selector).trigger('click.init') 	// tiggers this function only once
```



**See also** [event.namespace | jQuery API Documentation](https://api.jquery.com/event.namespace/)



## Listen to multiple events

```js
// Use space-separated syntax
$(selector).on('event1 event2', function () { 
    // do something here
});
```