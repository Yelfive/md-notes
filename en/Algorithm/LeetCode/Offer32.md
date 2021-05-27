# 剑指 Offer 32 - II. 从上到下打印二叉树 II

## Problem

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。[^offer]

**例如:**

给定二叉树: `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```
[
  [3],
  [9,20],
  [15,7]
]
```

**提示：**

```
节点总数 <= 1000
```

## Solution

使用队列而非堆栈。进行深度优先搜索（BFS，Breadth First Search）。

```java {17-24}
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        LinkedList<TreeNode> queue = new LinkedList<>();
        if (root != null) queue.add(root);
        while(!queue.isEmpty()) {
            List<Integer> list = new ArrayList<>();
            LinkedList<TreeNode> children = new LinkedList<>();
            while (!queue.isEmpty()) {
                TreeNode node = queue.pop();
                list.add(node.val);
                if (node.left != null) children.add(node.left);
                if (node.right != null) children.add(node.right);
            }
            queue = children;
            res.add(list);
        }
        return res;
    }
}
```

其中 ==16-25== 行可以进行优化，使用 `queue` 代替 `children` 变量：

```java
for (int i = queue.size(); i > 0; i--) {
    TreeNode node = queue.pop();
    list.add(node.val);
    if (node.left != null) queue.add(node.left);
    if (node.right != null) queue.add(node.right);
}
```

[^offer]: [力扣（LeetCode）](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof)
