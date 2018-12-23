function clamp(v, vMin, vMax) {
    return Math.max(vMin, Math.min(vMax, v))
}

export function swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]]
}

export function randRange(vBegin, vEnd) {
    return ((vEnd - vBegin) * Math.random() | 0) + vBegin
}

// best
export function findKthLargestQuick(a, k) {
    let iBegin = 0
    let iEnd = a.length
    k = clamp(k, 1, a.length)
    for (;;) {
        swap(a, iBegin, randRange(iBegin, iEnd))
        let iBigger = iBegin
        for (let i = iBegin + 1; i < iEnd; i++) {
            if (a[i] > a[iBegin]) swap(a, i, ++iBigger)
        }
        swap(a, iBegin, iBigger)
        const rank = iBigger - iBegin + 1
        if (rank > k) iEnd = iBigger
        else if (rank < k) {
            k -= rank
            iBegin = iBigger + 1
        } else return a[iBigger]
    }
}

export function findKthLargestHeap(a, k) {
    k = clamp(k, 1, a.length)

    const getLeftChildIndex = i => ((i + 1) << 1) - 1
    const getRightChildIndex = i => ((i + 1) << 1)
    const getParentIndex = i => ((i + 1) >> 1) - 1
    function adjust(i, n) {
        for (;;) {
            const iLeft = getLeftChildIndex(i)
            const iRight = getRightChildIndex(i)
            const iSmaller = iRight >= n || a[iLeft] < a[iRight] ? iLeft : iRight
            if (iSmaller >= n || a[i] <= a[iSmaller]) return
            swap(a, i, iSmaller)
            i = iSmaller
        }
    }
    
    for (let i = getParentIndex(k - 1); i >= 0; i--) adjust(i, k)
    for (let i = k; i < a.length; i++) {
        if (a[i] > a[0]) {
            swap(a, i, 0)
            adjust(0, k)
        }
    }

    return a[0]
}