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

根据不同的条件生成不同的 SQL 语句。

- if
- choose(when, otherwise): switch case
- trim(where, set)
- foreach: Iterable, Array, Map

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
