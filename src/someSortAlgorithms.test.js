import {
    randRange,
    bubbleSort,
    insertionSort,
    selectionSort,
    quickSort,
    mergeSort,
    mergeSortNoRecursion,
} from './someSortAlgorithms'

function sysSort(a) {
    return a.sort((x, y) => x - y)
}

function compareWithSysSort(sort, a) {
    expect(sort([...a])).toEqual(sysSort([...a]))
}

const sortFuncs = [
    bubbleSort,
    insertionSort,
    selectionSort,
    quickSort,
    mergeSort,
    mergeSortNoRecursion,
]

for (const sort of sortFuncs) {
    test(`${sort.name} normal`, () => {
        for (const a of [
            [],
            [1],
            [2, 1],
            [9, 0, 1],
            [2, 1, 5, 6, 6, 5, 9, 0, 1],
        ]) compareWithSysSort(sort, a)
    })
}

for (const sort of sortFuncs) {
    const a = Array(9999).fill(null).map(() => randRange(0, 1024))
    test(`${sort.name} random`, () => compareWithSysSort(sort, a))
}