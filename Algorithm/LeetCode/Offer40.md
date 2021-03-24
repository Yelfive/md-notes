# 剑指 Offer 40. 最小的k个数

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof)

## Problem

输入整数数组 `arr` ，找出其中最小的 $k$ 个数。例如，输入 `4、5、1、6、2、7、3、8` 这8个数字，则最小的4个数字是 `1、2、3、4`。

**示例 1：**

```
输入：arr = [3,2,1], k = 2
输出：[1,2] 或者 [2,1]
```

**示例 2：**

```
输入：arr = [0,1,2,1], k = 1
输出：[0]
```

**限制：**

```
0 <= k <= arr.length <= 10000
0 <= arr[i] <= 10000
```

## Solution

本题有3种解法：

1. 排序
2. PriorityQueue
3. 快排思想

### PriorityQueue

采用最大堆（也称为大根堆），每次只需比较堆顶元素是否更小，否则弹出（`poll`），插入（`add/offer`）新元素。

```java {3,7-12}
class Solution {
    public int[] getLeastNumbers(int[] arr, int k) {
        if (k == 0) return new int[0];

        int[] res = new int[k];

        PriorityQueue<Integer> queue = new PriorityQueue<>(new Comparator<Integer>() {
            @Override
            public int compare(Integer o1, Integer o2) {
                return o2 - o1; // Max heap
            }
        });

        for (int i = 0; i < k; i++) queue.add(arr[i]);

        for (int i = k; i < arr.length; i++) {
            if (queue.peek() > arr[i]) {
                queue.poll();
                queue.add(arr[i]);
            }
        }

        for(int i = 0; i < k; i++) res[k - i - 1] = queue.poll(); 
        return res;
    }
}
```

其中 *第3行* 为异常处理，*第 7-12 行* 可以使用箭头函数简化

```java
PriorityQueue<Integer> queue = new PriorityQueue<>((o1, o2) -> o2 - o1);
```

**复杂度分析[^heap]：**

- 时间复杂度：$O(n \log k)$，其中 $n$ 是数组 `arr` 的长度。由于大根堆实时维护前 $k$ 小值，所以插入删除都是 $O(\log k)$ 的时间复杂度，最坏情况下数组里 $n$ 个数都会插入，所以一共需要 $O(n \log k)$ 的时间复杂度。

- 空间复杂度：$O(k)$，因为大根堆里最多 $k$ 个数。

[^heap]: [作者：LeetCode-Solution](https://leetcode-cn.com/problems/zui-xiao-de-kge-shu-lcof/solution/zui-xiao-de-kge-shu-by-leetcode-solution/)