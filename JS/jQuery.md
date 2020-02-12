# jQuery

## event.namespace

```js
$(selector).on('click.sth', function () {
  // do sth
});

$(selector).trigger('click');     // trigger click and click.<namespace>
$(selector).trigger('click.sth'); // trigger click.sth specifically, but not click
```