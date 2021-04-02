# 剑指 Offer 65. 不用加减乘除做加法

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof)

## Problem

写一个函数，求两个整数之和，要求在函数体内不得使用 `+`、`-`、`*`、`/` 四则运算符号。

**示例:**

```
输入: a = 1, b = 1
输出: 2
```

**提示：**

```
a, b 均可能是负数或 0
结果不会溢出 32 位整数
```

## Solution

:::tip AQ
**Q：** 若数字 $a$ 和 $b$ 中有负数，则变成了减法，如何处理？[^jyd]

**A：** 在计算机系统中，数值一律用 **补码** 来表示和存储。**补码的优势：** 加法、减法可以统一处理（CPU只有加法器）。因此，以上方法 **同时适用于正数和负数的加法**。
:::

本题将 `和` 计算的 ++进位++ 与 ++不进位++ 分开表示，当进位值为 `0` 时，表示计算结束。

加法运算与位运算：

1. 不进位时，等价于 `^` 位运算
2. 有进位时，等价于 `&` 之后 `<< 1` 位运算

```java
class Solution {
    public int add(int a, int b) {
        while (b != 0) {
            int c = (b & a) << 1;
            a ^= b;
            b = c;
        }
        return a;
    }
}
```

## References

- [面试题65. 不用加减乘除做加法（位运算，清晰图解） - 不用加减乘除做加法](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/solution/mian-shi-ti-65-bu-yong-jia-jian-cheng-chu-zuo-ji-7/)

[^jyd]: [作者：jyd](https://leetcode-cn.com/problems/bu-yong-jia-jian-cheng-chu-zuo-jia-fa-lcof/solution/mian-shi-ti-65-bu-yong-jia-jian-cheng-chu-zuo-ji-7/)