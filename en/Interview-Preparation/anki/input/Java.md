---
css: z_custom.css
---

# Java

## Checked Exception

检查异常，需要 catch 或者 throws 的异常，与之对应的是 Unchecked Exception

Checked Exception 指的是编译器负责检查的异常，这种错误与运行环境无关，如 IOException，无论是什么环境，文件都可能不存在，则编译器要求必须显示处理这种异常。

Unchecked Exception 是指运行时的异常，包括 Error 和 RuntimeException

Throwable 但是 非 Error 或 RuntimeException 的，都被认为是 checked 异常

> For the purposes of compile-time checking of exceptions, `Throwable` and any subclass of `Throwable` that is not also a subclass of either `RuntimeException` or `Error` are regarded as checked exceptions.

## 关键字 volatile 作用

1. 保证内存可见：少量线程、非频繁写，多数线程读的情况
2. 禁止指令重排

`volatile` 在 JVM 会生成一条 `lock` 指令，该指令会引起处理器缓存会写到内存，当其他线程读时，会将本地内存置为无效，然后只接读主存。

## IO: File

包含文件或目录的信息，类似 `stat` 命令。不包含文件内容。

### 构造器

```java
File(String pathname);
File(String parent, String child);
File(File   parent, String child);
```

### 接口

1. `String[] list` 子文件、目录名。在文件上调用，返回 null
2. `File[] listFiles`
3. `boolean renameTo(File dest)` Move if the dest is not exists
4. `boolean createNewFile`: create if not exists
5. `boolean mkdir`: create if not exists
6. `boolean mkdirs` create if not exists with the parents.
7. `boolean delete`: delete file or directory if exists. **目录时，必须为空**

> 以上 `boolean` 返回，`true` 为操作成功

## IO 流（stream）的分类

1. **数据单位：** 字节流（8 bit, `byte`, 图片）、字符流（16 bit, `char`, 文本）
2. **传输方向：** 输入流、输出流
3. **角色：** 节点流（连接端到端，`FileInputStream`）、处理流（装饰器模式，`BufferedInputStream`）

> `char` 和 `short` 都是 16 bit

| 抽象基类 | 字节流       | 字符流 |
| -------- | ------------ | ------ |
| 输入流   | InputStream  | Reader |
| 输出流   | OutputStream | Writer |

## IO 流的体系结构，包含哪些类

| 抽象类型     | 节点流           | 缓冲流（处理流）     |
| ------------ | ---------------- | -------------------- |
| InputStream  | FileInputStream  | BufferedInputStream  |
| OutputStream | FileOutputStream | BufferedOutputStream |
| Reader       | FileReader       | BufferedReader       |
| Writer       | FileWriter       | BufferedWriter       |

## IO: FileReader 能处理图片吗？

不能。FileReader 属于字符流，只能处理文本文件

## IO：为什么 缓冲流 能提高读写速度

缓冲流：`BufferedInputStream`, `BufferedOutputStream`, `BufferedReader`, `BufferedWriter`

`BufferedXxx` 默认都使用了 1024 * 8 = 8192 bytes or chars 的内部缓冲区（`byte[] buf`, `char[] char`），使用 `offset` 和 `count` 进行偏移和计数。每次 `read` 时，判断 `buf` 是否足够，只有当 `buf` 不够时才访问磁盘，每次都从磁盘直接读取 8192 字节。减少磁盘 I/O 次数，从而提速。

如果读取长度 >= 8192，则 `BufferedInputStream` 与 `FileInputStream` 速度相同。

## BufferedOutputStream.flush 的作用是什么

将 `buf` 写入磁盘

## BufferedReader & BufferedWriter 专有方法

### BufferedReader

```java
String readLine(void)
```

读出数据不包含换行符

### BufferedWrite

利用 `readLine` 读取时无换行符，`write` 时则需要手动添加换行符

```java
void newLine(void)
```

## IO：转换流，是做什么的，怎么转换？

转换流是字节与字符之间的转换

- `InputStreamReader`: 字节转字符, read input stream
- `InputStreamWriter`: 字符转字节, write output stream

可以用于文件字符集转换

![picture 1](z_pic_1623081983980_20210608000626_8.png)  

