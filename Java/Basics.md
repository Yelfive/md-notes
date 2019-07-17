# Java Basics

## Variable scope

### 1. Local Variable

Variables inside a brace pair(a block):

```java
{
    int age = 30;
}

age = 31; // undefined
```

### 2. Member Variable

Variable belongs to a class instance, has the lifetime of an instance.

### 3. Static Variable

Variable belongs to a class, and has the lifetime of its class.

```java
public class Hello {
    // static variable
    static int age = 30;
}
```

## Constant

`Java` uses keyword `final` to define a constant.

```java
final String name = "Felix";
```

## Data Type

### Primitive Data Type

#### Integer

Data Type   | Space | Range
---         | ---   | ---
byte        | 1b    |
short       | 2b    |
int         | 4b    |
long        | 8b    |

### Reference Data Type

- class
- interface
- array

## Flow Control

### condition

Condition must be `boolean` or `boolean` expression.

```java
// valid
if (true) {
}

// invalid
if (1) {
}
```

1. `switch...case...` takes string

## Overload

Two methods may have the same method name, as long as the parameters are different.

### Is `overload`:
- different parameters:
    1. number of parameters
    2. type of parameters
    3. different parameter order
- method is compared to the first method defined with the same name

### Not `overload`:

- different return type is not considered a `overload`.
- different parameter name is not considered a `overload`.

```java
class HelloWorld {
    public double sum(int x, float y) {
        return x + y;
    }

    public double sum(float x, int y) {
        return x + y
    }

    // not overload, compile error
    public int sum(int x, float y) {

    }
}
```

## Static Block

Static block executes at class loading-time, even before an object created from this class.

```java
public class HelloWorld {

    // static block
    static {
        System.out.println("I'm here");
    }

    public HelloWorld() {
        System.out.println("I'm constructor");
    }

    /*
     * Output:
     * I'm here
     * I'm constructor
     */
    public static void main(String[] args) {
        HelloWorld a = new HelloWorld();
    }
}
```

## import

```java
// Import a class
import java.sql.Date;
// Import static variable
import static java.lang.Math.PI
```

## Inner classes

### Non-static class

```java
public class Outer {
    protected int age = 0;
    public class Inner {
        public sayAge() {
            System.out.println(age);
        }
    }
}
```

### Static class

```java
public class Outer {
    public static class Inner {
        public Inner() {
            // constructor
        }
    }
}
```

Static `Inner` class is considered as static property of `Outer`, e.g.

```java
new Outer.Inner();
```

### Local inner class

_seldom used_

```java
public class Outer {
    public void callLocally() {
        public class Inner() {
            // definitions go here
        }

        new Inner();
    }
}
```

### Anonymous class

- No constructor

```java
cls = new SomeClass() {
    // class definitions go here
}
```

**f.x.**

```java
this.addWindowListener(new WindowAdapter() {
        @Override
        public void windowClosing(WindowEvent e) {
            System.exit(0);
        }
    }
);
this.addKeyListener(new KeyAdapter() {
        @Override
        public void keyPressed(KeyEvent e) {
            myTank.keyPressed(e);
        }      
        @Override
        public void keyReleased(KeyEvent e) {
            myTank.keyReleased(e);
        }
    }
);
```

## Casting

Consider the following example.

```java
public class Testing {
    public static void main(String[] args) {
        Dog d = new Dog();

        cry(d);
        d.watchDoor();
    }
    static void cry(Animal animal) {
        System.out.println("is dog: " + (animal instanceof Dog)); // is dog: true
        // The `animal` is a dog, however it only has properties and methods of `Animal`
        // If the `Dog.watchDoor` should be called, the type of the variable animal
        // should be converted:
        // Dog d = (Dog) animal
        // d.watchDoor();
        // 
        // the `d` passed in the method `main` is casted into instance of `Animal` inside `cry` by calling `cry(d)`
        animal.shout();
    }
}

class Animal {
    public void shout() {
        System.out.println("This is only animal.");
    }
}

class Dog extends Animal {
    public void shout() {
        System.out.println("Dog says: wang wang");
    }

    public void watchDoor() {
        System.out.println("Dog's watching door");
    }
}

class Cat extends Animal {
    public void shout() {
        System.out.println("Cat says: miao miao");
    }
}
```

