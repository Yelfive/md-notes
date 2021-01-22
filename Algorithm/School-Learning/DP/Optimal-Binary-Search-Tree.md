# 最优二叉查找树(Optimal Binary Search Tree)

## 二叉查找树(Binary Search Tree)

<!-- 对于一个严格递增有序数集合 $S=\left\{k_1, k_2, ..., k_n\right\}$，构建一个二叉树，使得左子节点小于父节点，右子节点大于等于父节点。 -->
对于一颗二叉树，其所有左子树所有节点均小于父节点，右子树所有节点均大于父节点。

如：

```text
    10             10 
  /   \           /  \
 5     11        5    10
```

## 二叉查找树的搜索代价

给定集合

$$
S=\left\{k_1, k_2, ..., k_n\right\}
$$

其中 $\forall\ i<j$, 满足 $k_i < k_j$

构建一颗二叉查找树，其中所有内点满足 $k_i \in S$，叶子结点满足 $l_i \in (k_i, k_{i+1})$

为每个节点赋予一个概率（表示此次查询的值为该节点值的概率，e.g., `50%` 查询情况需要查询节点 $k_i$），

- 查找 $k_i$ 的概率 $p_i$
- 查找 $l_i$ 的概率 $q_i$, 其中 $l_i \in (k_i, k_{i+1})$

> 其中
> $$
> \sum_{i=1}^{n}{p_i} + \sum_{i=0}^{n}{q_i} = 1
> $$

由于查找到树中节点所需的查找次数等于节点在二叉树中的深度，设节点 $k$ 的深度为 $D(k)$ （规定更节点深度为 `0`），

则搜索代价定义为：
$$
\begin{aligned}
Cost & = \sum_{i=1}^{n}[p_i \cdot (D(k_i) + 1)] + \sum_{i=0}^{n}[q_i \cdot (D(l_i) + 1)] \\
     & = 1+\sum[p_i \cdot D(k_i) + q_i \cdot D(l_i)] + D(l_0) \cdot q_0
\end{aligned}
$$

## 最优子结构

设最优树为 $T$，内点对应序列为
$$(k_1,k_2,...,k_n)$$

对应叶子结点
$$(l_0,l_1,l_2,...,l_n)$$

其导出子树为 $T'$ 对应序列为
$$
\begin{aligned}
        (k_i,k_{i+1},...,k_j)\\
(l_{i-1},l_i,l_{i+1},...,l_j) \tag{1}
\end{aligned}
$$

则可以证明 $T'$ 任是上述序列的最优二叉查找树。

> 设存在 $T''$ 是 $(1)$ 的最优二叉查找树，则使用 $T''$ 在原树 $T$ 中替换掉 $T'$。
> 由于其他节点代价不变，则替换后的树 $T$ 具有更小的代价，与原树 $T$ 为最优树矛盾。

## 动态规划函数

定义

- $E(i, j)$ 表示序列 $\left\{k_i,...,k_j\right\}$ 的最优代价
- $E(i, i-1)$ 表示序列 $\left\{l_{i-1}\right\}$ 的最优代价，即 $E(i, i-1) = q_{i-1}$

设**最优二叉查找树**根节点为 $k_r$，左子树 $T_l$，搜索代价为 $E(i, r-1)$，右子树 $T_r$，搜索代价为 $E(r+1,j)$。将 $T_l$ 和 $T_r$ 与根 $k_r$ 连接时，子树的层级均 $+1$，根据代价函数的定义，可以得到

$$
\begin{aligned}
E(i, j) =
  &\ E(i, r-1) + \sum_{t=i}^{r-1}{p_t} + \sum_{t=i-1}^{r-1}{q_t}\\
  +&\ 1 \cdot p_r \\
  +&\ E(r+1, j) + \sum_{t = r+1}^{j}{p_t} + \sum_{t = r}^{j}{q_t}
\end{aligned}
\tag{2}
$$

令序列 $\left\{k_i,...,k_j\right\}$ 的深度 $+1$ 后代价增量表示为

$$
w[i, j] = \sum_{t=i}^{j}{p_t} + \sum_{t=i-1}^{j}{q_t} \tag{3}
$$

则 $(2)$ 式可表示为

$$
\begin{aligned}
E(i, j) &= E(i, r-1) + w[i,r-1] + p_r + E(r+1, j) + w[r+1,j]\\
        &= E(i, r-1) + E(r+1,j) + w[i,j]
\end{aligned}
$$

因此最优二叉搜索树的代价函数可以表示为

$$
E[i,j] = \left\{
\begin{aligned}
  q_{i-1}, &&j=i-1\\
  w[i, j] + \min_{i \leq r \leq j} \left\{{E[i, r-1] + E[r+1,j]} \right\},
    && others\\
\end{aligned}
    \right.
$$

$$
w[i,j] = \left\{
\begin{aligned}
  q_{i-1},  &&j=i-1\\
  w[i, j - 1] + q_j + p_j,
    && others\\
\end{aligned}
    \right.
$$

## Code Sample in Java

```java
public class Solution {

    /**
    * To construct the arrays which can be used to build an optimal tree
    * `E` to keep optimal costs
    * `W` to keep corresponding cost increased by depth
    * `R` to record the value of root to divide from `i` to `j`
    */
    public double solve(int[][] probs) {
      int size = probs.length;
      int[][] E = new int[size][size];
      int[][] W = new int[size][size];
      int[][] R = new int[size][size];

      int p = probs[0];
      int q = probs[1];
      // Init E/W/R
      for (int i = 1; i < size; i++) {
        E[i][i-1] = q[i - 1];
        // todo, finish this algorithm
      }
    }

    /**
    * To build an optimal tree
    */
    public void build() {
    }
}
```
