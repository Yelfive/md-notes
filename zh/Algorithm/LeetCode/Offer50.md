# 剑指 Offer 50. 第一个只出现一次的字符

> 来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof)

## Problem

在字符串 `s` 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 `s` 只包含小写字母。

**示例:**

```
s = "abaccdeff"
返回 "b"

s = "" 
返回 " "
```

**限制：**

```
0 <= s 的长度 <= 50000
```

## Solution

### LinkedHashMap

```java
class Solution {
    public char firstUniqChar(String s) {
        LinkedHashMap<Character, Integer> map = new LinkedHashMap<>();
        
        for (int i = 0 ; i < s.length(); i++) {
            char c = s.charAt(i);
            Integer cnt = map.get(c);
            if (cnt == null) cnt = 0;
            map.put(c, cnt + 1);
        }

        for (Character key: map.keySet()) {
            if (map.get(key) == 1) return key;
        }
        return ' ';
    }
}
```

**复杂度分析[^hash-map-complexity]：**

- 时间复杂度：$O(n)$，其中 $n$ 是字符串 $s$ 的长度。我们需要进行两次遍历。
- 空间复杂度：$O(|\Sigma|)$，其中 $\Sigma$ 是字符集，在本题中 $s$ 只包含小写字母，因此 $|\Sigma| \leq 26$。我们需要 $O(|\Sigma|)$ 的空间存储哈希映射。

[^hash-map-complexity]: [LeetCode-Solution](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/solution/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-by-3zqv5/)
