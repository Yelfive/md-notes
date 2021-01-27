# N-Queen Problem

```c
#include <stdio.h>
#include <stdlib.h>

#define N 10

int x[N];

int main (int argc, char ** args) {
    int bound(int);
    void backtrack(int);
    void output();

    backtrack(1);

    //output();
    return 0;
}

/**
 * Whether within boundary
 */
int bound(int row) {
    for (int i = 0; i < row; i++) {
        if (abs(i - row) == abs(x[i] - x[row]) || x[row] == x[i]) {
            return 0;
        }
    }
    return 1;
}

void output() {
    printf("Row\tColumn\t\n");
    for (int i = 0; i < N; i++) {
        printf("%d\t%d\n", i, x[i]);
    }
}

void backtrack(int depth) {
    printf("depth: %d\n", depth);
    if (depth >= N) {
        // output
        output();
        exit(0);
    } else {
        for (int i = 0; i < N; i++) {
             // x[depth] will always update until it reaches the correct {column}
            x[depth] = i;
            if (bound(i)) backtrack(depth + 1);
        }
    }
}
```
