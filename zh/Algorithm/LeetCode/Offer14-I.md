# 剑指 Offer 14- I. 剪绳子

## Problem

给你一根长度为 `n` 的绳子，请把绳子剪成整数长度的 m 段（m、n都是整数，n>1并且m>1），每段绳子的长度记为 `k[0],k[1]...k[m-1]` 。请问 `k[0]*k[1]*...*k[m-1]` 可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为 `2, 3, 3` 的三段，此时得到的最大乘积是 `18`。

**示例 1：**

```
输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1
```

**示例 2:**

```
输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36
```

**提示：**

- 2 <= n <= 58

## Solution

### 数学解法

以下公式为 ++算术几何均值不等式++ ，等号当且仅当 $n_1 = n_2 = ... = n_k$

$$
\frac{n_1 + n_2 + ... + n_k}{k} \geq \sqrt[k]{n_1 n_2 ... n_k}
$$

将长度为 $n$ 的绳子，分为 $a$ 段，每段长度为 $x$ 时，得到最大乘积。

$$
\begin{aligned}
n &= kx \\

x &= \frac{n}{k} \\

f(n) &= x^k = x^\frac{n}{x} = (x^{1/x})^n
\end{aligned}
$$

令 $y = x^{1/x}$，通过求导可得 $x = e$ 时 $y$ 取最大值。

由于 $x$ 为整数，故 $x$ 的最大值只能在 $2$ 或者 $3$ 时取得。

为了方便对比，做 $y^6$ 处理，不影响 $y$ 的大小比较，

$$
\begin{aligned}
y(2)^6 = (2^\frac{1}{2})^6 = 9 \\
y(3)^6 = (3^\frac{1}{3})^6 = 8
\end{aligned}
$$

故

$$y(3) > y(2)$$

故 $x = 3$ 时 $f(n)$ 取得最大值

$$
f(n) = 3 ^ {n / 3}
$$

由此可得：**将线进行等分，每段长度为 $3$ 时，将得到最大乘积。**

又

$$k = \frac{n}{x} = \frac{n}{3}$$

为整数，所以对于 $n$ 有3种情况需要讨论

1. $n \mod 3 = 0$：此时 $f(n) = 3^{n / 3}$
2. $n \mod 3 = 1$：此时 $f(n) = 3^{(n - 4) / 3} \times 4$
3. $n \mod 3 = 2$：此时 $f(n) = 3^{(n - 2) / 3} \times 2$

时间空间复杂度均为 $O(1)$

代码如下：

```java
class Solution {
    public int cuttingRope(int n) {
        if (n < 4) return n - 1;

        int prod = Math.pow(3, n / 3);
        
        switch (n % 3) {
            // When `n == 4`, this does not make sense(1x4),
            // but the result(2x2) is the same.
            case 1: prod = prod / 3 * 4 ;break;
            case 2: prod = prod * 2;break;
        }
        return prod;
    }
}
```

## 动态规划

```java {11}
class Solution {
    public int cuttingRope(int n) {
        int[] table = new int[n + 1];
        table[1] = 1;
        table[2] = 1;
        for (int i = 3; i <= n; i++) {
            for (int j = 1; j < i; j++) {
                // into more than 2 parts
                int tmp = Math.max(table[i - j] * table[j], table[i - j] * j);
                // into 2 parts
                tmp = Math.max(tmp, (i - j) * j);
                if (tmp > table[i]) {
                    table[i] = tmp;
                }
            }
        }
        return table[n];
    }
}
```

:::tip

根据[数学解法](#数学解法)可知，此算法中，第11行代码只在 $n <= 4$ 时有意义

:::
