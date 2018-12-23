import random
import heapq
import time

def clamp(v, minV, maxV):
    return max(minV, min(v, maxV))

def swap(a, i, j):
    a[i], a[j] = a[j], a[i]

def findKthLargestQuick(a, k):
    """
    :type a: List[int]
    :type k: int
    :rtype: int
    """
    if not a: return None
    k = clamp(k, 1, len(a))
    iBegin, iEnd = 0, len(a)
    while True:
        swap(a, iBegin, random.randrange(iBegin, iEnd))
        iBigger = iBegin
        for i in range(iBegin + 1, iEnd):
            if a[i] >= a[iBegin]:
                iBigger += 1
                swap(a, iBigger, i)
        swap(a, iBegin, iBigger)
        rank = iBigger - iBegin + 1
        if rank > k: iEnd = iBigger
        elif rank < k:
            iBegin = iBigger + 1
            k -= rank
        else: return a[iBigger]

def findKthLargestHeap(a, k):
    n = len(a)
    k = max(1, min(n, k))
    h = []
    for i in range(k): heapq.heappush(h, a[i])
    for i in range(k, n):
        if a[i] > h[0]:
            heapq.heappop(h)
            heapq.heappush(h, a[i])
    return h[0]

# best
def findKthLargestHeap2(a, k):
    n = len(a)
    k = max(1, min(n, k))
    h = a[:k]
    heapq.heapify(h)
    for i in range(k, n):
        if a[i] > h[0]:
            heapq.heappop(h)
            heapq.heappush(h, a[i])
    return h[0]

if __name__ == '__main__':
    a = list(range(2000))
    random.shuffle(a)
    def run(find):
        allTime = 0
        for i in range(1, len(a) + 1):
            clonedA = a[:]
            startTime = time.time()
            find(clonedA, i)
            allTime += time.time() - startTime
        return allTime

    print('findKthLargestQuick', run(findKthLargestQuick))
    print('findKthLargestHeap', run(findKthLargestHeap))
    print('findKthLargestHeap2', run(findKthLargestHeap2))