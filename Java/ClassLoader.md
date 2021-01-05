# Java ClassLoader

Java ClassLoader defines the way to load a class from **byte code**, so when rewriting a class loader, first you should compile the target source code from `.java` into `.class`.

And then in the class loader, you should specify how `.class` file is read, parsed, with or without decryption, and finally finish with a `defineClass` call.

To summarize:

1. Code your `.java` source.
2. Compile `.java` into `.class`
3. Write your `ClassLoader` implements to
   1. Override the method(s) `findClass/loadClass`
   2. Read the `.class` byte code by given class name(eg. `com.example.utils.A`)
   3. Parse the file, decrypt the byte code if encrypted
   4. Call `defineClass`

## Here's an example of how you accomplish the procedure

### 1. Write your source code

### 2. Compile

```bash
javac A.java B.java
```

### 3. Implements your custom `ClassLoader`

### 4. Testing

## References

- [1] [如何实现Java类隔离加载？](https://mp.weixin.qq.com/s?__biz=MzIzOTU0NTQ0MA==&mid=2247501603&idx=1&sn=1bf91e8b509743815095e3f89a91e549&chksm=e92afa2cde5d733ae1d9200c01cc5b819346a66a0b65454969d122fb1aeb85de750d26d08205&scene=90&xtrack=1&sessionid=1609289919&subscene=93&clicktime=1609289920&ascene=56&devicetype=iOS14.2&version=17001233&nettype=3G+&abtest_cookie=AAACAA%3D%3D&lang=zh_CN&fontScale=100&exportkey=Ayd2cbAKLcxjXJqDLIu8LCE%3D&pass_ticket=2xbwD%2FcdGTTTwft8WbXYo2sr2ATRy6gEj06ltBz83eve%2B9Y0J%2FkbJNSJg71nKJ3K&wx_header=1)
