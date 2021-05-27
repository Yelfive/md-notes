# Spring

## IoC

把对象实例化的过程交给外部（框架），依赖解耦

## DI

在 IoC 的基础上，将解耦的依赖统一管理

## AOP

### AOP Terminology

1. advice 增强、通知
2. joinpoint 连接点，可以用于增强的方法
3. pointcut 实际上使用了增强的方法
4. introduction 动态添加的字段或方法
5. target
6. proxy
7. weaving 织入，增强（advice）的过程
8. aspect

## Spring Bean Scope

1. singleton, 始终唯一，**默认作用域**
2. prototype, 每次获取一个单独的
3. request, HTTP request 唯一
4. session, web session 唯一
5. global-session, discarded in v5, portlet web 应用中使用

## @Bean vs @Component

1. `@Component` 只能作用于自定义**类**，需要 `@ComponentScan` 配置扫描路径
2. `@Bean` 只能作用于**方法**，适用于三方库 bean 的实例化。

## bean 线程安全

Bean 不是 prototype 的情况，一个实例可能被多个线程并行使用，导致字段出现 race condition

## @RestController vs @Controller

`@RestController` = `@Controller` + `@ResponseBody`

`@ResponseBody`: 方法的返回用于填充 HTTP response body
