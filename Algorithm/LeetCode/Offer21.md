# 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/diao-zheng-shu-zu-shun-xu-shi-qi-shu-wei-yu-ou-shu-qian-mian-lcof)

## Problem

输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。

**示例：**

```
输入：nums = [1,2,3,4]
输出：[1,3,2,4] 
注：[3,1,2,4] 也是正确的答案之一。
```

**提示：**

```
0 <= nums.length <= 50000
1 <= nums[i] <= 10000
```

## Solution

**思路：** 左右双指针。左值为偶、右值为奇时，交换；否则移动指针。

```java
class Solution {
    public int[] exchange(int[] nums) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            if ((nums[left] & 1) == 1) {
                left++;
            } else if ((nums[right] & 1) == 0) {
                right--;
            } else {
                int tmp = nums[left];
                nums[left] = nums[right];
                nums[right] = tmp;
            }
        }
        return nums;
    }
}
```

:::tip
判断奇偶时，可以与 `1` 按位与 `&`：

```java
if ((n & 1) == 1) {
    // odd
} else {
    // even
}
```

:::
