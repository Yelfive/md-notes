# 剑指 Offer 56 - I. 数组中数字出现的次数

> 来源：[力扣（LeetCode）](链接：https://leetcode-cn.com/problems/shu-zu-zhong-shu-zi-chu-xian-de-ci-shu-lcof)
>
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

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

```java
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

## Tips

> `k & (-k)` 可以得到最低位不为 `0` 的二进制对应的值

**证明:**

设 `k` 的二进制表示为
$$
x_n, ..., x_j, ...,x_0
$$

且 `k` 的反码表示为

$$
y_n, ..., y_j, ..., y_0
$$

设 $x_j$ 为第一个不为 `0` 的位，则有

$$x_{j-1} = ... = x_0 = 0$$

所以有 $y_j = 0$ 且 $y_{j-1} = ... = y_0 = 1$

又由于 `-k` 的补码正好是 `k` 反码 + 1

所以 `-k` 的补码只有第`j`位不等于 `0`（`i<j`的所有位都因为进位而变成了`0`）

所以此时 `k & (-k)` 正好是 `1 << j`, 即最小位等于1的数
