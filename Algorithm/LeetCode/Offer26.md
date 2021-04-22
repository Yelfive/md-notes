# 剑指 Offer 26. 树的子结构

## Problem

输入两棵二叉树 $A$ 和 $B$，判断 $B$ 是不是 $A$ 的子结构。(约定空树不是任意一个树的子结构)

$B$ 是 $A$ 的子结构， 即 $A$ 中有出现和 $B$ 相同的结构和节点值。

**例如:**

给定的树 A:

```
     3
    / \
   4   5
  / \
 1   2
```

给定的树 B：

```
   4 
  /
 1
返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。
```

**示例 1：**

```
输入：A = [1,2,3], B = [3,1]
输出：false
```

**示例 2：**

```
输入：A = [3,4,5,1,2], B = [4,1]
输出：true
```

**限制：**

- 0 <= 节点个数 <= 10000

## Solution

思路：

1. 检查当前根是否相同，如果相同则，对比左右结点，如果不同则跳转第2步
2. 分别递归检查 $A.left$ & $B$ || $A.right$ & $B$

```java
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
    public boolean isSubStructure(TreeNode A, TreeNode B) {
        if (A == null || B == null) return false;

        // backtracking
        if (directlyContains(A, B))  return true;
        if (isSubStructure(A.left, B) || isSubStructure(A.right, B)) {
            return true;
        }
        return false;
    }

    private boolean directlyContains(TreeNode A, TreeNode B) {
        if (B == null && A == null) return true;
        else if (B == null) return true;
        else if (A == null) return false;
        return B.val == A.val && directlyContains(A.left, B.left) && directlyContains(A.right, B.right);
    }
    
}
```
