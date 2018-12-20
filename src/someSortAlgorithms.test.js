import {
    randRange,
    bubbleSort,
    insertionSort,
    selectionSort,
    quickSort,
    mergeSort,
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
]

test('normal sort', () => {
    for (const a of [
        [],
        [1],
        [2, 1],
        [9, 0, 1],
        [2, 1, 5, 6, 6, 5, 9, 0, 1],
    ]) {
        for (const sort of sortFuncs) compareWithSysSort(sort, a)
    }
})

test('random sort', () => {
    for (let i = 0; i < 100; i++) {
        const a = Array(randRange(0, 1024)).fill(null).map(() => randRange(0, 1024))
        for (const sort of sortFuncs) compareWithSysSort(sort, a)
    }
})