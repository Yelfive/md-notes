ES2015(ES6) Basics
==================

JS complier
-----------

- bable

    js compiler to compile written in ES6 into all kinds of versions

- gulp

    command line tool


system.global 
    https://github.com/ljharb/System.global
let, const 
    declared in ES6, 
destruct
    let (a,b) = [1,2]
    let {property: alias} = object
    function a ([x, y]) {};

codePointAt/fromCodePoint
    String.fromCodePoint
    'string'.codePointAt
for (... of ...)
    iterates object implements Iterator
`template string`
    `${js expression}`

tag `string ${variable} string ${variable}`
    func ([string, string, ...], variable, variable ...) 
String.raw/ string.raw


Regular Expression
    u
        for Unicode, to recognise code point over 0xFFFF as one character
        /𠮷/u.test('𠮷') // true, without 'u', the expression will be false
    reg.flags
        to get the flags of the reg object

Number
    0o 0O
        indicates its a octonary  number
    0b 0B
        binary number
    Number.EPSILON 
        an extreme small number to suggest the acceptance of a float calculating
    Number.isSafeInteger
        to check if it's within accurate integer range(-2^53 + 1, 2^53 -1)
        Number.MAX_SAFE_INTEGER: 2^53 - 1
        Number.MIN_SAFE_INTEGER : -2^53 + 1
    Math.cbrt
        Math.cbrt(8) // 2
    **
        2**3 == 8 // Math.pow(2,3)

Object.defineProperty(object, propertyName, {value: value, enumerable: true/false})
    enumerable: whether it can be iterated (via for ... in, for example)

```js
let obj = {
    [stirng]: (arg) {} //  string: function (arg) {}
}
```


Symbol
------

```js

let sym = Symbol('foo')
let sym = Symbol.for('bar')
```

Register a Symbol instance in global, key = bar, if exists already, return the same symbol
Global means, unique in different window and service worker

```js
let key = Symbol.keyFor(sym)
```

retrieve the registered key for the given instance

#### Triggered by call some function on the instance, magic methods

- **Symbol.hasInstance**

    someObject instance of new Obj

    ```js
    class Obj
    {
        [Symbol.hasInstance]() {
            // invoked when instanceof called with the instance of this Obj
        }
    }
    ```


- **Symbol.isConcatSpreadable**

        this should be the property of a class instance

- **Symbol.species**

        To overwrite the default constructor
        ```js
        class MyClass extends Array
        {
            static get [Symbol.species]() {
                return Array;
            }
        }
        let a = new MyClass(1,2,3,4);
        a instanceof MyClass;// false
        a instanceof Array; // true
        ```
- match
- replace
- search
- split
- iterator
- toPrimitive
- toStringTag
- unscopables

Set
---

    int size

    Set add
    Boolean delete
    Boolean has
    void clear
    
    keys
    values
    entries
    forEach
WeakSet
    accepts only objects as elements
    no iteration
Map
    int size

    Map set
    mixed get
    Boolean has
    Boolean delete
    void clear

    keys
    values
    entries
    forEach
WeakMap
    accepts only objects as keys
    no iteration
Symbol.iterator
    obj = {}
    obj[Symbol.iterator] = function () {
        return {
            next: () {
                return {value: 123, done: false};
            }
            // [Optional]
            return: () {} // called when break before the last iteration
            throw: () {}
        }
    }
    // Value for property `Symbol.iterator` of obj must be a function
    // The function must return an object
    // The returned object must contain a property `next` of type function
    // The `next` function must return an object {value: value, done: boolean}
    Array.from, [...iterator], for ... of
        These operation will trigger the iteration, and the {done: true} does not count
    

Proxy
    Set before the object, every query to the object will have to pass the proxy
    1. Object construct
    2. mixed get
    3. Boolean set
    4. Boolean has
    5. Boolean deleteProperty
    6. Array ownKeys
    7. Boolean defineProperty
    8. Object getOwnPropertyDescriptor 
    9. Boolean preventExtensions
    10. Object getPrototypeOf
    11. Boolean setPrototypeOf
    12. Boolean isExtensible
    13. void apply
    
    Proxy.revocable
        Returns {proxy: proxy, revoke: revoke} // proxy is the same as return from new Proxy
        revoke will prevent the proxy's property from being accessed again