```java
FileInputStream is = new FileInputStream("file.txt");
// 指定输入流字节流，应该被当做什么字符集
// 默认值由 VM 决定（也依赖操作系统等）
InputStreamReader sr = new InputStreamReader(is, "GBK");

FileOutputStream os = new FileOutputStream("out.txt", "UTF-8");
OutputStreamWriter sw = new OutputStreamWriter(os);

char[] buf = new char[10];
while ((len = sr.read(buf)) != -1) {
    sw.write(buf, 0, len);
}

close all streams
```

> - buf 是字符型，is 是字节型
> - `FileWriter extends OutputStreamWriter`, similar to `FileReader`

## 文本字符集 UTF-8/UTF-16/UTF-32 区别

- UTF-8：8 bit 为单位，变长 1-4 bytes，前导 1 表示某字符占用单位数（8bit）(emoji 使用 4bytes，目前最多支持 6 bytes)
- UTF-16： 16 bit 为单位，变长，占用 2 或 4 字节
- UTF-32：固定使用 32 bits = 4bytes 存储，空间换时间

![picture 1](z_pic_1623121448329_20210608110411_28.png)  

## IO: stdin/stdout/err

```java
class System {
    InputStream in
    PrintStream out
    PrintStream err
}
```

> 是字节流

### 重定向

```java
System.setIn(InputStream in)
System.setOut(PrintStream out)
System.setErr(PrintStream err)
```

## IO: 从控制台读入数据的方法

```java
BufferedReader br = new BufferedReader(
    new InputStreamReader(System.in)
);
br.readLine();
```

## IO: 打印流

- `PrintStream`：自动 `flush`，只接受 `OutputStream` 作为构造器输出流
- `PrintWriter`：不自动 `flush`，接受 `Writer` 与 `OutputStream` 作为构造输出流

当两者使用 `OutputStream` 时，行为类似，都使用了 `BufferedWriter`, `OutputStreamWriter`.

```java
new BufferedWriter(
    new OutputStreamWriter(
        outputStream
    )
)
```

## IO: 数据流

- DataInputStream
- DataOutputStream

处理流，用于读写 基本数据类型 和 String 数据，先写先读。

- `writeUTF` 使用 UTF-8 写字符串

## IO: 对象流 (Object Stream)

- ObjectInputStream
- ObjectOutputStream

可以保存基本类型与对象，利用**序列化与反序列化**实现。

```java
ObjectInputStream.readObject();
ObjectInputStream.readByte();
```

## IO: 序列化

必须实现的其中一个接口

- Serializable
- Externalizable

其中 `Externalizable` 定义如下

```java
public interface Externalizable extends java.io.Serializable {
    void writeExternal(ObjectOutput out);
    void readExternal(ObjectInput in);
}
```

而 Serializable 自定序列化与反序列化过程是通过方法

```java
public void writeObject(ObjectOutputStream outputStream);
public void readObject(ObjectInputStream inputStream);
```

> - `Serializable` 使用了反射机制调用 `writeObject`, `readObject` 方法，所以效率更低。
> - `Externalizable` 必须有无参构造器

### serialVersionUID

类的版本号，默认由类的信息计算得到，任何修改都将改变该值。

```java
interface Serializable {
    ANY-ACCESS-MODIFIER static final long serialVersionUID = 42L;
}
```

无法序列化以下修饰的属性

- `static`
- `transient`
- `@Transient`

## IO: 反序列化

当类实现了 `Serializable` 接口时，JVM 会在继承树上寻找第一个 **未** 实现 `Serializable` 的构造器，开始向上执行构造，而不论而后的类是否实现了 `Serializable` 接口。

```java
class Grandparent implements Serializable {}
class Parent extends Grandparent{}
class Child extends Parent implements Serializable {}
```

上例中，当反序列化时，`Child` 本类实例的数据将被恢复，并且 `Parent` 和 `Grandparent` 的构造器将会被依次执行（优先构造父类的原则）。

而当类实现的是 `Externalizable` 接口时，**该类必须有无参构造器**，否则将抛出如下异常

```
java.io.InvalidClassException: cn.exmple.Test; no valid constructor
```

> 当类同时实现了 `Externalizable` 和 `Serializable` 接口时，也必须包含无参构造器。此时延其继承树，父类构造器将被调用。

## IO: 反序列化时，假设类没有设置 serialVersionUID, 而类进行了修改后，如何兼容以前序列化后的类？

