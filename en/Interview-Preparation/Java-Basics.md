# Java Basics

## 包装类

包装类是指基本数据类型的类的形式，对应关系如下

| #   | Primitive Type | Wrapped Class | Memory Size(in bytes) |
| --- | -------------- | ------------- | --------------------- |
| 1   | byte           | Byte          | 1                     |
| 2   | boolean        | Boolean       | **4**                 |
| 3   | short          | Short         | 2                     |
| 4   | char           | Character     | 2                     |
| 5   | int            | Integer       | 4                     |
| 6   | float          | Float         | 4                     |
| 7   | long           | Long          | 8                     |
| 8   | double         | double        | 8                     |

:::tip
其中 `boolean` 比较特殊，理论上可以用 *1 bit* 来存储，实际上却没有规定。

JVM 在编译时会将其转为 `int` 来存储，`1=true`，`0=false`。

而当使用数组`boolean[]` 时，却使用了 `byte[]` 来存储。
:::

自动装箱（Autoboxing）、拆箱（Unboxing）由编译器调用 valueOf 完成。

```java
Integer a = 1;
```

实际上编译器会将源码转成

```java
Integer a = Integer.valueOf(1);
```

> Autoboxing is the automatic conversion that the **Java compiler** makes between the primitive types and their corresponding object wrapper classes.
>
> ...
>
> Thus, **the compiler converts the previous code** to the following at runtime: ...
>
> \- [Autoboxing and Unboxing](https://docs.oracle.com/javase/tutorial/java/data/autoboxing.html)

其中 `Integer` 的缓存池大小比较特殊，可以在启动 JVM 时通过 `-XX:AutoBoxCacheMax=<size>` 来设置，
通过 `java.lang.Integer.IntegerCache.high` 获取该值（*20行*）。
默认大小为 `127`，且当设置大小低于 `127` 时，取 `127`(*24行*)。

**Integer 源码：**

```java {20,24}
/**
 * Cache to support the object identity semantics of autoboxing for values  between
 * -128 and 127 (inclusive) as required by JLS.
 *
 * The cache is initialized on first usage.  The size of the cache
 * may be controlled by the {@code -XX:AutoBoxCacheMax=<size>} option.
 * During VM initialization, java.lang.Integer.IntegerCache.high property
 * may be set and saved in the private system properties in the
 * sun.misc.VM class.
 */
private static class IntegerCache {
    static final int low = -128;
    static final int high;
    static final Integer cache[];

    static {
        // high value may be configured by property
        int h = 127;
        String integerCacheHighPropValue =
            sun.misc.VM.getSavedProperty("java.lang.Integer.IntegerCache.high");
        if (integerCacheHighPropValue != null) {
            try {
                int i = parseInt(integerCacheHighPropValue);
                i = Math.max(i, 127);
                // Maximum array size is Integer.MAX_VALUE
                h = Math.min(i, Integer.MAX_VALUE - (-low) -1);
            } catch( NumberFormatException nfe) {
                // If the property cannot be parsed into an int, ignore it.
            }
        }
        high = h;

        cache = new Integer[(high - low) + 1];
        int j = low;
        for(int k = 0; k < cache.length; k++)
            cache[k] = new Integer(j++);

        // range [-128, 127] must be interned (JLS7 5.1.7)
        assert IntegerCache.high >= 127;
    }

    private IntegerCache() {}
}
```

:::tip
`Long`, `Short` 没有这样的配置项，范围固定在 $[-128, 127]$。
:::

## String

### 常见的字符串操作类

- `String` 不可变，Java 8 使用 `char[]` 存储，Java 9 使用 `byte[]`。

    ```java
    // Java 8
    private final char value[];

    // Java 9
    private final byte value[];
    ```

    :::tip
    `char` 占用2个字节，而一个字符只需占用1个字节，谷使用 `byte[]` 更为合理。
    :::

- `StringBuilder` 非线程安全

    通过以下代码可以测试,

    ```java
    public class TestStringBuilder {

        public static void main(String[] args) {
            StringBuilder sb = new StringBuilder();
            Runnable a = () -> {
                for (int i = 0; i < 1000; i++)
                    sb.append("a");
            };

            Thread t1 = new Thread(a);
            Thread t2 = new Thread(a);
            t1.start();
            t2.start();

            try {
                t1.join();
                t2.join();
                System.out.println("sb length = " + sb.length());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    ```

    以上代码开启两个线程进行操作 `StringBuilder`，最终 `sb.length（）` 结果会出现 3 种情况：

    1. 等于 2000
    2. 小于 2000
    3. 抛出 `java.lang.ArrayIndexOutOfBoundsException` 异常

- `StringBuffer` 线程安全，内部使用 `synchronized` 关键字
  
    ```java
    public synchronized StringBuffer append(CharSequence s) {
        // ...
    }
    ```

### String Pool

字符串字面量(literal strings)存储在字符串常量池中，Java 7以前常量池放在*持久代*，之后放在*堆*中。

可以使用 `String::intern` 将字符串字面量放入常量池，起作用是

1. 该字符串是否存在于常量池，如果存在，直接返回其引用
2. 如果不存在，存入常量池后返回其引用

如，

```java
String s1 = new String("ab" + "c"); // 使用 "ab" + "c" 的方式避免将 "abc" 加入常量池
String s2 = new String("ab" + "c");

System.out.println(s1 == s2); // false

String s3 = s1.intern();
String s4 = s2.intern();

System.out.println(s3 == s4); // true
```

:::tip

- `s1.intern()` 将字符串 `"abc"` 放入常量池，并返回其常量池中的引用，保存在 `s3`。
- `s2.intern()` 在常量池找到 `"abc"`，直接返回其引用。

:::

而下面这种初始化方式，直接将 `"abc"` 放入常量池：

```java
String s0 = "abc";
```

## `switch` 关键字

### `switch` 支持变量类型

1. `byte`
2. `short`
3. `char`
4. `int`
5. `String`, >= Java 7

:::tip

switch 的初衷是变量可以取多个值时，可以方便的判断值的情况。

1. `boolean` 不需要用 `switch`, 用 `if` 或者 `?:` 更方便。
2. `long` 包含的数据 $2^{64}$ 种情况，现阶段不可能达到，`int` 可以达到 $2^{32}$，已经够用了。
3. 不支持 `float` 和 `double`。
4. **支持基本类型的包装类型**。

:::

### `case` 支持的数据类型

1. 与 `switch` 中变量类型相同
2. 常量

    ```java {1, 3}
    final int b = 1;
    switch (1) {
        case b: 
            // do sth.
            break;    
    }
    ```

    :::tip
    当变量为包装类时，`case` 中的数据类型可以不是常量，但不能是 `null`。
    :::

3. 字面量

    ```java {2}
    switch (b) {
        case 1: 
            // do sth.
            break;    
    }
    ```

## 类

### 继承情况下实例的初始化顺序

**结论：**

1. 父类（静态变量、静态语句块）
2. 子类（静态变量、静态语句块）
3. 父类（实例变量、普通语句块）
4. 父类（构造函数）
5. 子类（实例变量、普通语句块）
6. 子类（构造函数）

**测试用例：**

```java

public class TestInitializationOrder {

    public static void main(String[] args) {
        Parent p = new Child();
    }
}


class Parent {
    static {
        System.out.println("parent static block");
    }

    private int field = getInt("parent field");

    {
        System.out.println("parent block");
    }

    public Parent() {
        System.out.println("parent constructor");
    }

    public static int getInt(String msg) {
        System.out.println(msg);
        return 1;
    }
}

class Child extends Parent {
    static {
        System.out.println("child static block");
    }

    private int field = getInt("child field");

    {
        System.out.println("child block");
    }

    public Child() {
        System.out.println("child constructor");
    }
}
```

输出

```
parent static block
parent field static
child field static
child static block
parent field
parent block
parent constructor
child field
child block
child constructor
```

事实上，静态代码块（静态变量）是在类加载的时候执行（赋值）。

:::tip

- 子类构造器有没有显式调用 `super()`或其重载构造器，编译器会自动加上 `super()`调用。
  
    ```java
    class Parent {
        private Parent() {
        }
    }

    class Child extends Parent {
    }

    // 编译时抛出异常：java: Parent() has private access in Parent
    new Child();
    ```

- 静态代码块与静态成员属性平权，执行顺序由在代码中的位置决定。
- 普通代码块与普通成员属性同上。

:::

## Object 通用方法

### hashCode()

- `equals()` 的实例应该具有相同的 `hashCode()`，因此，重写 `equals` 方法是总要重写 `hashCode` 方法。
- `hashCode()` 用于 `HashSet`, `HashMap` 等存储数据时，作为键使用。`HasSet` 底层调用 `HashMap::putVal()` 方法。

Java 使用了 31 作为乘数来计算 `hashCode`，根据 Effective Java 书中描述

> The value 31 was chosen because it is an odd prime. If it were even and the multiplication overflowed, information would be lost, as multiplication by 2 is equivalent to shifting.
> The advantage of using a prime is less clear, but it is traditional.
> A nice property of 31 is that the multiplication can be replaced by a shift and a subtraction for better performance: `31 * i == (i << 5) - i`.
> Modern VMs do this sort of optimization automatically.

总结一下是指：

1. 如果是偶数，可能导致数据丢失，比如乘 2 相当于按左移 1 位：

    $$
    4 \cdot 2 = 1000 << 1 = 0000 = 0
    $$

2. 不知道为啥要素数。
3. 使用 `31` 可以使乘法转变成位移运算，位移总比乘法快：

    $$
    31 * n = (n << 5) - n
    $$

### toString()

`toString()` 会返回类似 `HelloWorld@5cad8086`，其中 `@` 之后的字符串是 `hashCode` 的无符号16进制形式（把 `hashCode` 当做无符号整数转为16机制）。

```java
class A {
    @Override
    public int hashCode() {
        return 1;
    }
}

class B {
    @Override
    public int hashCode() {
        return -1;
    }
}

public class TestToString {
    public static void main(String[] args) {
        System.out.println(new A());
        System.out.println(new B());
    }
}
```

输出

```
A@1
A@ffffffff
```

### `finalize()`

`finalize` 方法是在 GC 检查决定要清理该对象时调用（下一轮再清理，当前只是检查），相当于一个 `beforeGC` 回调。
通常用来清理其他占用的资源，也可以用来让该对象重新被引用，避免被清理。

一个对象只会被调用一次 `finalize()` 方法，当通过该方法让对象再次被启用后，下一轮 GC 检查时，将不再调用该方法。

## 接口

接口的成员属性只能是常量 `final static`。

```java
public interface A {
    // 以下等价于 `final static boolean IS_A = true;`
    boolean IS_A = true;
}
```

## 重写(Override)

注解 `@Override`，让编译器检查方法是否合法地重写方法。

继承情况下重写后的方法调用顺序：

1. this.func(this)
2. super.func(this)
3. this.func(super)
4. super.func(super)

::: tip
先当前参数类型（`this`），再其父类（`super`）。
:::

## 其他

### 1. `private` 属性，在类的静态方法仍能使用

```java
public class Test {
    private int cnt = 1;

    public static void main(String[] args) {
        Test test = new Test();
        System.out.println(test.cnt); // 1
    }
}
```

### 2. 指令重排

指令重排分为三种类型：

1. **编译器优化重排**：编译器在不改变单线程程序语义的情况下， 可以重新安排语句执行顺序。
2. **指令级并行重排**：现代处理器采用了指令级并行技术来同时多条指令。在无*数据依赖*的情况下，处理器可以改变语句对应机器指令的执行顺序。
3. **内存系统重排**：由于处理器使用缓存和读写缓冲区，使得加载和存储操作看上去可能是在乱序执行。

:::tip
数据依赖：如果两个操作访问同一个变量，且这两个操作中有一个为“写”操作，则这两个操作存在数据依赖。
:::

## J.U.C

`java.util.concurrent`

- `FutureTask`
- `BlockingQueue`
- **ForkJoin**: `RecursiveTask`, `ForkJoinPool`

## 线程池

### 线程池类型

- CachedThreadPool
- FixedThreadPool
- SingleThreadPool
- ScheduledThreadPool
- WorkStealingThreadPool

### 线程池创建

#### 通过 `Executors`

底层使用 `AbstractExecutorService` 创建线程池，是对其的在封装，忽略了线程池大小等信息（不可灵活设置）。

```java
ExecutorService executorService = Executors.newSingleThreadExecutor();
```

> 其中 `CachedThreadPool`, `FixedThreadPool`, `SingleThreadPool` 使用 `ThreadPoolExecutor` 创建线程池， ScheduledThreadPool 使用 `ScheduledThreadPoolExecutor`，`WorkStealingThreadPool` 使用 `ForkJoinPool`

#### ThreadPoolExecutor

通过 `ThreadPoolExecutor` 可以设置线程池的线程数、队列大小，而 `Executors` 没有拒绝策略，可能导致 OOM 问题。故 `ThreadPoolExecutor` 使用上更加灵活。

通过 `submit` 和 `execute` 提交任务。其中

- `submit` 接收 `Runnable` 和 `Callable` 任务，返回一个 `FutureTask` 实例
- `execute` 只接收 `Runnable` 实例，无返回值。

调用方式：

```java
ExecutorService executor = new ThreadPoolExecutor();

// Can be either `Callable` or `Runnable`
executor.submit(task);

// Can be Runnable only
executor.execute(task);
```

`ThreadPoolExecutor` 提供了 4 个构造器

```java
ThreadPoolExecutor(int, int, long, TimeUnit, BlockingQueue<Runnable>)
ThreadPoolExecutor(int, int, long, TimeUnit, BlockingQueue<Runnable>, RejectedExecutionHandler)
ThreadPoolExecutor(int, int, long, TimeUnit, BlockingQueue<Runnable>, ThreadFactory)
ThreadPoolExecutor(int, int, long, TimeUnit, BlockingQueue<Runnable>, ThreadFactory, RejectedExecutionHandler)
```

前 4 个参数分别为

- `int corePoolSize`：核心线程池大小
- `int maximumPoolSize`：线程池最大大小
- `long keepAliveTime`：超过核心线程池大小时，超出线程池的线程空闲时，会等待 `keepAliveTime`，如果还没有任务需要执行，便终止该线程，释放资源
- `TimeUnit unit`：`keepAliveTime` 的单位

其余参数

- `BlockingQueue` 用于存储暂时无法执行的线程（因为线程数超过 `maximumPoolSize`）
- `ThreadFactory` 线程工厂，用于将 `Runnable` 封装成 `Thread`

    :::tip
    `Callable` 在提交时也将转为 `Runnable` 实例。

    ```java
    // java.util.concurrent.AbstractExecutorService
    public <T> Future<T> submit(Callable<T> task) {
        if (task == null) throw new NullPointerException();
        RunnableFuture<T> ftask = newTaskFor(task);
        execute(ftask);
        return ftask;
    }

    protected <T> RunnableFuture<T> newTaskFor(Runnable runnable, T value) {
        return new FutureTask<T>(runnable, value);
    }
    ```

    :::

- `RejectExecutionHandler`: 决绝策略，当运行线程达到 `maximumPoolSize` 且 `BlockingQueue` 满时，会调用该策略，决定新任务的去向：异常、忽略 etc.。

### 线程池拒绝策略

内置策略（通过调用 `ThreadPoolExecutor` 内部静态类如 `ThreadPoolExecutor.DiscardOldestPolicy`）

- `CallerRunsPolicy`: 调用者（提交该任务的线程）运行线程
- `AbortPolicy`: 抛出 `RejectedExecutionException` 异常
- `DiscardPolicy`: 抛弃任务
- `DiscardOldestPolicy`: 抛弃最老任务

所有策略都实现了 J.U.C 接口 `RejectedExecutionHandler`

```java
package java.util.concurrent;

public interface RejectedExecutionHandler {
    void rejectedExecution(Runnable r, ThreadPoolExecutor executor);
}
```

*[J.U.C]: java.util.concurrent
