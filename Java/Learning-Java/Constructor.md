# Java constructor

```java
public class Human {
    private String name;

    public Human() {
        // Constructor 1
    }
    public Human(String name) {
        this(); // Call constructor of current instance.
        this.name = name;
    }
}

public class Male extends Human {
    private boolean hasHair;

    public Male(boolean hasHair, String name) {
        super(name); // Call parent's constructor.
        this.hasHair = hasHair;
    }
}
```

> **CAUTION**: Constructor that calls another constructor(`super` and `this`)
> _MUST_ call it at the first line the body.