## Array

Syntax:

```java
int[] i = null; // recommended
int j[] = null;
```

```java
// array of 2 integers, with default 0
int[] var1 = new int[2];

// define a array of integers
int[] var1 = null;
// fill with values
var1 = new int[3];

// define and fill value into array of integers
// the array of size 3
int[] var1 = {1, 2, 3}
```

### Default values for array

```java
int i[] = new int[2]            // 0
boolean b[] = new boolean[2]    // false
String s[2] = new String[2]     // null
```

## Exception handling

In Java, checked exceptions(every exception except for `RuntimeException`) must be handled:

1. try-catch
2. declared

### 1. try...catch...finally

```java
try {
    // do sth may cause exception
} catch (ExceptionType e) {

} finally {

}
```

### 2. declare `throws`

```java
public class ExceptionTest {
    public void causeException() throws FileNotFoundException {
        FileInputStream("path/to/file");
    }
}
```

## Boxed classes

Convert the basic variable types into objects.

Basic Type  | Corresponding Class
---         | ---
char        | Character
boolean     | Boolean
byte        | Byte
short       | Short
int         | Integer
long        | Long
float       | Float
double      | Double

## Boxing vs. Unboxing

### 1. Boxing

```java
int i = 1;

Integer j = i;
// equivalent to 
Integer j = Integer.valueOf(i);
```

### 2. Unboxing

```java
Integer i = new Integer(1);
int j = i;
// equivalent to
int j = i.intValue();
```

## `String`, `StringBuffer` and `StringBuilder`

- `String`
    
    Constant object, cannot be modified after created.

- `StringBuffer`
    
    Variable object, can be modified after created, thread-safe.

- `StringBuilder`
    
    Variable object, can be modified after created, non-thread-safe, high performance, recommended.

## File path

```java
/*
 * Relative path, to
 * System.getProperty("user.dir")
 * Which is also the root of current project directory.
 */
File f1 = new File("user.log");

// Absolute path
File f2 = new File("/var/www/html/user.log");
```

## Enumerate

```java
enum Week {
    Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
}

enum Month {
    January, February, March, April, May, June,
    July, August, September, October, November, December
}
```

## Generics

Generics takes data type as a placeholder for a class.
It's quite flexible as you can use the same class for different data types. 

**usage**:

```java
List<String> l = new ArrayList<String>();   // <String> declares the element inside list is `String`s
```

When talking about generics, its always about container, a.k.a `Collection`.
Here're the relations of `Collection`s

```txt
                +---------------+                               +---------------+
                | <<interface>> |                               | <<interface>> |
                |  Collection   |                               |      Map      |
                +---------------+                               +---------------+
                |               |                               |               |
                +---------------+                               +---------------+
                 ^             ^                                        ^
                /               \                                       |
+---------------+               +---------------+                       |
| <<interface>> |               | <<interface>> |                       |
|      Set      |               |      List     |                       |
+---------------+               +---------------+                       |
|               |               |               |                       |
+---------------+               +---------------+                       |
        ^                        ^             ^                        |
        |                       /               \                       |
+---------------+     +---------------+   +---------------+     +---------------+
|    HashSet    |     |   ArrayList   |   |   LinkedList  |     |    HashMap    |
+---------------+     +---------------+   +---------------+     +---------------+
|               |     |               |   |               |     |               |
+---------------+     +---------------+   +---------------+     +---------------+
```

### Create your own generic class

```java
class SomeGenerics<DataType> {              // Generics: DataType is a placeholder
    public DataType doSth() {               // Generics: DataType is a placeholder
        return (DataType) childOfObject;    // Generics: DataType is a placeholder
    }

    public void sthElse(DataType dt) {      // Generics: DataType is a placeholder
        // do sth. with dt
    }
}
```

