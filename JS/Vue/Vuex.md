# Vuex

## Vuex Maps

- `mapState` to read state

  ```js
  this.$store.state.sth;

  const options = {
      computed: mapState(['name']),
  };
  const options = {
      computed: mapState({
          name: state => state.name
      }),
  };
  ```

- `mapGetters` to read state like `computed` option of _Vue_ component.

  - `getters.sth` or `getters[sth]`

- `mapMutations` to expose `mutations` to component's `methods`. Consider as an event to change state, called with `commit`.

  >  In Vuex, mutations are synchronous transactions

  - `commit`

- `mapActions` to expose `actions` to component's `methods`, asynchronous mutations

  - `dispatch`

  ```js
  const store = new Vuex.Store({
      state: {
          count: 0
      },
      mutations: {
          increment (state) {
              state.count++
          }
      },
      actions: {
          increment (context) {
              context.commit('increment')
          }
      }
  })
  ```

  triggered by `dispatch`

  ```js
  store.dispatch('increment')
  ```

## Modules

```js
const moduleA = {
    state: {},
    mutations: {
        increase(state) {
        }
    },
    getters: {
        sumOfSomething(state, getters, rootState, rootGetters) {
        }
    },
    actions: {
        increment({state, commit, rootState}) {
        }
    },
}

store = new Vuex({
    modules: {
        a: moduleA,
    }
});

store.state.a // ModuleA's state
```

### Namespace

> By default, actions, mutations and getters inside modules are still registered under the global namespace - this allows multiple modules to react to the same mutation/action type.

```js
const moduleA = {
    namespaced: true,
}

store.commit('a/increase');

// Manipulating root state
commit('someMutation', null, { root: true });
dispatch('someOtherAction', null, { root: true });
```

Map helpers:

> Works with `mapState`, `mapGetters`, `mapActions` and `mapMutations`.

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  }),
  ...mapGetters([
    'some/nested/module/someGetter', // -> this['some/nested/module/someGetter']
    'some/nested/module/someOtherGetter', // -> this['some/nested/module/someOtherGetter']
  ])
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  }),
  ...mapGetters('some/nested/module', [
    'someGetter', // -> this.someGetter
    'someOtherGetter', // -> this.someOtherGetter
  ])
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```
