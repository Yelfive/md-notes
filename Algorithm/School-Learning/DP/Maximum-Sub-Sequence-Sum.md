# 最大子段和问题(Maximum Sub-Sequence Sum)

**问题**：根据给定的整数序列，求连续子段和最大值，整数序列可能为负数，若所有值都为负数，则定义最大子段和为 `0`。

该问题可以通过以下方法求解

1. 循环求解
2. 分治
3. DP

其中对应的时间复杂度为

| 算法     | 时间复杂度    |
| -------- | ------------- |
| 循环求解 | $O(n^2)$      |
| 分治     | $O(n\log{n})$ |
| DP       | $O(n)$        |

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

## DP

> $O(n)$

设

$$
a_1,a_2,...,a_i,...,a_n \tag{dp-1}
$$
为问题中的序列

并且 `local_max` 为包含当前值的局部最大值， `sum[i]` 表示到位置`i` 时，最大解。

从左到右扫描，当 `local_max < 0` 表明当前位置之前（`i-1`）已经取得了较大值，
且当前值 `nums[i]` 一定为负数。
因此，可以使用 `local_max` 记录 `i+1` 的位置，重新开始累加。
此外，使用变量 `sum` 存储目前为止的最大值。

其中 `local_max` 的定义为
$$
local\_max = \left\{
    \begin{aligned}
        0,&& local\_max \leq 0 \\
        local\_max + a_i,&& others \\
    \end{aligned}
\right.
\tag{dp-2}
$$

得到 `sum` 的定义

$$
sum[i] = \left\{
    \begin{aligned}
        sum[i-1],&& a_i \leq 0 \\
        \max\left\{sum[i-1], local\_max + a_i\right\}, && a_i > 0\\
    \end{aligned}
\right.
\tag{dp-3}
$$

**最优子结构**：从 `0` 到 `n` 扫描，会出现多个子问题，甚至出现非最优解导出的子问题。但是最优解必然是最优子结构导出的子问题的最优解。以 $tmp < 0$ 作为子问题的界，可以保证出现包含最优解的子问题，此时的子问题的解，一定大于其他子问题的解。

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