当类修改后，`serialVersionUID` 将被重新计算，此时可以将类的 `serialVersionUID` 显式地设置为修改前的值。可以通过两种方式获取该值：

1. 反序列化时的异常信息会包含期望的值
2. 通过 Java 工具命令 `serialver`

```java
serialver package.to.ClassName
```

## IO: 反序列化时，如果类增加了属性，这些属性的默认值是多少？

默认值为空

## IO: 有 readLine 的类有哪些

- BufferedReader

## IO: RandomAccessFile

可以输入也可以输出，随机存取文件。类似 `open`。

```java
RandomAccessFile raf = new RandomAccessFile("file.txt", "rw");

raf.read(buffer);
raf.write(buffer, 0, len);
```

### mode

- r
- rw
- rwd: 读写并同步内容更新
- rws: 读写并同步内容和元数据的更新

### methods

- `seek(long pos)`, similar to `seek` in C

## IO: ByteArray Input & Output Stream

节点流

- `ByteArrayInputStream`：`read()` 获取到 `byte[]`。
- `ByteArrayOutputStream`：可以通过 `toByteArray()` 获取到 `byte[]` 的拷贝。

内部使用 `byte[]` 存储读取到的字节。可以利用这个数组进行对象序列化之后的临时存储、传递。

```java
ByteArrayOutputStream os = new ByteArrayOutputStream();

ObjectOutputStream oos = new ObjectOutputStream(os);

oos.writeObject(someObject);
```

之后再通过 `ByteArrayInputStream` 和 `ObjectInputStream` 进行 `readObject` 操作。

```java
ByteArrayInputStream bais = new ByteArrayInputStream(os.toByteArray());
ObjectInputStream ois = new ObjectInputStream(bais);
ois.readObject();
```

> `readObject` 时可能抛出 `ClassNotFoundException`

## 什么是 BIO ?

在读写数据时，线程阻塞等待 I/O 完成。

## 什么是 AIO ?

JDK 1.7 发布，也称 NIO 2。事件驱动，专门的程序处理 I/O，当某个 I/O 完成时，恢复线程进行处理。

## 什么是 NIO ?

NIO: New IO, 又被称为 Non-Blocking IO，包名为 `java.nio`。

I/O 时，通过轮询查询 IO 是否完成，

### 历史

JDK 1.4 发布 NIO 1 (**NIO**, Non-blocking I/O)， JDK 7 发布 NIO 2 (**AIO**, Asynchronous I/O), NIO 之前的因为总是阻塞，所以称为 **BIO** (Blocking I/O)

### IO vs NIO

- IO 面向流
- NIO 面向<ins>**缓冲区**</ins>，基于<ins>**通道**</ins>，更加高效。

## NIO: Path 是什么

> java.nio.file

`Path` 是 `File` 的升级版，是一个接口，获取实例时，使用 `Paths` 工具类

```java
Path path = Paths.get("file");
// path to file
File file = path.toFile();
// or
Path path = file.toPath();
```

## 枚举类

```java
enum Alphabet {
    A(2, "a"),
    B(1, "b"),
    C(3, "c"),
    ;

    private final int code;
    private final String lower;

    Alphabet(
        int code,
        String lower
    ) {
        this.code = code;
        this.lower = lower;
    }
}
```

## 泛型方法调用

```java
obj.<User>doSth(user);
```

## Copy array

```java
public static native void arraycopy(
    Object src , int srcPos,
    Object dest, int destPos,
    int length
);
```

> `srcPos` and `destPos` are for starting position.

## IO: Scanner

从文件或输入流按格式输入，类似 `scanf`，其获取输入均为 `nextXxx` 方法。另外通过 `hasNextXxx`

应根据方法进行对应输入，否则抛出异常 `java.util.InputMisMatchException`。

Scanner 中 token 表示一个由 delimiter 分割的字符串。delimiter 可以使用 `useDelimiter` 进行修改，默认为 `\p{javaWhitespace}`，代表任何空白符（等价于 `\s+`）。

### APIs

- `String next()`: 获取下一个 token
- `String nextLine()`: 获取该行剩下的部分，不包含换行符
- `Scanner useDelimiter(Pattern pattern)`: 设置使用的分隔符，正则表达式
- `Scanner useDelimiter(String pattern)`: 调用时 `pattern` 转为正则表达式

