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
