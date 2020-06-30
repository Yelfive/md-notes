# Annotations

## `@ComponentScan`

Specify the package bash path to scan component for.

```java
@ComponentScan("org.example")
public class Config {
}
```

## `@Configuration`

Specify that this class is a configuration class, and it has method(s) that creates beans. When spring scans for components, it will create these beans and store them into application container.

## `@Import`

Import other classes as configuration class, same as adding `@Configuration` to other classes.

This annotation can accept multiple classes.

```java
@Import(OtherConfig.class)
public class ApplicationConfig {
}
```

## `@PropertySource`

```java
@PropertySource("classpath:jdbc.properties")
public class ApplicationConfig {
}
```

Next: [IoC DI](./IoC-DI.md)