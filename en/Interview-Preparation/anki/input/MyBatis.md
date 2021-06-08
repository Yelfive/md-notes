---
css: z_custom.css
---

# MyBatis

## 生命周期

1. `SqlSessionFactoryBuilder`: 创建 SqlSessionFactory，创建之后无用
2. `SqlSessionFactory`: 创建 SqlSession，相当于连接池获取一个连接
3. `SqlSession`: 进行 SQL 调用，获取一个 mapper，调用其中的方法

## 事务管理器有哪些

```xml
<environment>
    <transactionManager type="JDBC|MANAGED">
    ...
    </transactionManager>
</environment>
```

- JDBC:
- MANGED:

## 数据源有哪些

```xml
<dataSource type="POOLED">
    <property name="driver" value="${driver}"/>
    <property name="url" value="${url}"/>
    <property name="username" value="${username}"/>
    <property name="password" value="${password}"/>
</dataSource>
```

- POOLED
- UNPOOLED
- JNDI

## 关联查询

关联查询分为 “1:n” 和 “n:1”，两种均可以使用**子查询**和**连表查询**获得结果

- `1:n`: collection, 使用 `ofType` 指定泛型类型
- `n:1`: association, 使用 `javaType` 指定关联字段类型

**子查询：**

结果集不包含关联表数据

```xml
<select id="teacher">select * from teacher where id=#{tid}</select>

<resultMap id="">
    <association property="" column="tid" select="student" javaType="Student"/>
</resultMap>

<select id="student" resultMap="">select * from student where id=#{sid}</select>
```

**连表查询：**

结果集包含了关联数据

```xml
<select id="teacher" resultMap="">select t.name t_name, s.name s_name from teacher t left join student s ...</select>

<resultMap id="teacher or student">
    <association property="" javaType="Teacher">
        <result property="name" column="t_name">
    </association>
</resultMap>
```

## 动态SQL

根据不同的条件生成不同的 SQL 语句。通过 OGNL 计算出表达式的值，并动态的拼接成SQL语句。

- if
- choose(when, otherwise): switch case
- trim(where, set)
- foreach: Iterable, Array, Map
- script: 带注解的映射器中使用动态 SQL 必须使用该标签
- bind: 允许你在 OGNL 表达式以外创建一个变量，并将其绑定到当前的上下文

```xml
<select id="selectBlogsLike" resultType="Blog">
  <bind name="pattern" value="'%' + _parameter.getTitle() + '%'" />
  SELECT * FROM BLOG
  WHERE title LIKE #{pattern}
</select>
```

> OGNL 语言将字符串 `item.id` 解析成方法调用 `item.getId()`

## MyBatis 缓存

在内存中缓存 select 语句结果(对象)，`update, delete, insert` 会刷新缓存

1. 一级缓存（local cache）：`SqlSession` open 与 close 之间有效，返回同一个 POJO 对象。`sqlSession.clearCache` 可手动刷新。默认开启，不能关闭
2. 二级缓存（global second level）：`<cache/>` 开启
    1. 作用域为一个 `namespace`
    2. 查询数据首先放入一级缓存
    3. 一级缓存 `close` 或 `commit` 时，放入二级缓存
    4. 新会话时，先检查二级缓存，再检查一级缓存
    5. 不同的 mapper 查出的数据放在各自的缓存中
    6. `readOnly` 默认 `false`，此时通过 `Serializable` 返回拷贝对象。相反，`true` 时返回同一对象

```xml
<mapper namespace="cn.yelfive.dao.UserMapper">
    <!-- Enable 2nd-cache -->
    <cache/>
</mapper>
```

查询过程

1. 二级
2. 一级
3. db
4. 缓存一级
5. 缓存二级

对同一个 mapper 方法进行匹配。如，获取了列表、与列表中某一元素的查询两种情况，是没有缓存的。

## Mapper xml 中有哪些标签

1. select, update, delete, insert
2. resultMap
3. parameterMap
4. sql
5. include
6. selectKey: 将id填充进传入@Insert, @InsertProvider, @Update, or @UpdateProvider 的对象中，若是 `before` 则先修改对象的id，在 insert，如果是 `after`，则先insert，再获取id传给对象，相当于获取最近的id。

## sql 与 include 标签

`<sql id="">` 用于定义可重用 SQL 语句片段，通过 `<include refid="">` 进行调用，可传参数

**Example:**

```xml
<sql id="sometable">
  ${prefix}Table
</sql>

<sql id="someinclude">
  from  <include refid="${include_target}"/>
</sql>

<select id="select" resultType="map">
  select field1, field2, field3
  <include refid="someinclude">
    <property name="prefix" value="Some"/>
    <property name="include_target" value="sometable"/>
  </include>
</select>
```

## DAO 层的工作原理

Dao 在 MyBatis 中被称为 mapper，其中的方法通过 **全类名+方法名** 唯一确定要执行的sql，故 **不能重载**。

在 `SqlSessionFactoryBuilder.build` 的时候会读取 xml 文件，此时会解析所有 Mapper 定义的 sql。

在获取 mapper 时（`session.getMapper()`），实际上获取到的是通过 Proxy 接口动态代理得到 mapper 代理，当调用 mapper 代理的方法时，会根据**全类名+方法名**作为**键**，去 `Configuration.mappedStatements` 获取唯一的 `MappedStatement` 实例，其中包含需要执行的 SQL 及 SQL 类型(SELECT etc.)。最后执行并返回。

