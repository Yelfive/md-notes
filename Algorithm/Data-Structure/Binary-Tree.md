# Binary Tree

## Method 1: Notation Using Complete Tree

Convert string to tree, vise versa. Using complete binary notation.

**Example:**

```
[1,2,3,null,null,4,5]

    1
  /   \
2      3
     /  \
    4    5
```

**Code:**

```java
import java.util.HashMap;
import java.util.LinkedList;
import java.util.Map;
import java.util.Queue;


public class Codec {
    public static class TreeNode {
        int val;
        TreeNode left;
        TreeNode right;
        TreeNode(int x) { val = x; }
    }

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {

        if (root == null) return  "";
        StringBuilder sb = new StringBuilder();
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        TreeNode node = null;
        while (!queue.isEmpty()) {
            node = queue.remove();
            if (node.left != null) queue.add(node.left);
            if (node.right != null) queue.add(node.right);
        }
        TreeNode last = node;

        queue.add(root);
        while (!queue.isEmpty()) {
            node = queue.remove();
            sb.append(",").append(node == null ? "null" : node.val);
            if (node == last) {
                break;
            } else if (node == null) {
                queue.add(null);
                queue.add(null);
            } else {
                queue.add(node.left);
                queue.add(node.right);
            }
        }
        return "[" + sb.substring(1, sb.length()) + "]";
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        String[] parts = data.substring(1, data.length() - 1).split(",");
        TreeNode node, parent;
        Map<Integer, TreeNode> map = new HashMap<>();
        for (int i = 0; i < parts.length; i++) {
            String val = parts[i];
            if ("null".equals(val)) continue;
            node = new TreeNode(Integer.parseInt(val));
            map.put(i, node);
            if (i != 0) {
                parent = map.get((i - 1) >> 1);
                if ((i & 1) == 1) parent.left = node;
                else parent.right = node;
            }
        }
        return map.get(0);
    }
}
```

**Test it:**

```java
public class TestBinaryTree {
    public static void main(String[] args) {
        Codec codec = new Codec();
        
        serialize1 = "[1,2,3,null,null,4,5]";

        TreeNode root = codec.deserialize(serialize1);
        String serialize2 = codec.serialize(root);

        System.out.println(serialize1 == serialize2);
    }
}
```

## Method 2: Notation Not Using Complete Tree

```
[1,null,2,null,3]
  1
    \
      2
        \
          3

Compared with the complete tree notation:
[1,null,2,null,null,null,3]
```

```java
public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        if (root == null) return  "";
        StringBuilder sb = new StringBuilder("[");
        Queue<TreeNode> queue = new LinkedList<>();
        queue.add(root);
        TreeNode node;
        while (!queue.isEmpty()) {
            LinkedList<TreeNode> list = new LinkedList<>();
            while (!queue.isEmpty()) {
                node = queue.remove();
                if (node != null) {
                    list.add(node.left);
                    list.add(node.right);
                    sb.append(node.val);
                } else {
                    sb.append("null");
                }
                sb.append(",");
            }
            queue = list;
        }
        // remove tailing `null`
        while (sb.length() > 5 && "null,".equals(sb.substring(sb.length() - 5, sb.length()))) {
            sb.delete(sb.length() - 5, sb.length());
        }
        sb.deleteCharAt(sb.length() - 1);
        sb.append("]");
        return sb.toString();
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        if (data == null || data.length() == 0) return null;

        String[] parts = data.substring(1, data.length() - 1).split(",");

        int i = 0;
        Queue<TreeNode> queue = new LinkedList<>(); // non-null node of one layer
        TreeNode node, root = strToNode(parts[i++]);
        if (root != null) queue.add(root);
    
        while (!queue.isEmpty()) {
            Queue<TreeNode> list = new LinkedList<>();
            while (!queue.isEmpty()) {
                node = queue.remove();

                if (i < parts.length)
                    node.left = strToNode(parts[i++]);
                if (i < parts.length)
                    node.right = strToNode(parts[i++]);

                if (node.left != null) list.add(node.left);
                if (node.right != null) list.add(node.right);
            }
            queue = list; 
        }
        return root;
    }

    TreeNode strToNode(String str) {
        return "null".equals(str) ? null : new TreeNode(Integer.parseInt(str));
    }
}
```
