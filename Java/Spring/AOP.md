# AOP in Spring

> AOP: Aspect Oriented Programming

Spring uses dynamic proxy to implement AOP, it adds some extra actions to methods of a bean. There are general two ways to apply this in practice: `java.lang.reflect.Proxy` and `cglib`.

By default, when a bean implements an interface, JDK will be used, otherwise `cglib` is used. There are some issues when using `cglib` ([8.6 Proxying mechanisms](https://docs.spring.io/spring/docs/3.0.0.M3/reference/html/ch08s06.html)) :

> - final methods cannot be advised, as they cannot be overridden.
> - You will need the CGLIB 2 binaries on your classpath, whereas dynamic proxies are available with the JDK. Spring will automatically warn you when it needs CGLIB and the CGLIB library classes are not found on the classpath.
> - The constructor of your proxied object will be called twice. This is a natural consequence of the CGLIB proxy model whereby a subclass is generated for each proxied object. For each proxied instance, two objects are created: the actual proxied object and an instance of the subclass that implements the advice. This behavior is not exhibited when using JDK proxies. Usually, calling the constructor of the proxied type twice, is not an issue, as there are usually only assignments taking place and no real logic is implemented in the constructor.

## Terminology

| Term         | Chinese   | Description                                                                                                                                      | In Spring                                                                                                                                                                                                            |
| ------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Joinpoint    | 连接点    | A point of the execution of a program, generally methods of a class.                                                                             | All the pointcut-able method, the methods of bean                                                                                                                                                                    |
| Pointcut     | 接入点    | The `joinpoint`s with `advice`.                                                                                                                  | The methods that actually have proxies or are enhanced(some may be excluded from enhancement).                                                                                                                       |
| Advice       | 通知/增强 | The enhancement at the `pointcut`.                                                                                                               | The action to take after `joinpoint` is intercepted. Categories: <br/>&emsp;1. Before(前置)<br/>&emsp;2. After Returning(后置)<br/>&emsp;3. After Throwing(异常)<br/>&emsp;4. After (最终)<br/>&emsp;5. Around(环绕) |
| Introduction | 引介      | A special advice, adding some fields/methods to a class without modifying the source code.                                                       | _not supported in spring ?_                                                                                                                                                                                          |
| Target       | 目标      | The object that got delegated                                                                                                                    | A bean that needs to be enhanced.                                                                                                                                                                                    |
| Proxy        | 代理      | The object that serves as enhanced version of `Target`                                                                                           | An object that is enhanced based on the target bean                                                                                                                                                                  |
| Aspect       | 切面      | The conjunction of `pointcut` and `advice`(or `introduction`)                                                                                    | A class of `@Pointcut` and `advice`s.                                                                                                                                                                                |
| Weaving      | 织入      | The procedure of applying `Aspect` to the target.`Spring` uses dynamic proxy to weave, and AspectJ uses compiling-time and loading-time to weave | The procedure of writing advice.                                                                                                                                                                                     |

## AOP lifecycle in spring

```java
try {
    before()
    targetMethodCall()
    afterReturning()
} catch (Throwable t) {
    afterThrowing()
} finally {
    after();
}
```

> **CAUTION** When using `XML-based` and `annotation-based` implementation in `Spring`, the lifecycle is different. With `annotation-based` , `after()` is always called after `targetMethodCall()` and before `afterReturning()` or `afterThrowing()`:
>
> ```txt
> XML                                 Annotation
>
> Before                              Before
> After Returning/Throwing            After
> After                               After Returning/Throwing
> ```
>

## How to configure Spring to use AOP

### With XML

Schema:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd  http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <aop:config>
        <!-- Global pointcut -->
        <aop:pointcut id="pt1" expression=""/>
        <aop:aspect id="" ref="">
            <!-- Aspect pointcut -->
            <aop:pointcut id="pt2" expression=""/>
            <!-- ******* -->
            <!-- Advices -->
            <!-- ******* -->
            <aop:before method="" pointcut-ref="pt1"/>
            <aop:after-returning method="" pointcut-ref="pt1"/>
            <aop:after-throwing method="" pointcut-ref="pt1"/>
            <aop:after-after method="" pointcut-ref="pt1"/>
            <aop:around method="" pointcut-ref="pt1"/>
        </aop:aspect>
    </aop:config>
</beans>
```

#### `<aop:config>`

properties

- `proxy-target-class="false"` default to be false, true to indicate using `CGLIB` instead of JDK proxy.

#### `<aop:pointcut>`

To define a reusable pointcut.

- For global `pointcut`, it must be defined before any reference.
- For aspect `pointcut`, it can be anywhere.

##### properties

- `id`
- `expression`

    pointcut expression

#### `<aop:aspect>`

Defines an aspect, a proxy class.

##### aop:aspect properties

- `id` id of the aspect.
- `ref` id referenced to a bean.

#### Advices `<aop:xxx>`

##### aop:xxx properties

- `method`

    The method of `xxx`, stage of lifecycle, advice.

- `pointcut`

    The pointcut expression.

- `pointcut-ref`

    Id of previously defined pointcut via `<aop:pointcut>`.

### With annotation

To enable annotation, there're also two ways to accomplish this: `XML` and `annotation`

#### Use `XML` to enable it

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context.xsd">
    <!-- enable aspect -->
    <aop:aspectj-autoproxy proxy-target-class="false"></aop:aspectj-autoproxy>
</beans>
```

#### Use `annotation` to enable it

```java
@EnableAspectJAutoProxy
public class ApplicationConfig {
}
```

##### properties of `@EnableAspectJAutoProxy`

- `proxyTargetClass = false` Indicate whether subclass-based (CGLIB) proxies are to be created as opposed to standard Java interface-based proxies. The default is false.

#### Example of annotation aspect

```java
import org.aspectj.lang.annotation.*;

@Aspect
@Component
public class Logging {
    @Pointcut("@execution(* *..*.*(..))")
    public void pointcut() { /* empty body */}

    // value = "pointcut" refers to the method with annotation `@Pointcut`.
    @Before("pointcut")
    public void before(JoinPoint jp) {}

    @AfterReturning
    public void afterReturning(JoinPoint jp) {}

    @AfterThrowing
    public void afterThrowing(JoinPoint jp) {}

    @After
    public void after(JoinPoint jp) {}

    @Around
    public Object around(ProceedingJoinPoint pjp) {
        // `Around` advice must return Object,
        // to allow the target's value got returned.
    }
}
```

#### `@Before`

#### `@AfterReturning`

#### `@AfterThrowing`

#### `@After`

#### `@Around`

## Pointcut expression

- execution
- annotation
- any other?

Example:

```text
public void full.package.path.ClassName.MethodName(argList);
```

In the above example, access modifier, can be omitted:

```text
void full.package.path.ClassName.MethodName(argList);
```

### Wildcard

- `*`

    Any package , any return type or any but required method argument.

- `..`

    Any child packages of current package, or argument list. Similar to `.*` of regular expression.

    > **This wildcard does not refer to classes and methods**. For example, to represent all methods of all packages, the expression should be `*..*.*()`, in which the '`*`s' mean respectively `all top packages`, `all classes`, `all methods`.

### Multiple `JoinPoint`s

_AspectJ_ supports multiple join points, separated by `||` operator.

```java
import org.aspectj.lang.annotation.Pointcut;

@Pointcut("@annotation(A) || @annotation(B)")
public void joinPoint() {/* Empty Body */}
```

### More examples

#### Matches any `joinpoint`

```text
* *..*.*(..)
```

#### Generally used expression

```text
* org.example.services.impl.*(..)
```

The above expression means that, this aspect should be apply to any method with arbitrary arguments with any type of return value.
