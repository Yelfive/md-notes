# 剑指 Offer 22. 链表中倒数第k个节点

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/lian-biao-zhong-dao-shu-di-kge-jie-dian-lcof)

## Problem

输入一个链表，输出该链表中倒数第k个节点。为了符合大多数人的习惯，本题从1开始计数，即链表的尾节点是倒数第1个节点。

例如，一个链表有 `6` 个节点，从头节点开始，它们的值依次是 `1、2、3、4、5、6`。这个链表的倒数第 `3` 个节点是值为 `4` 的节点。

**示例：**

```
给定一个链表: 1->2->3->4->5, 和 k = 2.

返回链表 4->5.
```

## Solution

通过两个指针 `former` 和 `later` 来创建一个大小为 `k` 的窗口：

1. `former = later = head`
2. 移动 `former = former.next` 直至 `former` 和 `later` 相差 `k`
3. 同时移动 `former` 和 `later`
4. 当 `former` 指针为 `null` 时，表示已经遍历到了链表末尾，此时的 `later` 正好是倒数第 `k` 个节点。

### Java

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
class Solution {
    public ListNode getKthFromEnd(ListNode head, int k) {
        ListNode former = head, later = head;

        for (int i = 0; i < k; i++) former = former.next;

        while (former != null) {
            former = former.next;
            later = later.next;
        }
        return later;
    }
}
```