### Interface `List`

- `ArrayList`

    Based on `array`, **fast to get**, slow to `add/remove`.

- `LinkedList`

    Based on linked list, slow to get, **fast to add/remove**

- `Vector`

    Thread-safe version of `ArrayList`.

### Interface `Map`

- `HashMap` Non-thread-safe, fast. `key` or `value` **CAN** be `null`.
- `HashTable` Thread-safe, slow. `key` or `value` **MUST NOT** be `null`.
- `TreeMap` Slow than `HashMap`, used for sorting.

### Interface `Set`

An unordered collection of objects in which duplicate values cannot be stored.

- `HashSet`

    Based on `HashMap`.
- `TreeSet`

    Based on `TreeMap`. it needs the elements to be sorted, so the element object must implements interface `Comparable`. **Used only when need sorting.**

    ```java
    class User implements Comparable<User> {
    
        public int id;
        public String name;

        public User(int id, String name) {
            this.id = id;
            this.name = name;
        }

        public int compareTo(User u) {
            if (this.id > u.id) {
                return 1;
            } else if (this.id == u.id) {
                return 0;
            } else {
                return -1;
            }
        }
    }
    ```

### Collection Iterator

#### 1. Iterating map

1. With key

    ```java
    Iterator<String> iterator = map.iterator();
    while(iterator.hasNext()) {
        String key = iterator.next();
        // do sth.
    } 
    ```
2. With key => value

    ```java
    Iterator<Entry<String, String>> iterator = map.iterator();

    while(iterator.hasNext()) {
         Entry<String, String> entry = iterator.next();
         entry.getKey();
         entry.getValue();
    }
    ```

## Thread

### 1. class `Thread`

```java
class MyThread extends Thread {
    public void run() {
        // do sth here
    }
}

public class Runner {
    public static void main(String[] args) {
        Tread thread = new MyThread();
        thread.start(); // Starts a new thread.
    }
}
```

### 2. interface `Runnable`

```java
class MyRunnable implements Runnable {
    public void run() {
        // do sth. inside thread
    }
}

public class Runner {
    public static void main(String[] args) {
        Thread thread = new Thread(new MyRunnable);
        thread.start();
    }
}
```

### `Thread.yield` vs. `Thread.sleep`

Both are used to block current thread, give up CPU control.

- `Thread.yield` To put current thread into `ready` state.

    ```java
    Thread.yield();
    ```
- `Thread.sleep` To put current thread into `blocked` state, until given time.

    ```java
    Thread.sleep(2000); // in milliseconds
    ```

### `thread.join`

Used to wait until another thread finished.

```java
public class FatherThread implements Runnable {
    public void run() {
        Thread son = new Thread(new SonThread);
        son.start();
        
        try {
            // Wait the son to join the party.
            son.join();
        } catch(InterruptedException e) {
            // sth is wrong
            System.exit(1);
        }

        // Son has joined the thread with his own mission finished.
    }
}

class SonThread implements Runnable {
    public void run() {
        // sth child does
    }
}
```

### Thread priority

```java
int priority;
Thread thread = new MyThread();
thread.setPriority(priority);
```

1. `priority` is from 1-10, default to be 5.
2. `priority` represents the probability, does not exactly mean the thread will be executed starting from the highest priority.

### Thread resource lock

1. synchronized method

    After `synchronized`, every object has one lock. Calls on the `synchronized method` need the thread to have the lock to proceed, otherwise, this thread will have to wait.

    ```java
    public class Bank{
        Account account;
        int amount;
        public void Bank(Account account, int amount) {
            this.account = account;
            this.amount = amount;
        }
        public synchronized void withdraw() {   // synchronized method
        }
    }
    ```

2. synchronized block

    ```java
    public class Bank {
        // blah blah blah...
        public void withdraw() {
            synchronized(this.account) { // lock object: `this.account`
                // Only thread having the lock of object `this.account`
                // can access this block.
                // Others will have to wait.
            }
        }
    }
    ```