# 剑指 Offer 44. 数字序列中某一位的数字

## Problem

数字以 `0123456789101112131415…` 的格式序列化到一个字符序列中。在这个序列中，第 `5` 位（从下标 `0` 开始计数）是 `5`，第 `13` 位是 `1`，第 `19` 位是 `4`，等等。

请写一个函数，求任意第 $n$ 位对应的数字。

**示例 1：**

```
输入：n = 3
输出：3
```

**示例 2：**

```
输入：n = 11
输出：0
```

**限制：**

- $0 \leq n< 2^{31}$

## Solution

1. 求出 $n$ 所在位置的位数的最小值，记作 $base$
2. 求出相对 $base$ 的位置，最终获得所求数字 $target$
3. 在 $target$ 中的偏移量

长度为 $b$ 位的数字个数为 $9 \times 10^{b-1}$。如

|   位数   |   2   |   3   |   4   |  ...  |     b      |
| :------: | :---: | :---: | :---: | :---: | :--------: |
| **数目** |  90   |  900  | 9000  |  ...  | $9 \times 10^{b-1}$ |

```java
class Solution {
    public int findNthDigit(int n) {
        int s = 0;     // length of digits <= b-digits, 0...999 if b = 3;
        int b = 1;
        int base;
        if (n >= 10) {
            b = 2;              // bit， 所求的数字位数
            s = 10;             // `b-1` 位数数字所占用的空间
            long cnt = 9;       // count, how many numbers in given b-digits
            while (true) {
                cnt *= 10;
                long len = s + cnt * b;
                if (len > n) break;
                s = (int) len;
                b++;
            }
            // first number of b-digits, e.g. 1000 for b = 4
            base = (int) Math.pow(10, b - 1);
        } else {
            base = 0;
        }

        int tar = base + (n - s) / b;   // target number, e.g. 1234
        int offset = (n - s) % b;       // Offset-th bit of the target number

        // Get the offset-th bit of `target`
        return tar / (int) Math.pow(10, b - offset - 1) % 10;
    }
}
```
