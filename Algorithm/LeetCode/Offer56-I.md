# 剑指 Offer 56 - I. 数组中数字出现的次数

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof)

**See Also**: [每个数重复3次，找出1个出现1次的数](./Offer56-II.md)

## Problem

一个整型数组 `nums` 里除两个数字之外，其他数字都出现了两次。请写程序找出这两个只出现一次的数字。要求时间复杂度是$O(n)$，空间复杂度是$O(1)$。

**示例 1：**

```text
输入：nums = [4,1,4,6]
输出：[1,6] 或 [6,1]
```

**示例 2：**

```text
输入：nums = [1,2,10,4,1,4,3,3]
输出：[2,10] 或 [10,2]
```

**限制：**

```text
2 <= nums.length <= 10000
```

## Solution

由于有2个数字不重复，其余数字都重复了2次，设，$m$, $n$ 为不重复的数字。
则将所有数字都做 *异或(`XOR`)* 操作，结果必然有为 `1` 的位。
根据第一个为 `1` 的位，可以将数组 `nums` 分为两部分，一部分与该位 `XOR` 得到 `0`，另一部分得到 `1`，且此时 $m$ 与 $n$ 必然处于不同的两部分（如果处于相同部分，则异或结果为 `0`）。
由此可以得到算法：

1. 求出 `XOR` 后第一个为 `1` 的位。
2. 利用求得的位，进行分组（`&`）并求 `XOR` 操作，所得的两个数为所求。

```java {9}
class Solution {
    public int[] singleNumbers(int[] nums) {
        int xor = 0;
        for (int i = 0; i < nums.length; i++) {
            xor ^= nums[i];
        }

        int breakpoint = 1;
        while ((xor & breakpoint) == 0) breakpoint *= 2;

        int a = 0, b = 0;
        for (int k = 0; k < nums.length; k++ ) {
            if (0 == (nums[k] & breakpoint)) {
                a ^= nums[k];
            } else {
                b ^= nums[k];
            }
        }

        int[] diff = new int[]{a, b};
        return diff;
    }
}
```

::: tip

`k & (-k)` 可以得到 $k$ 的二进制表示中，最低一个不为 `0` 的位，如

```
0110 -> 0010
```

故第9行等价于 `breakpoint = xor & (-xor)`，其证明如下。

:::

**证明:**

设 $k$ 的二进制表示为
$$
x_n, ..., x_j, ...,x_0
$$

且 $k$ 的反码表示为

$$
y_n, ..., y_j, ..., y_0
$$

设 $x_j$ 为第一个不为 $0$ 的位，则有

$$x_{j-1} = ... = x_0 = 0$$

所以有 $y_j = 0$ 且 $y_{j-1} = ... = y_0 = 1$

又由于 $\-k$ 的补码正好是 $k$ 反码 + 1

导致所有 $i<j$ 的位都因为进位而变成了$0$

所以 $\-k$ 的补码只有第 $j$ 位不等于 $0$

所以此时 `k & (-k)` 正好是 `1 << j`, 即最小位等于1的数。
