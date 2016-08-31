def heapSort(a):
    leftChild = lambda i: ((i + 1) << 1) - 1
    rightChild = lambda i: leftChild(i) + 1
    father = lambda i: ((i + 1) >> 1) - 1
    def adjust(i, n):
        while True:
            iLeft, iRight = leftChild(i), rightChild(i)
            iBig = iLeft if iRight >= n or a[iLeft] > a[iRight] else iRight
            if iBig >= n or a[iBig] <= a[i]: return
            a[i], a[iBig] = a[iBig], a[i]
            i = iBig
    n = len(a)
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

import random
def quickSort(a):
    def quickSortPart(a, iBegin, iEnd):
        if iEnd - iBegin <= 1: return
        iRandom = random.randrange(iBegin, iEnd)
        a[iBegin], a[iRandom] = a[iRandom], a[iBegin]
        i = iBegin
        for j in xrange(iBegin + 1, iEnd):
            if a[j] < a[iBegin]:
                i += 1
                a[i], a[j] = a[j], a[i]
        a[iBegin], a[i] = a[i], a[iBegin]
        quickSortPart(a, iBegin, i)
        quickSortPart(a, i + 1, iEnd)
    quickSortPart(a, 0, len(a))
    return a

if __name__ == '__main__':
    import random
    for i in xrange(1000):
        l = random.randrange(0, 100)
        a = [random.randrange(0, 100) for x in xrange(l)]
        if sorted(a) != heapSort(a[:]):
            print 'heapSort'
            print a
            print sorted(a)
            print heapSort(a[:])
            break
        if sorted(a) != mergeSort(a[:]):
            print 'mergeSort'
            print a
            print sorted(a)
            print mergeSort(a[:])
            break
        if sorted(a) != quickSort(a[:]):
            print 'quickSort'
            print a
            print sorted(a)
            print quickSort(a[:])
            break