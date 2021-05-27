# Method Overwrite in Java

## Signature

```java
modifier ReturnType method(arguments) throws Exception {
}
```

## Rules

1. Only **non-static** method can be overwritten
2. `ReturnType`:
   1. For primitive or `void`, the overwritten method must be identical
   2. For class, the overwritten method can be either the same class or subclass
3. Exception thrown can be either the same class or subclass
4. `private` method cannot be overwritten