Reflect
    construct(target, args) // to new an instance
    get(target, name, receiver) // get property from target, undefined if none exists
    set(target, name, value, receiver) // set to target a property
    has(target, name) // check if the property exists, operator `in`
    deleteProperty(target, name) // same as `delete target[name]`
    getPrototypeOf(target) // same as getting `target.__proto__`
    setPrototypeOf(target) // same as `target.__proto__=newPrototype`
    apply(func, thisArg, args) // `Function.prototype.apply.call(func, thisArg, args)`
    defineProperty(target, propertyKey, attributes) // `Object.defineProperty`
    getOwnPropertyDescriptor(target, propertyKey) // `Object.getOwnPropertyDescriptor`
    isExtensible(target) // `Object.isExtensible`
    preventExtensions(target) // `Object.preventExtensions` to make an object un-extensible
    ownKeys(target) // combination of `Object.getOwnPropertyNames` and `Object.getOwnPropertySymbols`
    
Promise
    Promise a functionality, generally for asynchronized functions, to perform,
    and call the corresponding response callback when it's done
    ``` js
    let promise = new Promise(function(resolve, reject) {
        if (success) {
            resolve(result);
        } else {
            reject(error)
        }
    })
    
    promise.then(success, fail); 
    // params for then are both callbacks, their args taken respectively from resolve & reject
    ```

    [prototype]
    then
        1. If the resolve takes a promise as argument, the `then` will be triggered after the promise succeeded
        2. It returns a new promise, differs from the called promise
        3. The return from the `then callback` will be taken as the value for the second `then`
            ```js 
            promise.then(value => value + 1).then(value => console.log(value)) // if the value = 1, then 2 will be printed
            ```
        4. If the return is a promise, the next `then` will be triggered after the returned promise's state changes
        
    catch
        1. Alias for `then(null, function () {...})`
        2. Returns a new promise, which can be followed by `then/catch`
        3. It catches all the exceptions, in `new Promise`, `then`, `catch`
    
    [static]
    all
        ```js
        let promises = Promise.all([p1, p2, p3 ...])
        ```
        1. The param should be implementation of Iterator, e.g. Array
        2. `promises` will be resolved when all p* are resolved, otherwise, rejected
        3. The `then` takes arguments returned by p* in an array, e.g. [result1, result2, result3 ...]
    
    race
        ```js
        let promise = Promise.race([p1, p2, p3]);
        ```
        1. The usage is same as `Promise.all`
        2. The promise whose state changes first will trigger the `promise` to correspond(resolve or reject)
    resolve
        ```js
        Promise.resolve('aaa');
        // Equals to
        new Promise(resolve => resolve('aaa'));
        ```
        0. Resolve happens at the end of current event loop
        [argument]
        1. argument is a promise, return the exact promise
        2. argument is an object contains `thenable`, which is a function,
            ```js
                let obj = {
                    thenable: function (resolve, reject) {}
                };
                Promise.resolve(obj)
                // Equals to
                new Promise(resolve => obj.thenable(resolve, reject));
            ```
        3. else
            ```js
            new Promise(function (resolve) {
                resolve(else)
            });
            ```
            else can be anything excludes above
    reject
        similar to resolve except it rejects promises


Generator
    *
        function* generator(){}
    yield
        similar to return, gives out the value of the expression following the yield keyword
    yield*
        The asterisk means the iterator the value, and yield each of them, say, `yield* 'hi'` equals to `yield 'h'; yield 'i'`
    return
        the return and the end of the generator will cause the end of the generator, `generator.next()` will get {value: undefined/returnValue, done: true}
        if no return there, {value: undefined, done: true} will be returned by calling `generator.next()`
    [prototype]
    generator.throw
        1. To throw a exception into the generator's current yield
        2. Throw on generator will trigger the next yield statement to happen, and the value returned
        3. The exception inside a generator will end the generator immediately, an the subsequent `next` will get {value: undefined, done: true}
    generator.return
        1. To end the generator and return {value: returnValue, done: true}
        2. If there is `try...finally` inside, the return will be delayed after the `finally` block
    