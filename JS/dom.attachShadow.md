# Open vs. Closed Shadow DOM

Out of the four specifications created for Web Components, the Shadow DOM is one of the most powerful. The Shadow DOM allows the component author to create an encapsulated sub-DOM tree for their component.

The latest version (V1) of the Shadow DOM specification introduces a new concept when creating a Shadow Root: the mode.

To create a Shadow Root for an element you call the attachShadow method providing an object as an argument which has a required mode property.

let $element = document.createElement("div");
$element.attachShadow({ mode: "open" }); // open or closed
I’ve not seen any articles discussing the practical difference between using open and closed mode of Shadow DOM so I thought I’d put a short article together along with some simple examples.

## The Shadow DOM

Before I describe the difference between the open and closed modes it’s import to understand what the Shadow DOM is and what it does.

As previously mentioned, the Shadow DOM allows a component author to create a sub-DOM tree. When creating a vanilla Web Component you’d typically do something like this:

```js

class MyWebComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <p>I'm in the Shadow Root!</p>
        `;
    }
}

window.customElements.define("my-web-component", MyWebComponent);
```

In the constructor we’re using the attachShadow method to create an open Shadow Root for the Custom Element. We are then able to access the newly created shadow root via the shadowRoot property on the element instance. We can interact with the shadow root just like we would any DOM tree. For example we could use:

this.shadowRoot.querySelector("p");
To query for any paragraph elements in the shadow root.

We could also use appendChild to add a new element into the Shadow Root, or in the example above we are just using innerHTML to stamp an initial template.

If we add this Custom Element to a document and open Chrome Dev Tools, we’ll get something like this:

## Shadow Root in Chrome Dev Tools

We can see the element has an open Shadow Root with the paragraph element within. But what does this get us?

Because we have added the component template to a sub-DOM tree we get a certain level of encapsulation. If we added the following CSS to the main document head:

```html
<head>
    <meta charset="UTF-8">
    <title>Blog Post</title>
    <script src="open-vs-closed.js"></script>
    <style>
        p {
            color: red;
        }
    </style>
</head>
```

Because the paragraph element within our component is in the Shadow Root it won’t inherit this style.

Additionally if we executed the following JavaScript on the main document object:

```js
document.querySelector("p") // null
```

The result would be null because the Shadow Root won’t be queried providing the desired encapsulation.

With these simple concepts component authors can create an encapsulated context for their component ensuring they have control over the style and can be confident that ambient JavaScript won’t accidentally break their component.

The Shadow DOM has many more features to offer, if you’d like to learn more I’d recommend reading Shadow DOM v1: Self-Contained Web Components.

## Open Mode

Now we are clear on how the Shadow DOM works in terms of its encapsulation we can move on to look at the differences between the open and closed modes.

The above example used the open mode which offers a decent level of encapsulation already, so what could closed mode possibility provide in addition? Not much actually.

When you create an open Shadow Root with this.attachShadow({ mode: “open” }) as we saw in the above examples you are then able to use the shadowRoot property to access the encapsulated sub-DOM tree.

In the example above we did this from within the Custom Element class definition in the connectedCallback. The shadowRoot is available on the element instance so we can just as easily access it externally from the main application.

```js
const $myWebComponent = document.querySelector("my-web-component");
$myWebComponent.shadowRoot.querySelector("p").innerText = "Modified!";
```

With open mode a components Shadow Root is easy to update externally
Closed Mode
The closed mode of Shadow DOM is an interesting feature in that it is the cause of confusion for users while offering very little in return.

The closed mode of Shadow DOM provides the same encapsulation as the open mode but additionally allows the component author to hide access to the ShadowRoot, but not really — let me explain.

As we’ve just seen with open mode, once attachShadow has been called a reference to the elements shadow root is available on the shadowRoot property. This is not the case with closed mode: you’ll find that attachShadow returns `null`.

```js
let $element = document.createElement("div");
$element.attachShadow({ mode: "closed" });
$element.shadowRoot // null
```

The shadowRoot property always returns null if using closed mode of Shadow DOM
So what does this mean for Web Components?
Because you can’t use the shadowRoot property to access and manipulate the Shadow Root of the element you’ll need to manually store a reference to the Shadow Root yourself.

```js
class MyWebComponent extends HTMLElement {
    constructor() {
        super();
        this._root = this.attachShadow({ mode: "closed" });
    }
    connectedCallback() {
        this._root.innerHTML = `
            <p>I'm in the closed Shadow Root!</p>
        `;
    }
}
window.customElements.define("my-web-component", MyWebComponent);
```

The only difference here is that the component author has control over how the Shadow Root is exposed on the element:

```js
const $myWebComponent = document.querySelector("my-web-component");
$myWebComponent.shadowRoot // null
$myWebComponent._root // shadow-root (closed)
```

This might be considered a benefit as in JavaScript, good developer etiquette dictates that a variable prefixed with an underscore “should be left well alone”. But there is nothing really stopping anyone doing the following given the above example.

```js
const $myWebComponent = document.querySelector("my-web-component");
$myWebComponent._root.querySelector("p").innerText = "Modified!";
```

The so called “private” variable ain’t stopping nobody
Of course you could take it one step further and wrap the Custom Element definition in a closure to prevent the reference to the Shadow Root from being accessible:

```js
(function(){
    const _shadows = new WeakMap();
    class MyWebComponent extends HTMLElement {
        constructor() {
            super();
            _shadows.set(this, this.attachShadow({ mode: "closed" }));
        }
        connectedCallback() {
            _shadows.get(this).innerHTML = `
            <p>I'm in the closed Shadow Root!</p>
        `;
        }
    }

    window.customElements.define("my-web-component", MyWebComponent);
})();
But really there is nothing stopping someone executing the following JavaScript before your component definition.

Element.prototype._attachShadow = Element.prototype.attachShadow;
Element.prototype.attachShadow = function () {
    return this._attachShadow( { mode: "open" } );
};
```

This will hijack the native attachShadow method and force every attachShadow call to always create an open Shadow Root — leaving your supposedly closed Shadow Root open for manipulation.

## Conclusion

The closed mode of Shadow DOM has a single benefit which is to provide component authors with control over how the Shadow Root of their component is exposed (if at all) to the outside world.

Given that it’s incredibly easy to work around paranoid component authors hiding their Shadow Roots its probably not worth the effort.