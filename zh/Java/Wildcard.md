# 泛型-通配符（Wildcard in generic）

通配符可以分为三种类型

1. 子类限定 (subtype bound)
2. 父类限定 (supertype bound)
3. 无定界通配符

## 1. 子类限定

```java
<? extends Comparable>
```

限定为指定类型或其子类。

```java
class Pair<T> {
    T first;
    T second
    T getFirst() {
        return first;
    }
    void setFirst(T newValue) {
        first = newValue;
    }
}
```

## 2. 父类限定

```java
<? super User>
```

限定只能是给定类型或**其父类型**，与子类限定符刚好相反。方法调用也相反，可以调用 setField 方法，无法调用 getField 方法

## 3. 无定界通配符

```java
<?>
```

## 通配符的捕获


