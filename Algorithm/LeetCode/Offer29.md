# 剑指 Offer 29. 顺时针打印矩阵

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/shun-shi-zhen-da-yin-ju-zhen-lcof)

## Problem

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

**示例 1**：

```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```

**示例 2：**

```
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```

**限制：**

```
0 <= matrix.length <= 100
0 <= matrix[i].length <= 100
```

## Solution

### 1. 打印路径

- 时间复杂度 $O(nm)$
- 空间复杂度 $O(nm)$

```java {12,26}
class Solution {
    public int[] spiralOrder(int[][] matrix) {
        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) return new int[]{};

        int row = matrix.length;
        int col = matrix[0].length;
        int total = row * col;
        int[] arr = new int[total];
        boolean[][] visited = new boolean[row][col];

        // Indicates {row, column} step toward right, down, left, up respectively
        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int directionIndex = 0;

        int i = 0, j = 0;
        for (int k = 0; k < total; k++) {
            arr[k] = matrix[i][j];
            visited[i][j] = true;

            int oldI = i;
            int oldJ = j;
            i += directions[directionIndex][0];
            j += directions[directionIndex][1];

            if (i >= row || i < 0 || j >= col || j < 0 || visited[i][j]) {
                directionIndex = (directionIndex + 1) % 4;
                i = oldI + directions[directionIndex][0];
                j = oldJ + directions[directionIndex][1];
            }
        }
        return arr;
    }
}
```

### 2. 按层模拟

```java

```