```java
Scanner scan = new Scanner(System.in);

scan.nextInt(); // 
scan.next();    // String
scan.nextLine();
```

## 网络编程 Server

```java
import java.net.ServerSocket;
import java.net.Socket;

serverSocket = new ServerSocket(8090);
while (true) {
    Socket accept = serverSocket.accept();
    new Thread(() -> {
        accept.getInputStream();
        accept.getOutputStream();
        accept.close();
    }).start();
}
```

## 网络编程 Client

```java
import java.net.Socket;

InetAddress localhost = InetAddress.getByName("localhost");
try (
        Socket socket = new Socket(localhost, 8090);
        OutputStream outputStream = socket.getOutputStream();
) {
    outputStream.write("English 中文".getBytes(StandardCharsets.UTF_8));
}
```

## 网络编程 Socket 是什么？

一个 socket 代表网络通信的一个端点。

- getOutputStream
- getInputStream



## A 与 a 的 ASCII 码

- A: 65
- a: 97

## 数据类型转换

### char[] <-> String

```java
// char[] chars
String str = String.valueOf(chars);
chars = str.toCharArray();
```

### collection to another

collection 类都实现了通过构造器，转为其他类型的容器。

```java
CONSTRUCTOR(Collection<? extends E> c) {
	...
}
```

所以可以互相转换

```java
// Set<String> set
List<String> list = new ArrayList<>(set);
```



### collection -> array

所有集合都实现了 `Colelction.toArray(T[] arr)` 方法，该方法将集合转为数组并放入 `arr` 中， 然后返回剩余集合元素

```java
// Set<String> set;
String[] arr = set.toArray(new String[0]);
```

> `toArray(void)` 返回 `Object` 数组。

### array -> collection

首先转成 `List`，再利用容器间的相互转换。

```java
// String[] arr
List<String> list = Arrays.asList(arr);
Set<String> set = new HashSet<>(list);
```

## StringBuilder.delete 有哪些？

```java
// start, inclusive
// end, exclusive
delete(start, end);

deleteCharAt(offset);
```

## Arrays.sort 能不能自定义基本数据类型的排序？

不能，因为泛型不能用于基本数据类型。

```java
public static void sort(short[] a, int fromIndex, int toIndex);

public static <T> void sort(T[] a, Comparator<? super T> c);
```

## Java 中局部变量与类/对象变量的默认值

1. 局部变量：没有默认值
2. 类/对象：默认为“空“

| type                     | value |
| ------------------------ | ----- |
| byte/short/char/int/long | 0     |
| float/double             | 0.0   |
| boolean                  | false |

## Java 中的隐含展开是什么意思

隐式放大、显式缩小

```java
int i = 1;
long l = i;
float f = l;
double d = f;
```

## 什么是多态

多态是指对象有多种形态，即一个对象可以看做是它本身，也可以看做是它的父类的实例。声明的数据类型可以使用其子类实例代替，此时声明的类型是真实类型的多态形式

![image-20210612072953975](image-20210612072953975.png)

**例子：**

```java
// Dog implements Animal
// Cat implements Animal
Animal a;
Dog d = new Dog();
Cat a = new Cat();
a = d; // a 是 d 的多态形式
a = c; // a 是 c 的多态形式
```

此时 `a` 可以代表任何 `Animal` 的子类实例。

```java
// a can be any instance of sub class of A
public void hug(Animal a);
...
hug(new Dog);
hug(new Cat);
```

## 为什么 Java 不支持多重继承

因为多重继承有致命方块问题。

![image-20210612074252348](image-20210612074252348.png)

## Java 构造器能否继承？

不能。如果子类没有构造器，编译器会自动加上无参构造器；如果子类有构造器，则子类构造器有两种情况

1. 调用了 `super()` 或 `this()`，则调用必须在第一行
2. 否则，编译器会自动在构造器第一行添加无参构造器 `super()`

也就是，**父类总在子类之前构造完成**，保证父类的完整性（不会出现只实例化一半的情形）。

## javax 下的包是什么？

`javax` 为 Java 的标准扩展，Java standard eXtension。由于历史原因，从 JDK 1.2 开始，将新的标准库放入 `javax` 包下。

## abstract 类有没有构造器？

`abstract` 类与普通类相同，也有构造器。