> During building sql session factory, if the two method in mapper have same name, `InvalidArgumentException` will raise during `Configuration.put()`.

## MyBatis 如何分页查询

1. RowBounds 类，内存分页
2. SQL `limit` 语句
3. 插件，拦截 sql 改为子查询 `select (select clause) t limit offset, size`;

## MyBatis 插件运行原理

MyBatis 通过拦截执行过程中的某一点，进行自定义处理。包括

- Executor (update, query, flushStatements, commit, rollback, getTransaction, close, isClosed)
- ParameterHandler (getParameterObject, setParameters)
- ResultSetHandler (handleResultSets, handleOutputParameters)
- StatementHandler (prepare, parameterize, batch, update, query)

**编写插件：**

```java
// ExamplePlugin.java
@Intercepts({ @Signature(
    type= Executor.class,
    method = "update",
    args = {MappedStatement.class,Object.class}
    )
})
public class ExamplePlugin implements Interceptor {
    private Properties properties = new Properties();
    public Object intercept(Invocation invocation) throws Throwable {
    }
    public void setProperties(Properties properties) {
        this.properties = properties;
    }
}
```

**启用：**

```xml
<!-- mybatis-config.xml -->
<plugins>
  <plugin interceptor="org.mybatis.example.ExamplePlugin">
    <property name="someProperty" value="100"/>
  </plugin>
</plugins>
```

## 批量插入获取 pk

通过 `keyProperty` 和 `useGeneratedKeys="true"` 实现，最后 `pk` 会写回传入参数的指定字段。

```xml
<insert id="insertList" useGeneratedKeys="true" keyProperty="id">
  INSERT INTO country (name,code )
  VALUES
  <foreach collection="list" item="item" separator=",">
    (#{item.name},#{item.code})
  </foreach>
</insert>
```

```java
@Insert({"<script>",
        "INSERT INTO user(name, username, password) VALUES",
        "<foreach collection=\"list\" item=\"item\" separator=\",\">",
        "(#{item.name}, #{item.username}, #{item.password})",
        "</foreach>",
        "</script>"
})
@Options(keyProperty = "id", useGeneratedKeys = true)
int batchInsert(List<User> users);
```

> 1. 注解用 `@Options(keyProperty = "id", useGeneratedKeys=true)`. `@Options` 与 `@Insert` 等注解配合达到 xml 写 sql 的效果。
> 2. 基于注解的动态 SQL 需要用到 `<script>` 标签

## MyBatis 是如何映射结果的

### 列名与 POJO 字段对应

1. 使用 `<resultMap>`, `<association>`, `<collection>` 标签
2. 使用 `@Results`, `@Result`, `@One`, `@Many` 注解
3. 使用 SQL `alias`, MyBatis 会忽略大小写，通过 `_` 寻找对应的驼峰字段

### 赋值

通过反射，为返回对象赋值。

## MyBatis 中的懒加载如何配置

在 `<settings>` 中使用 `lazyLoadingEnabled`、`aggressiveLazyLoading` 全局配置，可以在具体关系中使用  `fetchType` 修改。

- `lazyLoadingEnabled` 全局开启懒加载，默认 `false`。可由 `fetchType` 重写
- `aggressiveLazyLoading` 当懒加载时，任何一个懒加载关系加载时，加载该 pojo 实例的所有关联数据。默认 `false`
- `lazyLoadTriggerMethods` 可以触发加载的方法。默认 `equals,clone,hashCode,toString`
- `fetchType` 单独设置某关联数据的获取类型：`LAZY`, `EAGER`, `DEFAULT`

```java
@Results({
  @Result(
    property = "", column = "",
    many = @Many(
      select = "Role.getRoleById",
      fetchType = FetchType.LAZY
      )
  )
})
User getUserById(long id);
```

## ResultMap 怎么设置、调用？

ResultMap 可以通过 xml 或 注解 定义，之后可以通过 xml 或者 注解引用（`@Results`, `@ResultMap`）

### xml

```java
<resultMap id="user"></resultMap>

<select id="getUserById" resultMap="user">
  ...
</select>
```

### 注解

```java
// define a result map by attribute `id`
@Results(id = "", ...)
@Select(...)
User getUserById(long id);
```

**调用：**

```java
@Select("SELECT * FROM user")
@ResultMap("userRole")
List<User> findAll();
```

## MyBatis 中的 SQL 的占位符参数怎么传值、使用？

### 1. 匿名参数

'`param1`, `param2`, ...' represents the '1st, 2nd, ...' arguments passed to mapper method

```java

@Inert("INSERT INTO user VALUES(#{param1}, #{param2})")
long createUser(long id, String name);
```

### 2. 命名参数

```java
@Inert("INSERT INTO user VALUES(#{id}, #{name})")
long createUser(@Param("id") long myId, @Param("name") String myName);
```

## MyBatis Mapper @Insert 返回值

- `@Insert` 只能返回修改行数，如果要获取修改的记录，需要使用 `@SelectKey` 再次查询后修改 POJO 对象

```java
@Inert("INSERT INTO user VALUES(#{id}, #{name})");
@SelectKey("SELECT * FROM user WHERE id=LAST_INSERT_ID()")
int createUser(User user);
```

其中 `@SelectKey` 在查询之后会将数据填充到 `user`，并覆盖已有数据

### XML selectKey

```xml
<selectKey keyProperty="" resultType="" order="BEFORE|AFTER">
  select something from some_table
</selectKey>
```
