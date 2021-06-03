---
recommend: true
---

# Java Lambda

Lambda provides a concise way to make an instance from a **`interface`**.

Three are constraints and rules:

1. **The interface MUST has only one method.**
2. The parameter type can be omitted.
3. The return value can be omitted when used without `{}` to wrap the method body.
4. The variables declared outside the lambda expression **MUST NOT** be modified inside or after lambda.

    ```java
    public static void main(String[] args) {
        String a = "a";
        String b = "b";
        callLambda(x -> {
            a = "b"; // compile error
            b = "c"; // compile error
        });

        b = "c";
    }
    ```

## Example

```java
package org.example.lambda;

public interface LambdaInterface {
    String doSth();
}
```

```java
package org.example.lambda;

public class LambdaTest {
    public static void main(String[] args) {
        callLambda(() -> "Not doing anything");
        callLambda(() -> "aaa");

        LambdaInterface x = () -> "lambda";
        callLambda(x);
    }

    public static void callLambda(LambdaInterface c) {
        System.out.println("Returned value: " + c.doSth());
    }
}
```

The call `LambdaInterface x = () -> "lambda"` is equivalent to the following code:

```java
public class LambdaImpl implements LambdaInterface {
    @Override
    public String doSth() {
        return "lambda";
    }
}

LambadaInterface x = new LambdaImpl();
```

## Further more

If the methods of two interfaces have the same number of arguments,
it is possible to distinguish the two interfaces either by specify the type of lambda or the type of arguments.

### 1. Specifying the type of lambda

```java
A a = (A) () -> {};
B b = (b) () -> {};
```

### 2. Specifying the type of arguments

```java
A a = (Integer x) -> {};
B b = (Float x) -> {};
```