## 创建类的实例有几种方法？

3 种。

1. new
2. serializable
3. reflection: newInstance

## 静态 final 变量是在什么时候初始化？

1. 声明时
2. 静态代码块中

## final 非静态变量能出现在哪些地方？

final 修饰的变量表示一旦初始化，便不能修改

1. 实例变量
2. 局部变量
3. **方法参数**

## auto boxing and unboxing 由谁完成？

编译器

## 字符串格式化时，模板中 '&lt;' 表示什么？

表示使用上一个参数。

```java
String.format("%d %<d", 1)
```

上例中模板参数只有一个，值为 `1`。第二个 `%<d` 便使用了前一个占位的参数。

## 日期的获取与计算

1. 日期获取：`Date`
2. 日期计算：`Canlendar`

```java
// return java.util.GregorianCanlender
Canlendar.getInstance();
```

## try...catch...finally 中的 return 规则

无论 `try...catch` 是否 `return`，都会执行 `finally`，如果 `finally` 同样执行了 `return`， 则以后则为准。

## 怎么理解类与对象的锁？

每一个类（被加载后）或者对象都有一把锁，默认情况下锁为打开状态，任何线程都能访问。当给对象、类加锁时，则其他线程无法访问

## 泛型之间是否有继承关系？

没有。例如

```java
class Animal {}
class Dog extends Animal {}
class Cat extends Animal {}
```

`ArrayList<Dog>` 与 `ArrayList<Animal>` 没有关系

```java
public void takeAnimal(ArrayList<Animal> animals);
// Cannot be called with dogs
ArrayList<Dog> dogs = new ArrayList<>();
// Compile error
takeAnimal(dogs);
```

## 线程的状态及转移条件？

Java 中线程可以分为 6 中状态

1. **New，新建**：调用 `new Thread` 之后 ， `start()` 之前。
2. **Runable，可运行**：`start()` 之后进入，包含了运行和就绪两种状态，Java 规范没有对其做区分。
3. **Blocked，阻塞**：为了等待锁而进入 **被动** 睡眠。
4. **Waiting，等待**：**主动** 进入睡眠，等待信号。
5. **Timed Wating，计时等待**：主动进入睡眠，等待超时或者信号。
6. **Terminated，终止**：`run` 退出或由于异常而意外退出。

![image-20210613210815267](image-20210613210815267.png)

## 什么是 Class 类？

`Class` 类包含了所有 Java 类型的信息。每一个 Java 类型都与一个 `Class` 实例对应，包括基本数据类型。三种实例获取方式

```java
Employee e;
Class c1, c2, c3, c4;

// 方法一：通过实例获取
c1 = e.getClass();
// 方法二：通过全类名
c2 = Class.forName("package.to.ClassName");
// 方法三：通过类型
c3 = ClassName.class;
c4 = int.class
```

> 特别注意：基本数据类型也对应 `Class` 实例。

## 术语：参数

- Local Variables
- Formal Method Parameters
- Exception Handler Parameters

## 常量会触发类加载吗？

不会。

常量在编译时通过 *传播优化*，将常量值存储到调用类的常量池中，所以在运行时，调用类与被调用的类已经没有关系了。

例如

```java
class ConstClass {
  public final static int TYPE = 1;
}

class Caller {
  public void go() {
    int type = ConstClass.TYPE;
  }
}

// After being compiled
class Class {
  public void go() {
    int type = 1;
	}
}
```

## 描述一下类的加载过程 todo

![](anki-Thread-class-lifecycle.svg)

1. Loading：加载
2. Verification：验证
3. Preparation: 准备
4. Resolution: 解析
5. Initialization: 初始化
6. Using: 使用
7. Unloading: 卸载

### 1. 加载

1. 获取定义类的字节码字节流
2. 将字节流表示的静态存储结构转化为方法区的 runtime 数据结构：静态变量、静态代码块、常量池
3. 在堆中生成对应的 Class 对象

### 2. 验证

确保 Class 文件的字节流中包含的信息符合 JVM 要求，并且安全。

### 3. 准备

## 数组是对象，那它属于哪个类，父类是谁？

数组是由字节码指令 `anewarray` 直接创建，父类为 `Object`，类名为 `[Lxxx`，是一个非法的用户代码名称。

## 对象创建的过程

