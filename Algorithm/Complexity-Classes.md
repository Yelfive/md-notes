# 复杂度分类（Complexity Classes）

 ![File:P np np-complete np-hard.svg](images/Comlexity-classes/800px-P_np_np-complete_np-hard.svg.png)

<center> <em>From wikipedia</em></center>

## P

P stands for **P**olynomial problem, meaning that the problem can be solved by a deterministic Turing machine using a polynomial amount of computation time, or polynomial time.

Polynomial time complexity scale means for time complexity such as
$O(n)$, $O(n\log{n})$ and $O(n^a)$.

## NP

多项式复杂程度的非确定性问题（**N**ondeterministic **P**olynomial time），指可以在多项式时间内验证答案的问题。这类问题是否能在多项式时间内求解，是一个数学难题。

## NPC

NP完全问题（NP Complete），它满足

1. 属于 NP 问题
2. 所有的NP问题都可以约化到它

**第一个 NPC 问题：**

逻辑电路问题：给定一个 逻辑电路，问是否存在一种输入使输出为 `True`。

所有的 NP 问题都可以约化到逻辑电路问题。

其他 NPC 问题：

- Hamilton 回路
- TSP问题

## NP-hard

NP难问题，它满足 NP 问题的第2条（所有的NP问题都可以约化到它），但不满足第一条。

$$
NPC \subset NP-hard
$$

## NP-easy

> At most as hard as NP, but not necessarily in NP.

难度不超过 NP 的问题，这个问题可以不是 NP 问题。

## NP-equivalent

> Decision problems that are both NP-hard and NP-easy, but not necessarily in NP.

既是 NP-hard 又是 NP-easy，但不一定是 NP 问题。

## NP-intermediate

>If P and NP are different, then there exist decision problems in the region of NP that fall between P and the NP-complete problems. (If P and NP are the same class, then NP-intermediate problems do not exist because in this case every NP-complete problem would fall in P, and by definition, every problem in NP can be reduced to an NP-complete problem.)

## References

1. [NP-hardness - Wikipedia](https://en.wikipedia.org/wiki/NP-hardness)
