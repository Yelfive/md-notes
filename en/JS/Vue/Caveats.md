# Vue Caveats

## 1. Component template

A vue component template can be either of

- HTML
- String(`template: '...'`)
- Single file(`.vue`) components
- `<script type="text/x-template"></script>`

But with special care when using HTML as template,
there're constraints with tag embedding by the browser.

Such as children `<table>` must not be custom element(nor is the custom empty tag allowed anywhere).

```html
<table>
    <my-component/>
</table>
```

The above snippet will result without rendering `<my-component/>`, even if it may contains `<tr>`,
the custom tag will lose before passing to vue.

Here's Vue solution:

```html
<table>
    <tr is="my-component"></tr>
</table>
```

That's where the `is` property does the magic.

So, **be careful when using HTML template**,
problem of which won't happen to other implementations.
