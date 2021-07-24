# 剑指 Offer 11. 旋转数组的最小数字

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof)

## Problem

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如，数组 `[3,4,5,1,2]` 为 `[1,2,3,4,5]` 的一个旋转，该数组的最小值为 `1`。  

**示例 1：**

```
输入：[3,4,5,1,2]
输出：1
```

**示例 2：**

```
输入：[2,2,2,0,1]
输出：0
```

## Solution

对于递增旋转数组 $[a_0, a_1,...,a_n]$，设最小值索引为 $min$ ，$\forall i \in (m, n)$，有以下 3 种情况

1. $a_i > a_n$，则有 $min \in [i + 1, n]$。

    :::details Proof
    利用反证法，假设 $min \in [0, i]$。

    则数组分布如下，
    $$
    a_0, ..., a_{min}, ..., a_i, ..., a_n \tag{1-1}
    $$

    由于数组为递增数组的旋转数组，则 $a_{min}$ 右侧的值递增，则有

    $$a_{min} \leq a_{i} \leq a_n$$

    与题设 $a_i > a_n$ 矛盾。

    $\therefore$ $a_{min}$ 位于式 $(1-2)$，即 $min \in [i + 1, n]$
    :::

2. $a_i < a_n$，则有 $min \in [0, i]$。

    :::details Proof
    利用反证法，假设 $min \in [i + 1, n]$。

    考虑如下部分元素
    $$
    a_i, ..., a_{min}, ..., a_n \tag{2-1}
    $$

    由于数组为递增，则式 $(2-1)$ 中，$a_i$ 定是顺序顺序经过旋转，由 $a_n$ 之后，移动到 $a_i$ 所在位置，即 $a_i > a_n$，与题设矛盾。
    $\therefore min \in [0, i]$
    :::

3. $a_i = a_n$，则有 $min \in [0, n-1]$。

    :::details Proof
    由于 $a_i = a_n$，因此删除两者中的任意一个元素，不影响结果。
    :::

由于 $a_i$ 可以是任何一个元素，取 $i$ 为中值，可以将数组进行二部划分，降低平均复杂度。

```java
class Solution {
    public int minArray(int[] numbers) {
        int start = 0, end = numbers.length - 1;
        int mid;
        while (start != end && numbers[start] >= numbers[end]) {
            mid = start + (end - start) / 2;
            if (numbers[mid] > numbers[end]) start = mid + 1;
            else if (numbers[mid] < numbers[end]) end = mid;
            else end--;
        }
        return numbers[start];
    }
}
```
