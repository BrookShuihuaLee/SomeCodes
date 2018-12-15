import sys
def dp(n, k):#eggsNum, floorsNum
    a = [[sys.maxint] * (k + 1) for i in xrange(n + 1)]
    for j in xrange(k + 1): a[1][j] = j
    for i in xrange(2, n + 1):
        a[i][0] = 0
        for j in xrange(1, k + 1):
            for jj in xrange(1, j + 1):
                a[i][j] = min(a[i][j], max(a[i - 1][jj - 1], a[i][j - jj]) + 1)
    return a[n][k]

print 2, 6, dp(2, 6)
print 2, 100, dp(2, 100)