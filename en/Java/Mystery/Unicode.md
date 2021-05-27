# Mysterious Unicode Interpretation in Java

```java
public class UnicodeTest {
    public static void main(String[] args) {
        // \u000A System.out.println("Hello world");
    }
}
```

The above code snippet will output

```text
Hello World
```

The reason for this to happen is because Java compiler will first interpret unicode, even when they are in comments, and then compile the result into byte code.

`\u000A` above is the unicode of **LF**, and thus, it is interpreted as

```java

public class UnicodeTest {
    public static void main(String[] args) {
        // (space)
        /* (space) */System.out.println("Hello world");
    }
}
```

which of course outputs 'Hello world'.
