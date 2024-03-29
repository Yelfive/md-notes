
# 剑指 Offer 13. 机器人的运动范围

## Problem

地上有一个m行n列的方格，从坐标 `[0,0]` 到坐标 `[m-1,n-1]` 。一个机器人从坐标 `[0, 0]` 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于 `k` 的格子。例如，当 `k` 为 $18$ 时，机器人能够进入方格 `[35, 37]` ，因为 $3+5+3+7=18$。但它不能进入方格 `[35, 38]`，因为 $3+5+3+8=19$。请问该机器人能够到达多少个格子？

**示例 1：**

```
输入：m = 2, n = 3, k = 1
输出：3
```

**示例 2：**

```
输入：m = 3, n = 1, k = 0
输出：1
```

**提示：**

- $1 \leq n,m \leq 100$
- $0 \leq k \leq 20$

## Solution

### 回溯[^jyd]

- `si`: sum of `i`
- `sj`: sum of `j`

```java
class Solution {
    int m, n, k;
    boolean[][] visited;
    public int movingCount(int m, int n, int k) {
        this.m = m; this.n = n; this.k = k;
        this.visited = new boolean[m][n];
        return dfs(0, 0, 0, 0);
    }
    public int dfs(int i, int j, int si, int sj) {
        if(i >= m || j >= n || k < si + sj || visited[i][j]) return 0;
        visited[i][j] = true;
        return 1 + dfs(i + 1, j, (i + 1) % 10 != 0 ? si + 1 : si - 8, sj) + dfs(i, j + 1, si, (j + 1) % 10 != 0 ? sj + 1 : sj - 8);
    }
}
```

:::tip

1. 当 $(x + 1) \mod 10 = 0$  时： $s_{x+1} = s_x - 8$，例如 $19$ -> $20$ 的数位和分别为 $10$ -> $2$；
2. 当 $(x + 1) \mod 10 \neq 0$ 时： $s_{x+1} = s_x + 1$，例如 $1$ -> $2$ 的数位和分别为 $1$ -> $2$。

:::

[^jyd]: [作者：jyd](https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof/solution/mian-shi-ti-13-ji-qi-ren-de-yun-dong-fan-wei-dfs-b/)