# 最大公约数（Greatest Common Divider）

设 $z$ 为 $x$， $y$ 的任意公约数，则 $x$，$y$ 的任意线性组合，可以被 $z$ 整除，即

$$(a\cdot x + b \cdot y) \mod  z = 0$$

设 $x > y$，商 $n$，余数 $r$ 满足

$$x \div y = n ... r \tag{1-1}$$

则

$$
\begin{aligned}
x = n\cdot y+r \\
\therefore r = x - n \cdot y
\end{aligned}
$$

故余数 $r$ 同样能被 $z$ 整除，即 $r < y < x$ 有相同的余数 $z$。
取 $x=y$ 与 $y=r$ 重复式$(1-1)$，不断缩小范围。当

$$
x' \div y' = n' ... 0
$$

即余数为 $0$ 时， $y'$ 为 $\{x', y'\}$ 的最大公约数。

:::tip
设 $r_i$ 为第 $i$ 次相除的余数，满足递推公式

$$ r_i = r_{i-2} \mod r_{i-1} $$

则对于集合

$$
\{x, y, r_1, r_2, ..., r_m, 0\}
$$

中的元素可以被 $\forall z$ 整除，且 $r_{m+1} = 0$

$$
\therefore \gcd(x,y) = r_m
$$
:::

## Code

```java
public class Solution {
    public int gcd(int x, int y) {
        // Ensures x >= y
        if (x < y) {
            int tmp = x;
            x = y;
            y = tmp;
        }

        while(x % y != 0) {
            int r = x % y;
            x = y;
            y = r;
        }

        return y;
    }
}
```
