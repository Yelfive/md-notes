# Get Started with Spring

A Spring application must have configuration(beans, configurations, etc), and there are two ways to configure a Spring application: **annotation** and **XML**.

## XML based

### Template

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">
</beans>
```

```java
package org.example.test;

import org.example.domain.Account;
import org.example.service.impl.AccountServiceImpl;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.List;

public class AccountServiceTest {
    @Test
    public void testFindAll() {
        ApplicationContext ac = new ClassPathXmlApplicationContext("bean.xml"); // The XML configuration file under directory: resources
        AccountServiceImpl accountService = ac.getBean("accountService", AccountServiceImpl.class);
        List<Account> accounts = accountService.findAllAccounts();
        accounts.forEach(System.out::println);
    }
}

```

## Annotation based

```java
package org.example.test;

import org.example.domain.Account;
import org.example.service.impl.AccountServiceImpl;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import java.util.List;

public class AccountServiceTest {
    @Test
    public void testFindAll() {
        ApplicationContext ac = new AnnotationConfigApplicationContext("org.example"); // Specify the package base to scan from
        AccountServiceImpl accountService = ac.getBean("accountService", AccountServiceImpl.class);
        List<Account> accounts = accountService.findAllAccounts();
        accounts.forEach(System.out::println);
    }
}
```

And there's another way to init `AnnotationConfigApplicationContext` by specifying a class with `@ComponentScan` annotated.

```java
import org.example.config.SpringApplicationConfig;

// By specifying Class<?>, the constructor arguments can be variable,
// and they are configuration classes.
//
// At least one of them must has `@ComponentScan`,
// or else Spring won't be able to know where the reset of the components are.
ApplicationContext ac = new AnnotationConfigApplicationContext(SpringApplicationConfig.class);
```

```java
package org.example.config;

@Configuration
@ComponentScan
public class SpringApplicationConfig {
}
```

## Unit Test

Spring did some work on top of `JUnit`, JUnit is a universal Java test package,
and by default, it does not know which framework we are using.

Considering this, Spring add auto configure feature to JUnit and put it into package `org.springframework.test`.

### Maven package dependency

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-test</artifactId>
    <version>5.1.9.RELEASE</version>
</dependency>
```

### Annotations

- `@org.junit.runner.RunWith` Specify with runner to use.
- `@org.springframework.test.context.ContextConfiguration` Specify which configuration type, XML or annotation, is used and where the XML location is or which is the main configuration class.

### Class

- `org.springframework.test.context.junit4.SpringJUnit4ClassRunner`

### Examples

```java
package org.example.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
// @ContextConfiguration(locations = "classpath:bean.xml")
@ContextConfiguration(classes = Beans.class)
public class AccountServiceTest {
    @Autowired
    IAccountService accountService;

    @Test
    public void testFindAll() {
        List<Account> accounts = accountService.findAllAccounts();
        accounts.forEach(System.out::println);
    }
}
```