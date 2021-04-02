# 剑指 Offer 57 - II. 和为s的连续正数序列

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof)

## Problem

输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

**示例 1：**

```
输入：target = 9
输出：[[2,3,4],[4,5]]
```

**示例 2：**

```
输入：target = 15
输出：[[1,2,3,4,5],[4,5,6],[7,8]]
```

**限制：**

```
1 <= target <= 10^5
```

## Solution

本题可以使用解法：

1. 暴力搜索
2. 滑动窗口
3. 双指针
4. [**数学求根**](https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof/solution/mian-shi-ti-57-ii-he-wei-sde-lian-xu-zheng-shu-x-2/)

以下为滑动窗口求解：

```java
class Solution {
    public int[][] findContinuousSequence(int target) {
        int max = target / 2 + 1;
        List<int[]> res = new ArrayList<>();
        int sum = 0, cnt = 0;
        for (int i = 1; i <= max; i++) {
            sum += i;
            cnt++;
            while (sum > target) {
                sum -= (i - cnt + 1);
                cnt--;
            }
            if (sum == target) {
                int[] tmp = new int[cnt];
                for (int j = cnt; j > 0; j--) {
                    tmp[cnt - j] = i - j + 1;
                }
                res.add(tmp);
            }
        }
        return res.toArray(new int[res.size()][]);
    }
}
```

时间复杂度：<todo/>
