
### 保留库

- admin
    > 从权限的角度来看，这是"root"数据库。要是将一个用户添加到这个数据库，这个用户自动继承所有数据库的权限。一些特定的服务器端命令也只能从这个数据库运行，比如列出所有的数据库或者关闭服务器。
- local
    > 这个数据永远不会被复制，可以用来存储限于本地单台服务器的任意集合
- config
    > 当Mongo用于分片设置时，config数据库在内部使用，用于保存分片的相关信息。

---

### 名词对应

| RDMS   | Mongo|
| --     | --   |
|数据库   | 数据库 |
|表      | 集合   |
|行      | 文档   |
|列      | 字段   |
|表联合   | 嵌入文档|
|主键    | 主键（_id）|

---

### 命名

- Over all
    - Case sensitive
    - Type sensitive ==??==

- Database
    - All characters should be in lower case
    - Max length: 64 bytes
    - \w allowed

- Collection
    - 不能以`system`开头
    - Cannot contain `\0`, which means end of collection name

- Key of a document
    - Sort in alphabet
    - Unique in a document
    - Case sensitive
    - Can be any UTF-8 character except for
        - `\0` end of a key
        - `.$` special occasion
        - `_` reserved

---

### Capped Collection

- Insertion available
- Update fails when new document takes more bytes than the old one
- Cannot delete its document

> db.createCollection(name, option)

- name
- option
    - `capped` Fixed size collection, expires the oldes when max-size             reached
    - `size` In bytes, the size of capped collection

```json
{
    "capped": true,
    "size": "sizeInBytes"
}
```

---

### Data Types

数据类型    |描述
--|--
String      |字符串。存储数据常用的数据类型。在 MongoDB 中，UTF-8 编码的字符串才是合法的。
Integer     |整型数值。用于存储数值。根据你所采用的服务器，可分为 32 位或 64 位。
Boolean     |布尔值。用于存储布尔值（真/假）。
Double      |双精度浮点值。用于存储浮点值。
Min/Max keys|将一个值与 BSON（二进制的 JSON）元素的最低值和最高值相对比。
Arrays      |用于将数组或列表或多个值存储为一个键。
Timestamp   |时间戳。记录文档修改或添加的具体时间。
Object      |用于内嵌文档。
Null        |用于创建空值。
Symbol      |符号。该数据类型基本上等同于字符串类型，但不同的是，它一般用于采用特殊符号类型的语言。
Date        |日期时间。用 UNIX 时间格式来存储当前日期或时间。你可以指定自己的日期时间：创建 Date 对象，传入年月日信息。
Object ID   |对象 ID。用于创建文档的 ID。
Binary Data |二进制数据。用于存储二进制数据。
Code        |代码类型。用于在文档中存储 JavaScript 代码。
Regular expression  |正则表达式类型。用于存储正则表达式。
    
Connect MongoDB
---

> mongodb://[username:password@]host1[:port1][,host2[:port2],...[,hostN[:portN]]][/[database][?options]]

- `mongodb://` Simillar to schema
- `username:password@` Optional
- `host` Required, the host
- `port` Optional, default to be 27017
- `database` If `username:password@` specified, the database would      be the database specified, or database `admin` will be `use`d
- `options` `?key=value` pairs, if `database` not given, a slash is     required in the front, a.k.a `/?key=value`

Commands
---

- use <dbname>
    
    > To create a database or to use one

        > use my_db
        switched to db my_db

- show dbs

    > To show all the database
    
        > show dbs
        admin  0.000GB
        local  0.000GB
        test   0.000GB

- db.&lt;table>.insert(&lt;document>)
    
    > To insert a document
        
        > db.table.insert({hello: world})
        WriteResult({ "nInserted" : 1 })
        
- db.dropDatabase()

    > To drop current database
    > 
    > If database does not exit, always a `{ "ok" : 1 }`
    > will be returned 

        > use my_db
        switched to db my_db
        > db.dropDatabase()
        { "dropped" : "test", "ok" : 1 }

- show tables
- show collections

    > Show tables in current database
    
        > db.anotherTable.insert({table: true})
        WriteResult({ "nInserted" : 1 })
        > show tables
        table
        anotherTable
    
- db.&lt;table>.drop()

    > Drop a table, returns boolean to indicates success

        > db.table.drop()
        true
        > show tables
        anotherTable

- db.&lt;table>.find()

    > Find all records

        > db.my_table.insert({hello: 'world'})
        WriteResult({ "nInserted" : 1 })
        >
        > db.my_table.insert({hello1: 'world1'})
        WriteResult({ "nInserted" : 1 })
        >
        > db.my_table.find()
        { "_id" : ObjectId("59427868d0c0629d93071278"), "hello" : "world" }
        { "_id" : ObjectId("594278a5d0c0629d93071279"), "hello1" : "world1" }

- `db.<table>.findOne()`

    > Find one record
        
        > db.my_table.findOne()
        { "_id" : ObjectId("59427868d0c0629d93071278"), "hello" : "world" }

- `db.<table>.save(<document>[, options])`

    ```
    db.&lt;table>.save(
        &lth;document>,
        {
            writeConcern: &lt;document>
        }
    )
    ```

    > Insert or update a row, depending on if `_id` given and found in the table. If `_id` given and found, it performs update, or otherwise, an insertion will be perfomed
    >
    > `writeConcern` for the exception level <font color="red">**??**</font>
    
        > db.my_table.save({_id: ObjectId('59427868d0c0629d93071278'), 'hello': 'world to you'})
        WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
        >
        > db.my_table.find()
        { "_id" : ObjectId("59427868d0c0629d93071278"), "hello" : "world to you" }
        { "_id" : ObjectId("594278a5d0c0629d93071279"), "hello1" : "world1" }
        >
        > db.my_table.save({_id: '123456', 'hello': 'should insert this document'})
        WriteResult({ "nMatched" : 0, "nUpserted" : 1, "nModified" : 0, "_id" : "123456" })
        >
        > db.my_table.find()
        { "_id" : ObjectId("59427868d0c0629d93071278"), "hello" : "world to you" }
        { "_id" : ObjectId("594278a5d0c0629d93071279"), "hello1" : "world1" }
        { "_id" : "123456", "hello" : "should insert this document" }

- db.<table>.update(<query>, <update>[, options])
    
    ```
    db.<table>.insert(
        <query>,
        <update>,
        {
            upsert: <boolean>,
            multi: <boolean>,
            writeConcer: <document>
        }
     )
    
    ```

    > <query>
    > ---
    > Similar to where of SQL, using [condition operator](#ConditionOperator)
    >
    > <update>
    > ---
    > 
    >
    > optional
    > ---
    > - `upsert` default `false`, insert if not found
    > - `multi` default `false`, whether to update multiple rows or just the first found
    > - `writeConcern` exception level

# Operator

Operator starts with a dollar sign '$'

## Query  Operator

```
> db.<collection>.find({<field> : {$gt : 100}})
```

- $gt
    > Greater than: `>`
- $gte
    > Greater than or equal: `>=` 
- $lt
    > Less than: `<`
- $lte
    > Less than or equal: `<=`
- $type
    > Defining the queried field type
    
    ```
    > db.col.find({"title" : {$type : 2}})
    ```

## Update Operator 

- $set
    > set value to a document field
    
    ```
    > db.col.update({'title':'MongoDB 教程'},{$set:{'title':'MongoDB'}})
    WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
    ```
 </table></table></table></table></table></table></table></table>