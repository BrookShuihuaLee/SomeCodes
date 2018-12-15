def minDistance(str1, str2):
    n1, n2 = len(str1), len(str2)
    dp = [[0] * (n2 + 1) for l1 in xrange(n1 + 1)]
    l1 = 0
    for l2 in xrange(n2 + 1): dp[l1][l2] = l2
    l2 = 0
    for l1 in xrange(n1 + 1): dp[l1][l2] = l1
    for l1 in xrange(1, n1 + 1):
        for l2 in xrange(1, n2 + 1):
            if str1[l1 - 1] == str2[l2 - 1]: dp[l1][l2] = dp[l1 - 1][l2 - 1]
            else: dp[l1][l2] = min(dp[l1][l2 - 1], dp[l1 - 1][l2], dp[l1 - 1][l2 - 1]) + 1
    return dp[n1][n2]

def longestCommonSubstring(str1, str2):
    n1, n2 = len(str1), len(str2)
    dp = [[0] * (n2 + 1) for l1 in xrange(n1 + 1)]
    for l1 in xrange(1, n1 + 1):
        for l2 in xrange(1, n2 + 1):
            if str1[l1 - 1] == str2[l2 - 1]: dp[l1][l2] = dp[l1 - 1][l2 - 1] + 1
            else: dp[l1][l2] = max(dp[l1 - 1][l2], dp[l1][l2 - 1])
    cs = []
    l1, l2 = n1, n2
    while l1 and l2:
        if str1[l1 - 1] == str2[l2 - 1]:
            cs.append(str1[l1 - 1])
            l1 -= 1
            l2 -= 1
        elif dp[l1 - 1][l2] > dp[l1][l2 - 1]: l1 -= 1
        else: l2 -= 1
    cs.reverse()
    return ''.join(cs)

print longestCommonSubstring('abbdbbc', 'addcbc')