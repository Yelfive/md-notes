# IoC and DI of Spring

- IoC

  **I**nverse **o**f **C**ontrol

- DI

  **D**ependency **I**njection

## IoC

Decrease the level of coupling

## DI

When one class instance want to use instance of another class,  **Spring** maintains the dependency relationship between those instances, and gives one to another.

### There are generally three categories of DI in spring

1. Primitive types & String
2. Beans
3. Complicated type/Collections

#### There area three **injection ways**

1. Constructor
2. Setter

    **Annotation based example**

    ```java
    @Component
    class A {
        private B b;
        @Autowired
        private setB(B b) {
            this.b = b;
        }
    }
    ```

    **XML based example**

    ```xml
    <bean id="a" class="org.example.A">
        <property name="b" value="id of bean b"/>
    </bean>
    ```

3. Annotation

## For XML-based IoC and DI

```xml
<bean id="" class="fully.qualified.class" scope="" init-method="" destroy-method="">
    <!-- For primitive types and Strings -->
    <property name="" value=""></property>
    <!-- For bean values -->
    <property name="" ref=""></property>
    <!-- For collections and maps -->
    <property name="" >
        <!-- Collection types -->
        <set></set>
        <list></list>
        <array></array>
        <!-- Map types -->
        <map></map>
        <props></props>
    </property>
</bean>
<bean id="" factory-bean="id of factory bean" factory-method=""></bean>
```

## Annotation-based IoC and DI

Before you using annotations, you should configure to tell _Spring_ that you're going to use annotations:

```xml
<!-- org.example is the base where the Spring should scan for components from -->
<context:component-scan base-package="org.example"/>
```

Annotation can be categorized into 4 categories:

1. To create instance

    Similar to `<bean>` tag. Available annotations:

   1. `@Component` general bean declaration
   2. `@Controller` used in representation layer
   3. `@Service` used in service layer
   4. `@Repository` used in persistence layer

        > `@Controller`, `@Service`, `@Repository` are the same as `@Component` when comes to bean declaration

   5. `@Bean` tag to be used at method level, and must be used with conjunction with `@Configuration`.

        ```java
        import javax.sql.DataSource;
        import java.beans.PropertyVetoException;

        @Configuration
        class {
            // This bean will first look for bean with `DataSource` in application container.
            // If not found, it will be delayed
            @Bean
            public QueryRunner queryRunner(DataSource dataSource) {
                return new QueryRunner(dataSource);
            }

            @Bean
            public DataSource dataSource() {
                ComboPooledDataSource ds = new ComboPooledDataSource();
                ds.setDriverClass(Driver.class.getName());
                ds.setJdbcUrl("jdbc:mysql://localhost/dbname");
                ds.setUser("user");
                ds.setPassword("pass");
                return ds;
            }
        }
        ```

2. To inject data

    Similar to `<property>` tag. Available annotations:

    1. `@Autowired`

        Inject bean based on property type.

        ```java
        public class A {
            @Autowired
            private B b;
        }
        ```

        Spring context will first try finding the type that matches the type of declared property from the container, and there three conditions:

        2.1.1. Find a single instance that matches the type, return it.
        2.1.2. Find more than one instances that match the type, return the bean with exact id as the declared property name.
        2.1.3. No instance found, or more than one instances found and the property name is not same as any of the bean ids, throw an exception.

        ![image-20200629105524117](./images/IoC-DI/image-20200629105524117.png)

    2. `@Qualifier`

       Cannot be used alone, but with `@Autowired`. Used to specify the id of bean to inject with.

    3. `@Resource`

       Inject values based on bean id.

    4. `@Value`

       Inject primitive values

       **Examples:**

       ```java
       interface B {}
       @Component
       class B1 implements B {}
       @Component
       class B2 implements B {}

       class C {
           @Autowired
           private B b; // throw exception

           @Autowired
           private B b1; // valid expression and gets instance of class B1

           @Autowired
           @Qualifier("b1") // use bean id
           private B b;	 // gets instance of class B1

           @Resource(name = "b1")
           private B b;

           @Value("SpEL")
           private String str;
       }
       ```

   > **Collections cannot be injected by annotation, only by XML-based**

3. To manipulate the scope

   `@Scope` , similar to `scope` property of tag `<bean>`

   - singleton
   - prototype

4. Lifecycle related

   Manipulating the lifecycle of a bean

   1. `@PostConstruct` similar to `init-method` of `<bean>` tag
   2. `@PreDestroy` similar to `destroy-method` of `<bean>` tag

   **Example**:

   ```java
   public class A {
       @PostConstruct
       public void init() {}
       @PreDestroy
       public void destroy() {}
   }
   ```
