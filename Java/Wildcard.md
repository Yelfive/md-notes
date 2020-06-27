# Wildcards

Consider the problem of writing a routine that prints out all the elements in a collection. Here's how you might write it in an older version of the language (i.e., a pre-5.0 release):

```java
void printCollection(Collection c) {
    Iterator i = c.iterator();
    for (k = 0; k < c.size(); k++) {
        System.out.println(i.next());
    }
}
```

And here is a naive attempt at writing it using generics (and the new `for` loop syntax):

```java
void printCollection(Collection<Object> c) {
    for (Object e : c) {
        System.out.println(e);
    }
}
```

The problem is that this new version is much less useful than the old one. Whereas the old code could be called with any kind of collection as a parameter, the new code only takes `Collection<Object>`, which, as we've just demonstrated, is **not** a supertype of all kinds of collections!

So what **is** the supertype of all kinds of collections? It's written `Collection<?>` (pronounced "collection of unknown"), that is, a collection whose element type matches anything. It's called a **wildcard type** for obvious reasons. We can write:

```java
void printCollection(Collection<?> c) {
    for (Object e : c) {
        System.out.println(e);
    }
}
```

and now, we can call it with any type of collection. Notice that inside `printCollection()`, we can still read elements from `c` and give them type `Object`. This is always safe, since whatever the actual type of the collection, it does contain objects. It isn't safe to add arbitrary objects to it however:

```java
Collection<?> c = new ArrayList<String>();
c.add(new Object()); // Compile time error
```

Since we don't know what the element type of `c` stands for, we cannot add objects to it. The `add()` method takes arguments of type `E`, the element type of the collection. When the actual type parameter is `?`, it stands for some unknown type. Any parameter we pass to `add` would have to be a subtype of this unknown type. Since we don't know what type that is, we cannot pass anything in. The sole exception is `null`, which is a member of every type.

On the other hand, given a `List<?>`, we **can** call `get()` and make use of the result. The result type is an unknown type, but we always know that it is an object. It is therefore safe to assign the result of `get()` to a variable of type `Object` or pass it as a parameter where the type `Object` is expected.

## Bounded Wildcards

Consider a simple drawing application that can draw shapes such as rectangles and circles. To represent these shapes within the program, you could define a class hierarchy such as this:

```java
public abstract class Shape {
    public abstract void draw(Canvas c);
}

public class Circle extends Shape {
    private int x, y, radius;
    public void draw(Canvas c) {
        ...
    }
}

public class Rectangle extends Shape {
    private int x, y, width, height;
    public void draw(Canvas c) {
        ...
    }
}
```

These classes can be drawn on a canvas:

```java
public class Canvas {
    public void draw(Shape s) {
        s.draw(this);
   }
}
```

Any drawing will typically contain a number of shapes. Assuming that they are represented as a list, it would be convenient to have a method in `Canvas` that draws them all:

```java
public void drawAll(List<Shape> shapes) {
    for (Shape s: shapes) {
        s.draw(this);
   }
}
```

Now, the type rules say that `drawAll()` can only be called on lists of exactly `Shape`: it cannot, for instance, be called on a `List<Circle>`. That is unfortunate, since all the method does is read shapes from the list, so it could just as well be called on a `List<Circle>`. What we really want is for the method to accept a list of **any** kind of shape:

```java
public void drawAll(List<? extends Shape> shapes) {
    ...
}
```

There is a small but very important difference here: we have replaced the type `List<Shape>` with `List<? **extends** Shape>`. Now `drawAll()` will accept lists of any subclass of `Shape`, so we can now call it on a `List<Circle>` if we want.

`List<? **extends** Shape>` is an example of a *bounded wildcard*. The `?` stands for an unknown type, just like the wildcards we saw earlier. However, in this case, we know that this unknown type is in fact a subtype of `Shape`. (Note: It could be `Shape` itself, or some subclass; it need not literally extend `Shape`.) We say that `Shape` is the *upper bound* of the wildcard.

There is, as usual, a price to be paid for the flexibility of using wildcards. That price is that it is now illegal to write into `shapes` in the body of the method. For instance, this is not allowed:

```java
public void addRectangle(List<? extends Shape> shapes) {
    // Compile-time error!
    shapes.add(0, new Rectangle());
}
```

You should be able to figure out why the code above is disallowed. The type of the second parameter to `shapes.add()` is `? **extends** Shape`-- an unknown subtype of `Shape`. Since we don't know what type it is, we don't know if it is a supertype of `Rectangle`; it might or might not be such a supertype, so it isn't safe to pass a `Rectangle` there.

Bounded wildcards are just what one needs to handle the example of the DMV passing its data to the census bureau. Our example assumes that the data is represented by mapping from names (represented as strings) to people (represented by reference types such as `Person` or its subtypes, such as `Driver`). `Map<K,V>` is an example of a generic type that takes two type arguments, representing the keys and values of the map.

Again, note the naming convention for formal type parameters--`K` for keys and `V` for values.

```java
public class Census {
    public static void addRegistry(Map<String, ? extends Person> registry) {
}
...

Map<String, Driver> allDrivers = ... ;
Census.addRegistry(allDrivers);
```



## Reference

[Wildcards (The Java™ Tutorials > Bonus > Generics)](https://docs.oracle.com/javase/tutorial/extra/generics/wildcards.html)