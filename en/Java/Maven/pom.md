# Maven pom: Project Object Model

## Guide to naming conventions on groupId, artifactId, and version

- `groupId` is the organization in package name convention
- `artifactId` is the package name in that organization
- `version` explains itself

:::details What does Apache say about them?

See [Maven – Guide to Naming Conventions](https://maven.apache.org/guides/mini/guide-naming-conventions.html)

- `groupId` uniquely identifies your project across all projects. A group ID should follow Java's package name rules. This means it starts with a reversed domain name you control. For example, `org.apache.maven`, `org.apache.commons`

    Maven does not enforce this rule. There are many legacy projects that do not follow this convention and instead use single word group IDs. However, it will be difficult to get a new single word group ID approved for inclusion in the Maven Central repository.

    You can create as many subgroups as you want. A good way to determine the granularity of the groupId is to use the project structure. That is, if the current project is a multiple module project, it should append a new identifier to the parent's groupId. For example,

    `org.apache.maven`, `org.apache.maven.plugins`, `org.apache.maven.reporting`

- `artifactId` is the name of the jar without version. If you created it, then you can choose whatever name you want with lowercase letters and no strange symbols. If it's a third party jar, you have to take the name of the jar as it's distributed.
eg. maven, commons-math

- `version` if you distribute it, then you can choose any typical version with numbers and dots (1.0, 1.1, 1.0.1, ...). Don't use dates as they are usually associated with SNAPSHOT (nightly) builds. If it's a third party artifact, you have to use their version number whatever it is, and as strange as it can look. For example, `2.0`, `2.0.1`, `1.3.1`

:::

## Specifying Java Version

```xml
<project>
    <build>
        <plugins>
            <plugin>
                <!-- Specify which sdk version to use to compile -->
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>1.8</source>
                    <target>1.8</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
    <properties>
        <maven.compiler.source>1.8</maven.compiler.source>
        <maven.compiler.target>1.8</maven.compiler.target>
    </properties>
</project>
```

## Resources

Maven follows the principle: ==convention over configuration.==

So by default, Maven will package only (and all) resource files under `${basedir}/src/main/resources` ^[[Maven POM Reference](https://maven.apache.org/pom.html#resources)].

But you can custom which files should be copied. The files are called resources.

Here's an example.

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <build>
    ...
    <resources>
      <resource>
        <targetPath>META-INF/plexus</targetPath>
        <filtering>false</filtering>
        <directory>${basedir}/src/main/plexus</directory>
        <includes>
          <include>configuration.xml</include>
        </includes>
        <excludes>
          <exclude>**/*.properties</exclude>
        </excludes>
      </resource>
    </resources>
    <testResources>
      ...
    </testResources>
    ...
  </build>
</project>
```

- `targetPath`: Where your resource stores after build.
- `filtering`: Indicates whether variable filtering enabled.^[[Apache Maven Resources Plugin – Filtering](https://maven.apache.org/plugins/maven-resources-plugin/examples/filter.html)]
- `directory`: Where the resources are.
- `includes`: File patterns to be included
  - `*` for any file
  - `**` for any level of directory
- `excludes`: It precedes `includes` when conflicts.

### Example to includes every xml and property file

```xml
<resources>
    <resource>
    <filtering>true</filtering>
    <directory>src/main/resources</directory>
    <includes>
        <include>**/*.xml</include>
        <include>**/*.properties</include>
    </includes>
    </resource>
    <resource>
    <filtering>true</filtering>
    <directory>src/main/java</directory>
    <includes>
        <include>**/*.xml</include>
        <include>**/*.properties</include>
    </includes>
    </resource>
</resources>
```

The above example means to copy, during building, every `.xml` and `.properties` under `src/main/resources` and `src/main/java`.

:::tip
The `<includes>` are copied to destinations with same directory structure append to last part of `<directory>`. Here's a concrete example.

Consider the following directory structure

```
src
└── main
    └── resources
        ├── mappers
        │    ├── UserMapper.xml
        │    ├── RoleMapper.xml
        │    ├── ProductMapper.xml
        │    └── OrderMapper.xml
        │
        ├── mybatis-config.xml
        └── application.properties
```

With the following config

```xml
<directory>src/main/resources</directory>
<includes>
    <include>**/*.xml</include>
    <include>**/*.properties</include>
</includes>
```

will get result

``` {2}
jar
└── resources
    ├── mappers
    │    ├── UserMapper.xml
    │    ├── RoleMapper.xml
    │    ├── ProductMapper.xml
    │    └── OrderMapper.xml
    │
    ├── mybatis-config.xml
    └── application.properties
```

> Copied and appended to `resources`

While with config

```xml {1}
<directory>src/main</directory>
<includes>
    <include>**/*.xml</include>
    <include>**/*.properties</include>
</includes>
```

will get

``` {2}
jar
└── main
    └── resources
        ├── mappers
        │    ├── UserMapper.xml
        │    ├── RoleMapper.xml
        │    ├── ProductMapper.xml
        │    └── OrderMapper.xml
        │
        ├── mybatis-config.xml
        └── application.properties
```

> Copied and appended to `main`

:::

### See More

- [Maven – POM Reference](https://maven.apache.org/pom.html)

## Single Archive

Use `maven-assembly-plugin` to package the project as a single JAR.

Configuration in pom `build`:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-assembly-plugin</artifactId>
            <version>2.5.5</version>
            <configuration>
                <archive>
                    <manifest>
                        <mainClass>com.xxg.Main</mainClass>
                    </manifest>
                </archive>
                <descriptorRefs>
                    <descriptorRef>jar-with-dependencies</descriptorRef>
                </descriptorRefs>
            </configuration>
            <!-- To package using just `mvn package` -->
            <executions>
                <execution>
                    <id>make-assembly</id>
                    <phase>package</phase>
                    <goals>
                        <goal>single</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
</build>
```

Package it.

```bash
mvn package assembly:single
```

See more: [Maven 生成可以直接运行的 jar 包的多种方式](https://blog.csdn.net/xiao__gui/article/details/47341385)
