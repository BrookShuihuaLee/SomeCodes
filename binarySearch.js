function binarySearch (a, target) {
    var iBegin = 0,
        iEnd = a.length,
        iMid;
    while (iBegin < iEnd) {
        iMid = (iBegin + iEnd) >> 1;
        if (a[iMid] > target) iEnd = iMid;
        else if (a[iMid] < target) iBegin = iMid + 1;
        else return iMid;
    }
    return -1;
}

function lowerBound (a, target) {
    var iBegin = 0,
        iEnd = a.length,
        iMid;
    while (iBegin < iEnd) {
        iMid = (iBegin + iEnd) >> 1;
        if (a[iMid] < target) iBegin = iMid + 1;
        else iEnd = iMid;
    }
    return iBegin;
};

function upperBound (a, target) {
    var iBegin = 0,
        iEnd = a.length,
        iMid;
    while (iBegin < iEnd) {
        iMid = (iBegin + iEnd) >> 1;
        if (a[iMid] <= target) iBegin = iMid + 1;
        else iEnd = iMid;
    }
    return iBegin - 1;
}

if (require.main === module) (function () {
    console.log([1], lowerBound([1], 0));
    console.log([1, 2, 4, 4, 4, 4, 5, 6, 9], lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 4));
    console.log([1, 2, 4, 4, 4, 4, 5, 6, 9], upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 4));

    console.log([1, 2, 4, 4, 4, 4, 5, 6, 9], lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 1));
    console.log([1, 2, 4, 4, 4, 4, 5, 6, 9], upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 9));

    console.log([1, 2, 4, 4, 4, 4, 5, 6, 9], lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 3));
    console.log([1, 2, 4, 4, 4, 4, 5, 6, 9], upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 3));
})();