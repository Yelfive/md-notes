# Spring Bean



## Annotations

- @Bean
  - Method level annotation(used with `@Configuration` annotation on its class ), to add a class into `ApplicationContext`.
- @Component
  - Class level annotation, to add a class into `ApplicationContext`.
- @Service
  - A special `@Component`.
- @Repository
  - A special `@Component`.



Spring `bean` has the following `scope`, to determine the lifecycle of a bean.

- `singleton`, with lifecycle same as IoC container
- `prototype`, for multiple instances. It creates when the bean is fetched, and destroyed by Java GC
- `request`, for a request of web application
- `session`, for session of a web application
- `global-session`, when using clusters, a session will be considered among all clusters, and `global-session`  means the session among all clusters.

