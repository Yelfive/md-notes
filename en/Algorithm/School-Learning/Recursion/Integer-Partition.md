# 整数划分 (Integer Partition)

设 $q(n, m)$ 表示将整数 $n$ **不大于** $m$ 的划分个数, 即划分中，最大整数不超过 $m$,

则有

$$
q(n, n) = 1 + q(n, n - 1)               \tag{1}
$$

且 $\forall n > m > 1$ 有

$$
q(n, m) = q(n, m - 1) + q(n - m, m)     \tag{2}
$$

> 对于 $q(n,m)$ 有两种情况：
>
> 1. **划分中*不包含* $m$**, 此时划分中最大整数不超过 $m - 1$，即
>       $$q(n, m-1)$$
> 2. **划分中*包含* $m$**, 此时所有划分均有 $\left\{ m, x_1, x_2, ... \right\}$,
>   其中 $\left\{x_1, x_2, ...\right\}$ 为 $n-m$ 的划分,
>   且最大值不超过 $m$，即
>       $$q(n-m, m)$$
>
> 于是得到公式$(2)$

于是有

$$
p(n, m)=\begin{cases}
1,      \qquad n=m=1\\
q(n,n), \qquad n<m\\
1+q(n, n - 1),\qquad n=m\\
q(n, m-1) + q(n-m,m), \qquad n>m>1
\end{cases}
$$
