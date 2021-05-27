# JS Promise

## `async` and `await`

> The await operator is used to wait for a `Promise`. It can only be used inside an async `function`.

```js
function returnsPromise(x) {
    return new Promise(resolve => {
        setTimeout(() => resolve(x), 1000);
    });
}

async function doSth(x) {
    const result = await returnsPromise(x);
    // do sth with result
    console.log(result);
    return result + 1;
}

doSth(10)               // prints `10`
    .then(console.log)  // and also returns a promise with resolved value `11`
```

So basically `async` is used to envelop the normal function as a `Promise` function, thus, the above function `doSth` is equivalent as the following:

```js
function doSth(x) {
    return new Promise(resolve => {
        returnsPromise(x)
            .then(result => {
                // do sth with result
                console.log(result);
                resolve(result + 1);
            });
    });
}
```
