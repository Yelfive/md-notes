React plus Redux
================

react-redux requires a react component to be divided into

- `UI components` 

    also called `pure components`, which deals only with the user interface, does change state or deal with logics.

- `Container components`

    This is like `controller` part of MVC, it does all the things except for UI

Install
-------

```sh
npm install --save-dev react-redux
# or
yarn add --dev react-redux
```


connect method
--------------

```js

import {connect} from 'react-redux';

connect(
    Function mapStateToProps,
    Function|Map|Object mapDispatchToProps
)(React.Component UIComponent);

```


#### mapDispatchToProps(dispatch, ownProps)



