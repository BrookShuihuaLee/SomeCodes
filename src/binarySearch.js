export function binarySearch (a, v) {
    let iBegin = 0
    let iEnd = a.length

    while (iBegin < iEnd) {
        const iMid = (iBegin + iEnd) >> 1
        if (v < a[iMid]) iEnd = iMid
        else if (a[iMid] < v) iBegin = iMid + 1
        else return iMid 
    }

    return -1
}

export function lowerBound (a, v) {
    let iBegin = 0
    let iEnd = a.length

    while (iBegin < iEnd) {
        const iMid = (iBegin + iEnd) >> 1
        if (a[iMid] < v) iBegin = iMid + 1
        else iEnd = iMid
    }

    return iBegin
}

export function upperBound (a, v) {
    let iBegin = 0
    let iEnd = a.length

    while (iBegin < iEnd) {
        const iMid = (iBegin + iEnd) >> 1
        if (a[iMid] <= v) iBegin = iMid + 1
        else iEnd = iMid
    }

    return iBegin - 1
}