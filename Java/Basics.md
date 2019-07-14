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

## Access Modifiers

Name        | Class | Package   | Subclass  | Subclass  | Public
---         | ---   | ---       | ---       | ---       | ---
private     | 
(Not Set)   | 