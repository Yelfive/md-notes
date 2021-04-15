# 剑指 Offer 51. 数组中的逆序对

> 来源：[力扣（LeetCode)](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/)

## Problem

在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组中的逆序对的总数。

**示例 1:**

```
输入: [7,5,6,4]
输出: 5
```

**限制：**

- 0 <= 数组长度 <= 50000

## Solution

利用归并排序，将一个数组分为左右两部分，则

$$
逆序对数目=左边逆序对数+右边逆序对数+合并后的逆序对数
$$

$合并后的逆序对数$ 可以通过 **“归并”** 过程中，左边指针索引的位置，经过 $O(1)$ 的时间计算出来。

---

**算法复杂度：**

- 时间复杂度：$O(n \log n)$

- 空间复杂度：$O(n)$

```java
class Solution {
    public int reversePairs(int[] nums) {
        return mergeSort(nums, 0, nums.length - 1);
    }

    private int mergeSort(int[] nums, int start, int end) {
        if (start >= end) return 0;
        int mid = start + (end - start) / 2;
        int cnt = 0;
        cnt += mergeSort(nums, start, mid);
        cnt += mergeSort(nums, mid + 1, end);

        // merge
        int k = 0;
        int[] copy = new int[end - start + 1];
        int i = start, j = mid + 1;
        for (; i <= mid && j <= end;) {
            if (nums[j] < nums[i]) {
                copy[k++] = nums[j++];
                cnt += mid - i + 1;
            } else {
                copy[k++] = nums[i++];
            }
        }

        if (i <= mid) for(; i <= mid; i++) copy[k++] = nums[i];
        if (j <= end) for(; j <= end; j++) copy[k++] = nums[j];

        // copy back
        for (int m = 0; m < end - start + 1; m++) {
            nums[m + start] = copy[m];
        }
        return cnt;
    }
}
```

方法二：离散化树状数组[^method-two]<todo/>

[^method-two]: [方法二：离散化树状数组](https://leetcode-cn.com/problems/shu-zu-zhong-de-ni-xu-dui-lcof/solution/shu-zu-zhong-de-ni-xu-dui-by-leetcode-solution/)
