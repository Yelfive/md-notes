# java.lang.ThreadLocal

> <todo/> unfinished, just to get some ideas recorded.

`ThreadLocal.ThreadLocalMap`

数组存 map
`hash` 冲突解决办法：开放地址法

`java.lang.ref.WeakReference`

`WeakReference` 引用的对象，如果没有其他变量对其引用，则 gc 将回收弱引用的对象。

```java
Object val = new Object () {
    @Override
    public String toString() {
        return "val";
    }
};

WeakReference<Object> wo = new WeakReference<Object>(val);

System.out.println(wo.get()); // "val"
System.gc();
System.out.println(wo.get()); // "val"
val = null;
System.gc();
System.out.println(wo.get()); // null
```

:::tip

上式中，`wo` 并没有回收，而是 `wo.referent` 指向的对象（也是 `val` 指向的对象）被回收。

:::

`ThreadLocal.ThreadLocalMap.Entry extends WeakReference`

故 entry 中指向 key 的值，在满足条件的情况下，也将被回收

```java {17}
// In ThreadLocal.ThreadLocalMap
private void set(ThreadLocal<?> key, Object value) {
    Entry[] tab = table;
    int len = tab.length;
    int i = key.threadLocalHashCode & (len-1);

    for (Entry e = tab[i];
            e != null;
            e = tab[i = nextIndex(i, len)]) {
        ThreadLocal<?> k = e.get();

        if (k == key) {
            e.value = value;
            return;
        }

        if (k == null) {
            replaceStaleEntry(key, value, i);
            return;
        }
    }

    tab[i] = new Entry(key, value);
    int sz = ++size;
    if (!cleanSomeSlots(i, sz) && sz >= threshold)
        rehash();
}
```

::: tip
17 行中，若 e 指向的变量被回收，则 `k = e.get()` 的值将等于 `null`，此时，再对“过期”的坑替换为当前对象。
:::

`get` 是先根据 `hash` 值获取（在 `getEntry` 中调用），由于采用的是 **开放地址法** 解决冲突，获取为 `null` 时，表示 $miss$，此时调用 `getEntryAfterMiss`，尝试获取 key。

`remove` 时，额外地会清除所有“过期”的条目（entry）？

- `expungeStaleEntry` 遍历的将“过期”的条目删除

    ```java
    if (k == null) {
        e.value = null;
        tab[i] = null;
        size--;
    }
    ```

    如果条目没有过期，则将他移动到 hash 值指定的，应该的位置

    ```java
    int h = k.threadLocalHashCode & (len - 1);
    if (h != i) {
        tab[i] = null;

        while (tab[h] != null)
            h = nextIndex(h, len);
        tab[h] = e;
    }
    ```

    其中 `h` 代表实际应该的放置的索引值。

- `cleanSomeSlots`

**使用 `WeekReference` 的原因**：如果不使用，则生命周期将与线程，相同：直到线程销毁。即使当对象不再使用时，也不会被gc。如果是弱引用，则当对象不被使用（执行到作用于外之后，本地变量断开引用），弱引用便可以被 gc。

**内存泄露问题**：当 ThreadLocal 实例被回收之后，ThreadLocalMap entry 中的 value 仍然在被引用，虽然此时已经不可能被调用到。造成了内存泄露。解决办法，使用完之后调用 `threadLocal.remove()`，删除该条目（entry）。

\[here should be an image depict the references]
