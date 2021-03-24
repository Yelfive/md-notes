---
keywords: quick sort
---

# 快速排序 <Badge type="error">TODO</Badge>

![picture 9](./images/Quick-Sort/start_20210324100623_95.png "Fig. Initial state")

快速排序是将元素分区，然后再分治进行排序的方法。首先选取一个基准元素 $pivot$，然后移动元素，使得左边的元素 $<pivot$，右边的元素 $>pivot$。

元素的移动主要有两种方法：

1. 挖坑法
2. 指针交换法

选择基准元素的方法：

1. 首尾、中间元素
2. 随机

## 1. 挖坑法

**定义：**

- $pot$ 记录坑的位置
- $pivot$ 记录基准元素
- $left$ 记录左索引
- $right$ 记录右索引

初始时，

$$
\left\{
\begin{aligned}
    pot     &= 0\\
    pivot   &= a_{pot} = a_0\\
    left    &= 1\\
    right   &= n-1
\end{aligned}
\right.
$$

开始时从右边开始扫描，得到元素 $a_{right}$，此时会出现两种情况：

1. $a_{right} < pivot$，则
   1. 将 $a_{right}$ 放入 $a_{pot}$
   2. 将 $right$ 标记为 $pot$
2. $a_{right} >= pivot$，则移动 $right$ 至 $right - 1$，直到出现 $a_{right} < pivot$。

然后当 $pot$ 在右侧时，再类似地从左边往右边扫描，此时：

1. $a_{left} >= pivot$，则将 $a_{left}$ 放入 $a_{pot}$，并将 $left$ 标记为 $pot$
2. $a_{left} < pivot$，则移动 $left$ 至 $left - 1$，直到出现 $a_{left} >= pivot$。

当 $left=right$ 时结束。

经过一趟遍历之后，就可以将小于 $pivot$ 的数据分到左边，大于 $pivot$ 的数据分到右边。
然后再对左右两边的数据分别递归的进行处理。

终止条件：

## 2. 指针交换法
