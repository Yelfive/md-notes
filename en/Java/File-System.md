# Java File System

## Get Directory of Current JAR

If the class is in jar, it returns the path to current jar, otherwise, it returns the path to directory that contains the class(not `.java`).

```java
String filename = getClass().getProtectionDomain().getCodeSource().getLocation().getPath();
```

## Get file stream from resources

```
src
|
 `- main
    |
     `- resources
        |
         `- file.txt
```

```java
InputStream = getClass().getClassLoader().getResourceAsStream("file.txt")
```
