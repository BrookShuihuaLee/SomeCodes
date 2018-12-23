function clamp(v, vMin, vMax) {
    return Math.max(vMin, Math.min(vMax, v))
}

function swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]]
}

function randRange(vBegin, vEnd) {
    return ((vEnd - vBegin) * Math.random() | 0) + vBegin
}

export function findKthLargest(a, k) {
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