# Java Serialization

```java
package java.io;

interface Serializable {
    ANY-ACCESS-MODIFIER static final long serialVersionUID = 42L;
}
```

When `Java` serializing or deserializing an object, it will check the `serialVersionUID` if they match.
If not, when deserializing this object from _stream_, it indicates that the classes on both sides are different, thus cannot be deserialized.

Say we have a class on server **A**:

```java
class Passport implements Serializable {
    private static final long serialVersionUID = 1L;
}
```

and on server **B** we have this

```java
class Passport implements Serializable {
    private static final long serialVersionUID = 2L;
}
```

They represents two entirely different classes, even if they have everything else identical.

So when **server A** passes a serialized object from class `Passport`, and it cannot be deserialized on **server B**, because the `Passport` classes have different `serialVersionUID`, and instead, a `java.io.InvalidClassException` will be thrown.

## Appendix

- [Java serialVersionUID 有什么作用？ - 简书](https://www.jianshu.com/p/91fa3d2ac892)
- [Java类中serialVersionUID 作用 是什么?举个例子说明 - kabibo - 博客园](https://www.cnblogs.com/kabi/p/9139228.html)