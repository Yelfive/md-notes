React Router v4
===============

> Notice
> 
> React Router may just be different from versions to versions.
> 
> And the following tutorials is for v4 only.


```jsx

import { BrowserRouter, Route } from 'react-router-dom';

const App = () => {
    <Router>
        <Route path="path/to/a" component={A}/>
        <Route path="path/to/b" component={B}/>
    </Router>
    <!-- / -->
}
```

First thing to remember
-----------------------

Route in the example above, is just a React component, it renders specified component when path matches, and renders `null` otherwise.


