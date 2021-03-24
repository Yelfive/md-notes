# 最大子段和问题(Maximum Sub-Sequence Sum)

## 问题

根据给定的整数序列，求连续子段和最大值，整数序列可能为负数，若所有值都为负数，则定义最大子段和为 `0`。如:

```
输入: nums = [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
```

该问题可以通过以下方法求解

1. 暴力求解
2. 分治
3. 动态规划

其中对应的时间复杂度为

| 算法     | 时间复杂度    | 空间复杂度  |
| -------- | ------------- | ----------- |
| 暴力求解 | $O(n^2)$      | $O(1)$      |
| 分治     | $O(n\log{n})$ | $O(\log n)$ |
| 动态规划 | $O(n)$        | $O(1)$      |

## 循环求解

```java
public class Solution {
    public int maxSubSeqSum(int[] nums) {
        int sum = 0;
        for (int i = 0; i < nums.length; i++) {
            int tmp = 0;
            for (int j = i; i < num.length; j++) {
                tmp += nums[j];
                if (tmp > sum) {
                    sum = tmp;
                }
            }
        }
        return sum;
    }
}
```

## 分治

将序列分为均等的两段，**最大子段和 $a[1:n]$** 会出现三种情况：

1. $a[1:n] = a[1: n/2]$
2. $a[1:n] = a[n/2 + 1: n]$
3. $a[1:n]$ 出现在 $n/2$ 处，此时需要在两侧求出极大值，再求和

```java
public class Solution {
    public int maxSubSeqSum(int[] nums) {
        int sum = this.maxSubSum(nums, 0, nums.length - 1);
        return sum;
    }

    public int maxSubSum(int[] nums, int from, int to) {
        int sum = 0;
        if (from == to) {
            sum = nums[from] > 0 ? nums[from] : 0;
        } else {
            int mid = from + (to - from) / 2;
            int left = this.maxSubSum(mums, from, mid);
            int right = this.maxSubSum(nums, mid + 1, to);

            // Case 3: the max sub sequence sum wraps mid
            int leftSum = 0;
            int tmp = 0;
            for (int i = mid; i > from; i--) {
                tmp += nums[i];
                if (tmp > leftSum) leftSum = tmp;
            }

            int rightSum = 0;
            tmp = 0;
            for (int i = mid + 1; i < to; i++) {
                tmp += nums[i];
                if (tmp > rightSum) rightSum = tmp;
            }

            // Compare `leftSum`, `midSum`, `rightSum`
            int midSum = leftSum + midSum;
            sum = left > right ? left : right;
            if (sum < midSum) sum = midSum;
        }
        return sum;
    }
}
```

## 动态规划

> 时间复杂度：$O(n)$

设

$$
a_1,a_2,...,a_i,...,a_n \tag{dp-1}
$$
为问题中的序列

并设 $local\_max(i)$ 表示 $\left\{a_1, ..., a_i\right\}$ 包含 $a_i$ 的局部最大值。

:::tip
**为什么要设 $local\_max(i)$ 包含 $a_i$？**

这样可以利用 $local\_max(i)$ 递推出 $local\_max(i + 1)$，满足连续字段和要求。
:::

则可以得到递推公式
$$
local\_max(i) = \left\{
    \begin{aligned}
        a_i,&& local\_max(i -1) \leq 0 \\
        local\_max(i - 1) + a_i,&& others \\
    \end{aligned}
\right.
\tag{dp-2}
$$

其中，当 $local\_max(i-1) <= 0$ 时，对 $a_i$ 产生的负贡献，此时$local\_max(i-1) + a_i$ 还不如 $a_i$ 大。

最后我们得到 $sum(i)$ 的定义：

$$
sum(i) =  \max\left\{sum(i-1),\ local\_max(i)\right\} \tag{dp-3}
$$

**最优子结构**：从 `0` 到 `n` 扫描，会出现多个子问题，甚至出现非最优解导出的子问题。但是最优解必然是最优子结构导出的子问题的最优解。以 $tmp < 0$ 作为子问题的界，可以保证出现包含最优解的子问题，此时的子问题的解，一定大于其他子问题的解。

### DP Code Sample

```java
public class Solution {
    public int maxSubSeqSum(int[] nums) {
        int sum = 0, local_max = 0;
        for (int i = 0; i < nums.length; i++) {
            if (local_max > 0) {
                local_max += nums[i]; 
            } else {
                local_max = nums[i];
            }

            if (local_max > sum) sum = local_max;
        }
        return sum;
    }
}
```
