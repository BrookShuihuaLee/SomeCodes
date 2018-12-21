function swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]]
}

export function randRange(vBegin, vEnd) {
    return (
        vBegin > vEnd
            ? randRange(vEnd, vBegin)
            : ((vEnd - vBegin) * Math.random() | 0) + vBegin
    )
}

/**
 * 冒泡排序
 * 平均O(n^2) 最坏O(n^2) 最好O(n) 空间O(1) 稳定
 * @param {number[]} a
 */
export function bubbleSort(a) {
    for (let i = a.length - 1; i > 0; i--) {
        let swapped = false
        for (let j = 0; j < i; j++) {
            if (a[j] > a[j + 1]) {
                swap(a, j, j + 1)
                swapped = true
            }
        }
        if (!swapped) break
    }
    return a
}

/**
 * 插入排序
 * 平均O(n^2) 最坏O(n^2) 最好O(n) 空间O(1) 稳定
 * @param {number[]} a
 */
export function insertionSort(a) {
    for (let i = 1; i < a.length; i++) {
        const v = a[i]
        let j
        for (j = i; j > 0 && a[j - 1] > v; j--) a[j] = a[j - 1]
        a[j] = v
    }
    return a
}

/**
 * 选择排序
 * 平均O(n^2) 最坏O(n^2) 最好O(n^2) 空间O(1) 不稳定
 * @param {number[]} a
 */
export function selectionSort(a) {
    for (let i = a.length - 1; i > 0; i--) {
        let maxIndex = i
        for (let j = 0; j < i; j++) {
            if (a[j] > a[maxIndex]) maxIndex = j
        }
        swap(a, maxIndex, i)
    }
    return a
}

/**
 * 快速排序
 * 平均O(n*log(n)) 最坏O(n^2) 最好O(n*log(n)) 空间O(log(n)) 不稳定
 * @param {number[]} a
 */
export function quickSort(a) {
    const s = [[0, a.length]]
    while (s.length) {
        const [iBegin, iEnd] = s.pop()
        if (iEnd - iBegin <= 1) continue
        swap(a, iBegin, randRange(iBegin, iEnd))
        let iSmaller = iBegin
        for (let i = iBegin + 1; i < iEnd; i++) {
            if (a[i] < a[iBegin]) swap(a, i, ++iSmaller)
        }
        swap(a, iBegin, iSmaller)
        s.push([iBegin, iSmaller], [iSmaller + 1, iEnd])
    }
    return a
}

/**
 * 归并排序
 * 平均O(n*log(n)) 最坏O(n*log(n)) 最好O(n*log(n)) 空间O(n) 稳定
 * @param {number[]} a 
 */
export function mergeSort(a) {
    function merge(fromA, toA, iBegin, iEnd) {
        if (iEnd - iBegin <= 1) return
        const iMid = (iBegin + iEnd) >> 1
        merge(toA, fromA, iBegin, iMid)
        merge(toA, fromA, iMid, iEnd)
        let iLeft = iBegin
        let iRight = iMid
        for (let i = iBegin; i < iEnd; i++) {
            if (iRight === iEnd || iLeft < iMid && fromA[iLeft] <= fromA[iRight]) toA[i] = fromA[iLeft++]
            else toA[i] = fromA[iRight++]
        }
    }
    merge([...a], a, 0, a.length)
    return a
}

/**
 * 归并排序-非递归
 * 平均O(n*log(n)) 最坏O(n*log(n)) 最好O(n*log(n)) 空间O(n) 稳定
 * @param {number[]} a 
 */
export function mergeSortNoRecursion(a) {
    const s = [[[...a], a, 0, a.length, true]]
    while (s.length) {
        const [fromA, toA, iBegin, iEnd, shouldMergePartFirst] = s.pop()
        const iMid = (iBegin + iEnd) >> 1
        if (shouldMergePartFirst) {
            if (iEnd - iBegin <= 1) continue
            s.push(
                [fromA, toA, iBegin, iEnd, false],
                [toA, fromA, iBegin, iMid, true],
                [toA, fromA, iMid, iEnd, true],
            )
        } else {
            let iLeft = iBegin
            let iRight = iMid
            for (let i = iBegin; i < iEnd; i++) {
                if (iRight === iEnd || iLeft < iMid && fromA[iLeft] < fromA[iRight]) toA[i] = fromA[iLeft++]
                else toA[i] = fromA[iRight++]
            }
        }
    }
    return a
}

/**
 * 堆排序   
 * 平均O(n*log(n)) 最坏O(n*log(n)) 最好O(n*log(n)) 空间O(1) 不稳定
 * @param {number[]} a 
 */
export function heapSort(a) {
    const getLeftChildIndex = i => ((i + 1) << 1) - 1
    const getRightChildIndex = i => (i + 1) << 1
    const getParentIndex = i => (i + 1) >> 1
    function adjust(i, n) {
        for(;;) {
            const iLeft = getLeftChildIndex(i)
            const iRight = getRightChildIndex(i)
            const iBigger = iRight >= n || a[iLeft] > a[iRight] ? iLeft : iRight
            if (iBigger >= n || a[iBigger] <= a[i]) return
            swap(a, i, iBigger)
            i = iBigger
        }
    }
    let n = a.length
    for (let i = getParentIndex(n - 1); i >= 0; i--) adjust(i, n)
    while (n > 1) {
        swap(a, 0, --n)
        adjust(0, n)
    }
    return a
}