# 回溯法（Backtracking Algorithm）

## 基本概念

### 1st：搜索算法分类

- **穷举搜索**（brute-force）
- **盲目搜索**（blind search）
  - **深度优先（DFS）**：对应回溯法（Backtracking）
  - **广度优先（BFS）**：对应分支限界法（Branch and Bound）
  - 博弈树搜索（game-tree）：α-β 剪枝算法
- **启发式搜索**（heuristic search）
  - 随机搜索：将随机过程引入搜索
  - ...

### 2nd

- **扩展节点**： 一个正在产生子结点的结点称为扩展结点
- **活结点**： 一个自身已生成但其子结点尚未全部生成的结点
- **死节点**：一个所有子结点已经产生的结点称做死结点

### 3rd

- **约束函数**：资源限定，如 [0-1 背包问题](DP/0-1-Knapsack-Problem.md)，所有 $x_i$ 满足 $x_i \in [0, 1]$
- **限界函数**：避免不可能产生最优解的状态，如 [0-1 背包问题](DP/0-1-Knapsack-Problem.md)，已知当前可以取到的最大价值为 $m$，则最大价值小于 $m$ 的节点可以剪去。

> 约束函数和界限函数统称为剪枝函数（Pruning Function）

### 4th：子集树 vs. 排列树

- **子集树（Subset Trees）**：问题的解满足某种**组合**的性质，解空间大小 $2^n$
- **排列树（Permutation Trees）**：问题的解满足**排列**的性质，解空间大小 $n!$

:::tip
树中顶点表示某种状态（问题中的“当前状态”），
边表示当前节点取值（0-1背包问题中的“是否放入 $i$ 物品”；TSP 问题中的“经过 $i$ 城市”）。
:::

### 5th：解空间

所有可能解的集合称为*解空间*，其中满足约束条件的解，称为*可行解*。

## 回溯方法

利用调用堆栈，对解空间树进行回溯：`return` 后跳转到上一层。

### 回溯框架

根据解空间是子集树还是排列树，有两种回溯框架。

设，

- 约束函数：$constraint(resource)$，
- 限界函数：$bound(resource)$。
- $f(n, t)$ 表示节点编号的下限，是 $n$ 与 $t$ 的函数
- $g(n, t)$ 表示节点编号的上限

#### 对于子集树

当解空间满足组合性质时，不需要考虑资源的顺序。此时的解空间大小为 $2^n$

```java
public class Solution {
    /**
     * @param t Depth of solution space/tree
     */
    public void backtrack(int t) {
        // `n` is the maximum depth allowed, to determine the end of search
        if (t > n) {
            output(x);
        } else {
            for (int i = f(n, t); i <= g(n, t); i++) {
                if (constraint(t) && bound(t)) {
                    backtrack(t + 1);
                }
            }
        }
    }
}
```

#### 对于排列树

设

- $swap(a, b)$ 为交换 $a,b$ 两个节点。

```java
public class Solution {
    /**
     * @param t Depth of solution space/tree
     */
    public void backtrack(int t) {
        // `n` is the maximum depth allowed, to determine the end of search
        if (t > n) {
            output(x);
        } else {
            for (int i = f(n, t); i <= g(n, t); i++) {
                if (constraint(t) && bound(t)) {
                    swap(x[i], x[t]);
                    backtrack(t + 1);
                    swap(x[i], x[t]);
                }
            }
        }
    }
}
```
