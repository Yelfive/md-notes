Redux
=====
Redux is as the official says 'a state container'.

`Take action` => `Action dispatch` => `State change` => `View change`

State and View must be in one-to-one corresponding relations, which means, one `state` specifies one `view` and vice versa.

Install
-------

```js

yarn add --dev redux
// or
npm install --save-dev redux

```

API
---

#### API of redux

```js
import {
    createStore,
    combineReducer,
    applyMiddleware
} from 'redux'
```

- createStore(Function reducer)
    
    To get the store, register with reducer.

- combineReducer(Map reducers)

    ```js
    combineReducer({
        reducerA, reducerB
    });
    ```

    To combine many reducers into one.

- applyMiddleware

#### API of createStore

```js
const {dispatch, getState, subscribe} = createStore(reducer)
```

- dispatch(action)

    ```js
    dispatch({
        type: 'INCREASE',
        payload: someData
    })
    ```

    To dispatch an action

- getState()

    To get current state

- subscribe()

    To subscribe to a listener, like an event.

    It returns a function to cancel all subscriptions.

- reducer

    A custom function to handle actions, for the whole APP

Middlewares
-----------

- redux-thunk
- redux-promise
