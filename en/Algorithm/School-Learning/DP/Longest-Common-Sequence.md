# Longest Common SubSequence

Given two character sequences, find the longest common sub sequence.

For example, given two DNA sequence,

```
S1 = ACCGGTCGAGTGCGCGGAAGCCGGCCGAA
S2 = GTCGTTCGGAATGCCGTTGCTCTGTAAA
```

The similarity of the two DNAs can be defined by the LCS of the two sequences.

This problem can be solved by DP(Dynamic Programming).

## DP solution

For two sequences

$$
\begin{aligned}
s_1 &= a_1, a_2, a_3, ..., a_i, ..., a_n \\
s_2 &= b_1, b_2, b_3, ..., b_j, ..., b_m
\end{aligned}
$$

Let $dp(i,j)$ be the LCS of sub-sequences

$$
\begin{aligned}
s_1' &= a_1, a_2, a_3, ..., a_i \\
s_2' &= b_1, b_2, b_3, ..., b_j
\end{aligned}
$$

Then we get the state transfer equation (notice that the index starts from $1$)

$$
dp(i,j) = \left\{
\begin{aligned}
    &0&,&&& i=0 \; or\; j=0 \\
    &dp(i-1,j-1) + 1&,&&& a_i = b_j\\
    &\max\{dp(i-1,j), dp(i, j - 1)\}&,&&& a_i \neq b_j
\end{aligned}
\right.
$$

and $dp(n,m)$ would be the answer.

:::tip Complexity

- Time complexity: $O(nm)$
- Space complexity: $O(nm)$

:::

## Code

```java {4,8-14}
class Solution {
    public int lcsLength(String s1, String s2) {
        int row = s1.length, col = s2.length;
        int[][] dp = new int[row + 1][col + 1];
        // start from 1, for any i,j=0 we get dp=0
        for(int i = 1; i <= row; i++){
            for (int j = 1; j <= col; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else if (dp[i - 1][j] < dp[i][j - 1]) {
                    dp[i][j] = dp[i][j - 1];
                } else {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        return dp[row][col];
    }
}
```

We created an array with dimension $(n + 1) \times (m + 1)$ to  escape from having to check the boundary when `i` or `j` is `0`. Without the extra row or column, we will have to check

```java
// Considering i == 0 or j == 0
if (s1.charAt(i) == s1.charAt(j)) {
    dp[i][j] = (i == 0 || j == 0 ? 0 : dp[i - 1][j - 1]) + 1;
}
```

This check will significantly slow down the computing if the $n$ and $m$ is very large. While on the other hand, the check is not necessary for most of the values when $i, j > 0$.

### Dig Further

We get **length** of LCS in the previous section. What if that's not enough?

Maybe we want more information, like

1. The LCS itself
2. The solution to this problem(how the LCS is reached)

In that case, we just need to expand the code a little by using a two-dimensional array `b`, which is the solution array, to hold the choices we make on line 8 to 14.
After finishing the the `lcsLength`, with the help of `b`, we can build the LCS itself.

Here is the code,

```java {5,10,13,16}
class Solution {
    public String lcs(String s1, String s2) {
        int row = s1.length(), col = s2.length();
        int[][] dp = new int[row + 1][col + 1];
        int[][] b = new int[row + 1][col + 1];
        for (int i = 1; i <= row; i++) {
            for (int j = 1; j <= col; j++) {
                if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                    b[i][j] = 1;
                } else if (dp[i - 1][j] < dp[i][j - 1]) {
                    dp[i][j] = dp[i][j - 1];
                    b[i][j] = 2;
                } else {
                    dp[i][j] = dp[i - 1][j];
                    b[i][j] = 3;
                }
            }
        }

        // Build answer from array b
        int length = dp[row][col];
        char[] chars = new char[length];
        int i = row, j = col;
        while (length > 0) {
            switch (b[i][j]) {
                case 1:
                    chars[--length] = s1.charAt(i - 1);
                    i--;
                    j--;
                    break;
                case 2:
                    j--;
                    break;
                case 3:
                    i--;
                    break;
            }
        }
        return new String(chars);
    }
}
```

::: tip
We use value of `b[i][j]` equals

- `1` indicates $a_i=b_j$
- `2` indicates $dp(i, j)$ comes from $\{a_1,...,a_i\}$ and $\{b_1,...,b_{j-1}\}$
- `3` indicates $dp(i, j)$ comes from $\{a_1,...,a_{i - 1}\}$ and $\{b_1,...,b_j\}$

Finally, for better SE(Software Engineering),
`1, 2, 3` should be replaced with human readable constant such as `B_EQUALS = 1`, `B_TOP = 2`, `B_LEFT = 3`.
:::

Running against the example in the beginning, we will get the answer

```
GTCGTCGGAAGCCGGCCGAA
```

### Similar Problems

1. [LeetCode 1035. Uncrossed Lines](https://leetcode.com/problems/uncrossed-lines/)
