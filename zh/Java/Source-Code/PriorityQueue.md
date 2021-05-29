---
recommend: true
---

# Java 源码: PriorityQueue

通过 `java.util.Comparator` 接口创建大根堆、小根堆。

PriorityQueue 把堆顶放在下标为 `0` 的位置，当 `offer` 插入一个值时，将折半判断是否放在 1/2 元素前面，只保证最小（大）的元素一定放在 `0` 的位置。

```java
public class PriorityQueue {
    public boolean add(E e) {
        return offer(e);
    }

    public boolean offer(E e) {
        if (e == null)
            throw new NullPointerException();
        modCount++;
        int i = size;
        if (i >= queue.length)
            grow(i + 1);
        size = i + 1;
        if (i == 0)
            queue[0] = e;
        else
            siftUp(i, e);
        return true;
    }

    private void siftUp(int k, E x) {
        if (comparator != null)
            siftUpUsingComparator(k, x);
        else
            siftUpComparable(k, x);
    }

    private void siftUpUsingComparator(int k, E x) {
        while (k > 0) {
            int parent = (k - 1) >>> 1;
            Object e = queue[parent];
            if (comparator.compare(x, (E) e) >= 0)
                break;
            queue[k] = e;
            k = parent;
        }
        queue[k] = x;
    }
}
```

在获取（`poll`）堆顶元素时，返回位置为 0 的元素，同时调用 `siftDown` 方法对堆进行排序，保证堆顶元素为最小元素。

```java
public E poll() {
    if (size == 0)
        return null;
    int s = --size;
    modCount++;
    E result = (E) queue[0];
    E x = (E) queue[s];
    queue[s] = null;
    if (s != 0)
        siftDown(0, x);
    return result;
}

private void siftDown(int k, E x) {
    if (comparator != null)
        siftDownUsingComparator(k, x);
    else
        siftDownComparable(k, x);
}

private void siftDownComparable(int k, E x) {
    Comparable<? super E> key = (Comparable<? super E>)x;
    int half = size >>> 1;        // loop while a non-leaf
    while (k < half) {
        int child = (k << 1) + 1; // assume left child is least
        Object c = queue[child];
        int right = child + 1;
        if (right < size &&
            ((Comparable<? super E>) c).compareTo((E) queue[right]) > 0)
            c = queue[child = right];
        if (key.compareTo((E) c) <= 0)
            break;
        queue[k] = c;
        k = child;
    }
    queue[k] = key;
}
```

## Test

```java
package test;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.PriorityQueue;

public class PriorityQueueTest {

    public static void main(String[] args) {
        PriorityQueue<Integer> minQueue = new PriorityQueue<>(((o1, o2) -> o1 - o2));
        minQueue.add(1);
        minQueue.add(3);
        minQueue.add(4);
        minQueue.add(5);
        printQueue(minQueue);

        minQueue.add(2);

        printQueue(minQueue);
    }

    private static void printQueue(PriorityQueue<Integer> queue) {
        try {
            Field queueField = PriorityQueue.class.getDeclaredField("queue");
            queueField.setAccessible(true);
            Object[] elem = (Object[]) queueField.get(queue);
            System.out.println(Arrays.toString(elem));
        } catch (NoSuchFieldException | IllegalAccessException e) {
            e.printStackTrace();
        }
    }
}

```

输出

```
[1, 3, 4, 5, null, null, null, null, null, null, null]
[1, 2, 4, 5, 3, null, null, null, null, null, null]
```

`Comparator` 使用方法

重写 `compare(T o1, T o2)` 方法，分别返回整型

- $<0$，表示 `o1` “小于” `o2`，此时 `o1` 排在前面
- $=0$，表示 `o1` “等于” `o2`
- $>0$，表示 `o1` “大于” `o2`，此时 `o2` 排在前面

例如，想要得到顺序排列：

```java
@Override
public int compare(Integer o1, Integer o2) {
    return o1 - o2;
}
```

想要得到逆序排列：

```java
@Override
public int compare(Integer o1, Integer o2) {
    return o2 - o1;
}
```

直观来看，返回值 `<0` 表示顺序，`>0` 表示逆序。
