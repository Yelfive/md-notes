# Introduction

## Terminology

### Complicity measurement

To judge an algorithm by the time/memory it consumes.

- $O$ Upper time/memory limit
- $\Omega$ Lower time/memory limit

## Algorithms Mentioned

### 1. Recursion (递归)

Function call itself within its body

```c
void recursion() {
    // ...
    recursion();
    // ...
}
```

1. [整数划分](./Recursion/Integer-Partition.md)
2. 汉诺塔 hanoi
3. 阶乘 $n!$

### 2. Divide and Conquer (分治)

Divide a large problem and conquer each smaller problem
then combine/merge into the solution of the large problem.

With this algorithm, the large problem should be divided into smaller problems with about the same scale.

The algorithm is typically accomplished by [recursion](#1-recursion-递归).

**Problems:**

1. Binary search
2. 大数乘法：减少乘法次数

    $$
    ac\cdot2^n + (ad+bc)\cdot2^{n/2} + bd     \tag{1}
    $$

    转化为

    $$
    XY = ac\cdot2^n + ((a-b)(d-c)+ac+bd)\cdot2^{n/2} + bd         \tag{2}
    $$

    以减少乘法次数, 式$(1)$需要计算`4`次乘法，式$(2)$只需要计算`3`次乘法。

3. 矩阵乘法

    利用矩阵分块减少乘法次数

4. 棋盘覆盖问题

    用 `L` 型骨牌覆盖棋盘中, 除特殊方格以外的所有方格

5. 快速排序(Quick Sort)
6. 线性时间选择

    在线性时间内找出第 `k` 小的数

7. 循环赛日程表问题
8. 最接近点对问题

    空间中距离最近的两点。一维情况下：数轴上距离最近的两点。

9. 最大子段和问题(Maximum Sub-Sequence Sum)

### 3. Dynamic Programming (DP, 动态规划)

如果问题可以分解成规模较小的子问题，但是子问题之间相不是相互独立的，
此时用[分治](#2-divide-and-conquer-分治)的方法将会增加许多重复的计算量（如 Fibonacci）。
为了解决这个问题，可以引入一张表来记录子问题的解，然后自底向上求解。

> DP 寻找的是最优解。

#### 核心概念

- **最优子结构**: 原问题的最优解包含了其导出子问题的最优解
- **自底向上**: 问题求解过程自底向上
- **最优值表**: 保存已解决的子问题答案
- **最优解表**: 记录最优值的求解过程
- **求解过程**: 利用已有**最优值表**，自底向上求解

> 问题具有 **最优子结构** 是使用DP求解的前提

#### DP典型问题

| 问题 | 时间复杂度 | 空间复杂度 | 描述
| ---- | ---------- | ---------- |---
|矩阵连乘问题                             |$O(n^3)$|$O(n^2)$|利用结合律，减少数乘次数
|[最长公共子序列问题(Longest Common Subsequence, LCS)](DP/Maximum-Sub-Sequence-Sum.md)    |$O(mn)$|$O(mn)$|不连续子串
|最大子段和问题(Maximum Sub-Sequence Sum) |$O(n)$|$O(1)$|整数序列，求子序列，其和最大
|凸多边形最优三角剖分问题                |$O(n^3)$|$O(n^2)$|类似矩阵*矩阵连乘问题*
|图像压缩问题（Image Compression Problem）      |$O(n)$|$O(n)$|**最优分段** 使得占用空间最少
|[0-1背包问题](DP/0-1-Knapsack-Problem.md)|$O(n)$|$O(n)$|将物品放入容量 $C$ 的背包，求**最大价值** $max(\sum_{i=1}^{n}{v_ix_i})$
|[最优二叉查找树(Optimal Binary Search Tree)](DP/Optimal-Binary-Search-Tree.md)|$O(n^3)$|$O(n^2)$|根据给定递增、有序序列，构造最优二叉查找树，构造最优解的时间复杂度为 $O(n)$
|硬币找零|||假设有4种硬币，面值分别为：二角五分、一角、五分和一分。现在要找给顾客六角三分钱，如何找使得给出的硬币个数最少

> 与分治的区别在于，
>
> **分治**是将大的问题划为小的子问题，再递归的解决子问题，合并成大问题的解，
> 解决过程中同样的子问题可能被计算多次；
>
> 而**DP**使用表来记录子问题的求解，不重复计算子问题，空间换时间。

#### DP其他变形

- **备忘录方法**： 使用**自顶向下**的求解过程

### 4. Greedy Algorithm (贪心)

贪心算法本质是动态规划，但是贪心算法只考虑上一步的最优解，速度更快，从而导致最终找到的可能是局部最优解，而非全局最优解。

> 当可以证明贪心算法找到的局部最优解，可以最终得到全局最优解时，贪心算法与动态规划算法等价。

#### 贪心算法的基本要素

1. 贪心选择性质

    可以证明通过问题的局部最优解可以得到全局最优解。

2. 具有最优子结构

    与动态规划相同，具有最优子结构，才能通过贪心算法求得最优解

#### 常见问题

问题|时间复杂度|空间复杂度|描述
-- |--|--|--
活动安排问题|$O(n)$| 通过结束时间非递减排序进行安排，具有最优子结构
背包问题|||
最优装载问题|||
单源最短路径|||
多机调度|||

### 5. Backtracking Algorithm (回溯 sù)

### 6. Branch and Bound Method (分支限界法)

### 7. Probabilistic Algorithm (概率算法, 随机化算法)
