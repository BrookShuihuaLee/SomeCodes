import sys
def dp(n, k):#eggsNum, floorsNum
    a = [[sys.maxsize] * (k + 1) for i in range(n + 1)]
    for j in range(k + 1): a[1][j] = j
    for i in range(2, n + 1):
        a[i][0] = 0
        for j in range(1, k + 1):
            for jj in range(1, j + 1):
                a[i][j] = min(a[i][j], max(a[i - 1][jj - 1], a[i][j - jj]) + 1)
    return a[n][k]

print(2, 6, dp(2, 6))
print(2, 100, dp(2, 100))