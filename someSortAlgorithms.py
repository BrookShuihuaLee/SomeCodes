def heapSort(a):
    n = len(a)
    leftSon = lambda(i): ((i + 1) << 1) - 1
    rightSon = lambda(i): leftSon(i) + 1
    father = lambda(i): ((i + 1) >> 1) - 1
    def adjust(i, n):
        while True:
            iLeft, iRight = leftSon(i), rightSon(i)
            if iLeft >= n: return
            iBig = iLeft if iRight >= n or a[iLeft] > a[iRight] else iRight
            if a[iBig] < a[i]: return
            a[i], a[iBig] = a[iBig], a[i]
            i = iBig
    for i in xrange(father(n - 1), -1, -1): adjust(i, n)
    while n > 1:
        a[0], a[n - 1] = a[n - 1], a[0]
        n -= 1
        adjust(0, n)
    return a

def mergeSort(a):
    def mergeSortPart(old, iBegin, iEnd, now):
        if iEnd - iBegin <= 1: return
        iMid = (iBegin + iEnd) >> 1
        mergeSortPart(now, iBegin, iMid, old)
        mergeSortPart(now, iMid, iEnd, old)
        iLeft, iRight = iBegin, iMid
        for i in xrange(iBegin, iEnd):
            if iRight == iEnd or iLeft != iMid and old[iLeft] < old[iRight]:
                now[i] = old[iLeft]
                iLeft += 1
            else:
                now[i] = old[iRight]
                iRight += 1
    mergeSortPart(a[:], 0, len(a), a)
    return a

if __name__ == '__main__':
    import random
    for i in xrange(100):
        l = random.randrange(0, 100)
        a = [random.randrange(0, 100) for x in xrange(l)]
        if sorted(a) != heapSort(a[:]):
            print a, sorted(a), heapSort(a[:])
            break
        if sorted(a) != mergeSort(a[:]):
            print a, sorted(a), mergeSort(a[:])
            break