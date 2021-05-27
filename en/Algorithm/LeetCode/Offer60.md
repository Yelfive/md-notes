# 剑指 Offer 60. n个骰子的点数

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/nge-tou-zi-de-dian-shu-lcof)

## Problem

把 $n$ 个骰子扔在地上，所有骰子朝上一面的点数之和为 $s$。输入 $n$，打印出 $s$ 的所有可能的值出现的概率。

你需要用一个浮点数数组返回答案，其中第 $i$ 个元素代表这 $n$ 个骰子所能掷出的点数集合中第 $i$ 小的那个的概率。

**示例 1:**

```
输入: 1
输出: [0.16667, 0.16667, 0.16667, 0.16667, 0.16667, 0.16667]
```

**示例 2:**

```
输入: 2
输出:
[
    0.02778, 0.05556, 0.08333, 0.11111, 0.13889, 0.16667,
    0.13889, 0.11111, 0.08333, 0.05556, 0.02778
]
```

**限制：**

- $1 \leq n \leq 11$

## Solution

使用动态规划法：设 $dp(n,k)$ 表示投出 $n$ 个骰子，和为 $k$ 的次数。

考虑到第 $n$ 个骰子，可以投出 $\{1,2,3,4,5,6\}$ 中的1个，则前 $n-1$ 个骰子需要对应投出 $\{k-1, k-2, k-3, k-4, k-5, k-6\}$ 便可以达到 $k$ 次的目的。

由此可以得到动态规划函数：

$$
dp(n,k) = \sum_{i=1}^{\min{\{6,\ k\}}}{dp(n-1, k-i)} \tag{60-1}
$$

---

**复杂度分析：**

- 时间复杂度：$O(n^2)$
- 空间复杂度：$O(n^2)$

---

**Code In Java:**

```java
class Solution {
    public double[] dicesProbability(int n) {
        if (n == 0) return new double[0];

        int[][] dp = new int[n][6 * n];
        double[] prob = new double[5 * n + 1];

        for (int i = 0; i < 6; i++) dp[0][i] = 1; // when there's only one dice

        for (int i = 2; i <= n; i ++) { // when there are `i` dices
            int max = 6 * i;
            for (int k = i; k <= max; k++) {
                for (int j = 1; j <= 6 && j < k; j++) { // `j` stands of the decrement
                    dp[i - 1][k - 1] += dp[i - 2][k - j - 1];
                }
            }
        }

        double dividend = Math.pow(6, n);

        for (int i = 0; i < prob.length; i++) {
            prob[i] = dp[n - 1][n + i - 1] / dividend;
        }
        return prob;
    }
}
```

**空间优化：**<todo/>

由于上面的算法使用了一个二维数组来保存 `dp`。实际上二维数组中，$\forall\ i < j\ or\ i > j + 6,\ dp[i][j] = 0$。
也就是说，有超过一半的空间都浪费了。再者，由状态方程$(60-1)$，

$$
dp(n,k) = \sum_{i=1} ^{\min{\{6,\ k\}}} {dp(n-1, k-i)}
$$

我们可以看到，对于每个 $k$， ~~当前状态 $dp(n)$ 只与上一个状态 $dp(n-1)$ 中的 6 个值有关，于是可以使用一个长度为12的一维数组来保存上一个状态~~。
