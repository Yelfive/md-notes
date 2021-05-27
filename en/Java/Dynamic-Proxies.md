# Dynamic Proxies in Java

There are two types of proxies.

1. Interface based with package `java.lang.reflect`( class `java.lang.reflect.Proxy`).
2. Class based with package `cglib`

## `java.lang.reflect.Proxy`

1. Official package: `java.lang.reflect`.
2. Only interface implementations can be applied.

### Example

```java
package org.example.proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

public class Client {
    public static void main(String[] args) {
        System.out.println("proxy test:");
        Producer targetProducer = new ProducerImpl();
        Producer proxyProducer = (Producer) Proxy.newProxyInstance(Producer.class.getClassLoader(), new Class[]{Producer.class}, new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                float amount = (float) args[0];
                System.out.println("Client paid for " + amount);
                System.out.println("Tax: " + amount * 0.2);
                return method.invoke(targetProducer, amount * 0.8f);
            }
        });

        proxyProducer.sell(1000);
    }
}

```

## `cglib`

1. Third-party package.
2. No interface implementation needed.
3. Class **MUST NOT** be a final class.

### Example

```java
package org.example.cglib;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.MethodInterceptor;

public class Client {
    public static void main(String[] args) {
        System.out.println("cglib test:");
        Producer producerTarget = new Producer();
        Producer cgProducer = (Producer) Enhancer.create(producerTarget.getClass(), (MethodInterceptor) (o, method, objects, methodProxy) -> {
            float amount = (float) objects[0];
            System.out.println("Client paid for " + amount);
            System.out.println("Tax: " + amount * 0.2);
            return method.invoke(producerTarget, amount * 0.8f);
        });
        cgProducer.sell(1000);
    }
}
```
