# Java Serialization

You can write an object into a stream and writes from somewhere else, or the mechanism can be used to _deep copy_ an object. For example, use

- `FileOutputStream` to write to an file
- `ByteArrayOutputStream` to write to bytes array

To make it more intuitive, here's an example

```java
class SerializationTest {
    void serialize() {
        ArrayList<Integer> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) list.add(i);
        ByteArrayOutputStream os = new ByteArrayOutputStream();

        ObjectOutputStream oos = new ObjectOutputStream(os);

        oos.writeObject(list);

        byte[] buf = os.toByteArray();
        // do something with the buf,
        // pass it, send it to remote

        oos.close();
        os.close();
    }
}
```

## serialVersionUID

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

## Custom Serialization

Sometimes you don't want to default serializing behavior, instead, you want to implements your own serialization. For example, for `ArrayList` it enlarges capacity when needed, and thus leads to empty slots which should not be written to the disk, and that's when the _custom serialization_ comes in.

For any object you want your own custom behavior, just define a method

```java
private void writeObject(java.io.ObjectOutputStream s) {
}
```

Let's look closer at the method, the only changeable token is the name of the argument `s`, and the rest MUST stay exact.

Also, there is a `readObject` method you can implement

```java
private void readObject(java.io.ObjectInputStream s) {}
```

You can find the related code in the constructor of class `java.io.ObjectStreamClass`

```java
writeObjectMethod = getPrivateMethod(cl, "writeObject",
    new Class<?>[] { ObjectOutputStream.class },
    Void.TYPE);
readObjectMethod = getPrivateMethod(cl, "readObject",
    new Class<?>[] { ObjectInputStream.class },
    Void.TYPE);
```

As for `ArrayList`, it is serialized by writing the element one by one

```java
// Write out all elements in the proper order.
for (int i=0; i<size; i++) {
    s.writeObject(elementData[i]);
}
```

:::tip
Actually, the writing process approached by first writing the `ArrayList` instance itself, without `elementData`, which is written later one by one. All the verbosity just ensures not to write empty slots.

```java
// Read in size, and any hidden stuff
s.defaultReadObject();

// Read in capacity
s.readInt(); // ignored

// Write out all elements in the proper order.
for (int i=0; i<size; i++) {
    s.writeObject(elementData[i]);
}
```

:::

while the reading processing is quite similar

```java
Object[] a = elementData;

// Read in all elements in the proper order.
for (int i=0; i<size; i++) {
    a[i] = s.readObject();
}
```

## Appendix

- [Java serialVersionUID 有什么作用？ - 简书](https://www.jianshu.com/p/91fa3d2ac892)
- [Java类中serialVersionUID 作用 是什么?举个例子说明 - kabibo - 博客园](https://www.cnblogs.com/kabi/p/9139228.html)
- [Bloom Filters by Example](https://llimllib.github.io/bloomfilter-tutorial/)
