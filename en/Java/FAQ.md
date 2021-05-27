# Java FAQ

## ConcurrentModificationException

遍历时修改会抛出 `ConcurrentModificationException`。[^concurrent-modification-exception]

[^concurrent-modification-exception]: [Avoiding the ConcurrentModificationException in Java | Baeldung](https://www.baeldung.com/java-concurrentmodificationexception)

不能在迭代的同时，删除一个 `Map` 中的元素，否则会抛出上面的异常。此时可以利用 `Iterator` 进行遍历并删除。

例如对于如下 `Map`

```java
HashMap<String, Integer> map = new HashMap<>();

map.put("one", 1);
map.put("two", 2);
```

1. 通过 `keySet().iterator`

    ```java
    Iterator<String> iterator = map.keySet().iterator();
    while(iterator.hasNext()) {
        String key = iterator.next();
        if (key == "two") iterator.remove();
    }
    ```

2. 通过 `entrySet().iterator`

    ```java
    Iterator<Map.Entry<String, Integer>> iterator = map.entrySet().iterator();
    while(iterator.hasNext()) {
        Map.Entry<String, Integer> entry = iterator.next();
        // Also can call entry.getKey() for key
        if (entry.getValue() == 2) iterator.remove();
    }
    ```
