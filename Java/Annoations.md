# Java Annotations

## Hwo to Define

```java
public @interface MyAnnotation {
}
```

## How to Use

```java
@MyAnnotation
public class SomeClass {
}
```

## Details in Definition of Annotation

```java
@Retention(RetentionPolicy.ClASS)
public @interface MyAnnotation {
}
```

### `@Retention`

`@Retention` annotation tells how long to retain the annotation,
it has enumerate values: `RetentionPolicy.SOURCE`, `RetentionPolicy.CLASS`, `RetentionPolicy.RUNTIME`.

- `RetentionPolicy.SOURCE`

    Annotations are to be discarded by the compiler. The annotations will be  only in the source files, which will not be presented in `.class` byte code.

- `RetentionPolicy.CLASS` <sub>default</sub>
  
    Annotations are to be recorded in the class file by the compiler but need not be retained by the VM at run time.

    This is the default behavior.

    **This policy is generally used to provide metadata for reverse compilers.**

- `RetentionPolicy.RUNTIME`

    Annotations are to be recorded in the class file by the compiler and retained by the VM at run time, so they may be read reflectively.

    As is kept by the _VM_, it is possible to use reflect to get this annotation,
    by using `java.lang.Class#getAnnotations()`.
