# Deployment of Java Application

## 1. Compile: javac

```bash
javac xxx
```

## 2. Make an Archive: jar

JAR(<acr>Java ARchive</acr>), is a `pkzip` compress file, which can be uncompressed by `unzip`, while lower case `jar` is a command line tool to make **compiled class files** into a JAR.

In order to make a JAR, you should first specify where the `main()` is by offering a file named `manifest.txt` which contains the following text,

```manifest
Main-Class: MyApp
```

:::tip notice that

`MyApp` is the **name of class that contains `main()`**, there's no extension suffix(`.class`) for `MyApp`

:::

```bash
jar -cvmf manifest.txt name.jar *.class
```

will result with a `name.jar` file.

:::tip About jar Options

- `-c` Create archive
- `-v` Verbose
- `-m` Manifest file
- `-f` The archive file name

Manifest and archive filename given **MUST** be in the same order as `mf` options.

:::

The *jar* file then can be called by

```bash
java -jar name.jar
```

:::warning

This won't work for OS Windows
:::
