# config.vendor-dir

Directory of vendor installed in. This is default to be `vendor` of current directory

```text
project
|
+-- vendor
    +-- fk
         +- pay 
```

When you set it as `../vendor` the directories will be structured like:

```text
/
+-- project
|
+-- vendor
    +-- fk
        +--pay

```

## example

```json
{
    "config": {
        "vendor-dir": "../vendor"
    }
}
```
