# 剑指 Offer 25. 合并两个排序的链表

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/he-bing-liang-ge-pai-xu-de-lian-biao-lcof)

## Problem

输入两个递增排序的链表，合并这两个链表并使新链表中的节点仍然是递增排序的。

**示例1：**

```
输入：1->2->4, 1->3->4
输出：1->1->2->3->4->4
```

**限制：**

```
0 <= 链表长度 <= 1000
```

## Solution

```java {11}
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode h = new ListNode(0),
        ListNode t = h;

        while(l1 != null && l2 != null) {
            if (l1.val > l2.val) {
                t.next = l2;
                l2 = l2.next;
                t = t.next;
            } else {
                t.next = l1;
                l1 = l1.next;
                t = t.next;
            }
        }
        if (l1 != null) t.next = l1;
        if (l2 != null) t.next = l2;
        return h.next;
    }
}
```

:::tip

11 行使用一个虚拟的头节点 `h`，可以省去头结点是否初始化的判定。最后输出 `h.next`。

:::