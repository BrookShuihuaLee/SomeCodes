function createRotatedSortedArray(a) {
    const n = a.length

    function findZeroIndex() {
        let iBegin = 0
        let iEnd = n
    
        while (iEnd - iBegin > 1) {
            const vFirst = a[iBegin]
            const vLast = a[iEnd - 1]
            if (vFirst < vLast) break
            const iMid = (iBegin + iEnd) >> 1
            const vMid = a[iMid]
            if (vFirst < vMid) iBegin = iMid + 1
            else {
                iBegin++
                iEnd = iMid + 1
            }
        }

        return iBegin
    }

    const zeroIndex = findZeroIndex()
    const oExt = {
        getRealIndex(i) {
            if (i < 0 || i >= n) return i
            return (zeroIndex + i) % n
        },
        length: n,
    }

    return new Proxy(a, {
        get(o, p) {
            i = Number(p)
            return isNaN(i) ? oExt[p] : o[oExt.getRealIndex(i)]
        },
        set() {},
    })
}

function binarySearch(a, v) {
    let iBegin = 0
    let iEnd = a.length
    
    while (iBegin < iEnd) {
        const iMid = (iBegin + iEnd) >> 1
        if (a[iMid] < v) iBegin = iMid + 1
        else if (v < a[iMid]) iEnd = iMid
        else return iMid
    }

    return -1
}

export function searchInRotated(a, v) {
    a = createRotatedSortedArray(a)
    return a.getRealIndex(binarySearch(a, v))
}

export function searchImmediate(a, v) {
    function compare(va, vb) {
        const delta = Math.abs(va - vb) + 1
        if (va < a[0]) va += delta
        if (vb < a[0]) vb += delta
        return va - vb
    }
    
    let iBegin = 0
    let iEnd = a.length
    while (iBegin < iEnd) {
        const iMid = (iBegin + iEnd) >> 1
        if (compare(a[iMid], v) < 0) iBegin = iMid + 1
        else if (compare(v, a[iMid]) < 0) iEnd = iMid
        else return iMid
    }

    return -1
}

// function search(a, v) {
//     function compare(va, vb) {
//         const delta = Math.abs(va - vb) + 1
//         if (va < a[0]) va += delta
//         if (vb < a[0]) vb += delta
//         return va - vb
//     }
    
//     let iBegin = 0
//     let iEnd = a.length
//     while (iBegin < iEnd) {
//         if (a[iBegin] === a[iEnd - 1]) {
//             if (a[iBegin] === v) return true
//             iBegin++
//             iEnd--
//             continue
//         }
//         if (a[0] === a[iEnd - 1]) {
//             iEnd--
//             continue
//         }
//         const iMid = (iBegin + iEnd) >> 1
//         if (compare(a[iMid], v) < 0) iBegin = iMid + 1
//         else if (compare(v, a[iMid]) < 0) iEnd = iMid
//         else return true
//     }

//     return false
// }