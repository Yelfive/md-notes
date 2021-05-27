# Vue events

Called with directive `v-on` or its shorthand `@` .

- `$event`

    ```html
    <button v-on:click="warn('Form cannot be submitted yet.', $event)">
    Submit
    </button>
    ```

    ```js
    // ...
    methods: {
        warn: function (message, event) {
            // now we have access to the native event
            if (event) {
                event.preventDefault()
            }
            alert(message)
        }
    }
    ```

    `$event` represents the original DOM event.

## Event modifiers

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```html
<!-- the click event's propagation will be stopped -->
<a v-on:click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form v-on:submit.prevent></form>

<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div v-on:click.capture="doThis">...</div>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div v-on:click.self="doThat">...</div>

<!-- the click event will be triggered at most once -->
<a v-on:click.once="doThis"></a>

<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div v-on:scroll.passive="onScroll">...</div>
```

## Key modifier

```html
<!-- only call `vm.submit()` when the `key` is `Enter` -->
<input v-on:keyup.enter="submit">
<input v-on:keyup.page-down="onPageDown">

<!-- Using keyCode attributes -->
<input v-on:keyup.13="submit">
```

- `.enter`
- `.tab`
- `.delete` (captures both <kbd>Delete</kbd> and <kbd>Backspace</kbd> keys)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

## Mouse modifier

- `.left`
- `.right`
- `.middle`
