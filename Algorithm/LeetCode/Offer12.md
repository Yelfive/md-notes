# 剑指 Offer 12. 矩阵中的路径

> 来源：[力扣（LeetCode)](https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof)
>
> 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## Problem

请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。

```
[["a","b","c","e"],
 ["s","f","c","s"],
 ["a","d","e","e"]]
```

但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。

**示例 1：**

```
输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true
```

**示例 2：**

```
输入：board = [["a","b"],["c","d"]], word = "abcd"
输出：false
```

**提示：**

```
1 <= board.length <= 200
1 <= board[i].length <= 200
```

## Solution

采用回溯法，由于路径中一个字母只能经过一次，需要使用一个变量来记录是否经过该字母。因此，定义 `boolean[][] taken`。对于 `taken[i][j]`, `true` 表示已经走过，`false` 表示未走过。

```java
class Solution {
    public boolean exist(char[][] board, String word) {
        if (board.length == 0 || board[0].length == 0) return false;

        int r = board.length, c = board[0].length;
        boolean[][] taken = new boolean[r][c];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (this.backtrack(board, taken, i, j, word, 0)) return true;
            }
        }
        return false;
    }

    public boolean backtrack(
        char[][] board, boolean[][] taken,
        int row, int column,
        String word, int offset
    ) {
        if (offset >= word.length()) return true;

        if (this.bound(board, row, column) && this.constraint(taken, board, row, column, word, offset)) {
            taken[row][column] = true;
            if (
                this.backtrack(board, taken, row - 1, column, word, offset + 1)
                || this.backtrack(board, taken, row, column + 1, word, offset + 1)
                || this.backtrack(board, taken, row + 1, column, word, offset + 1)
                || this.backtrack(board, taken, row, column - 1, word, offset + 1)
            ) return true;
            taken[row][column] = false;
        }
        return false;
    }

    /**
     * Whether within boundary
     */
    private boolean bound(char[][] board, int row, int column) {
        return row >= 0 && row < board.length
             && column >= 0 && column < board[0].length;
    }

    /**
     * Constraint given by the problem
     */
    private boolean constraint(
        boolean[][] taken, char[][] board, int row, int column,
        String word, int offset
    ) {
        return !taken[row][column] && board[row][column] == word.charAt(offset);
    }
}
```

利用 *OOP* 的特点，可以用类的属性 `board`, `taken`, `word` 来避免显示的值传递，可以稍微简化一下代码:

```java
class Solution {
    private boolean[][] taken;
    private char[][] board;
    private String word;

    public boolean exist(char[][] board, String word) {
        if (board.length == 0 || board[0].length == 0) return false;

        int r = board.length, c = board[0].length;
        this.board = board;
        this.word = word;
        this.taken = new boolean[r][c];
        for (int i = 0; i < r; i++) {
            for (int j = 0; j < c; j++) {
                if (this.backtrack(i, j, 0)) return true;
            }
        }
        return false;
    }

    public boolean backtrack(int row, int column, int offset) {
        if (offset >= word.length()) return true;

        if (this.bound(row, column) && this.constraint(row, column, offset)) {
            taken[row][column] = true;
            if (
                this.backtrack(row - 1, column, offset + 1)
                || this.backtrack(row, column + 1, offset + 1)
                || this.backtrack(row + 1, column, offset + 1)
                || this.backtrack(row, column - 1, offset + 1)
            ) return true;
            taken[row][column] = false;
        }
        return false;
    }

    /**
     * Whether within boundary
     */
    private boolean bound(int row, int column) {
        return row >= 0 && row < board.length
             && column >= 0 && column < board[0].length;
    }

    /**
     * Constraint given by the problem
     */
    private boolean constraint(int row, int column, int offset) {
        return !taken[row][column] && board[row][column] == word.charAt(offset);
    }
}
```
