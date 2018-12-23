import {
    swap,
    randRange,
    findKthLargestQuick,
    findKthLargestHeap,
} from './findKthLargest'

const funcs = [
    findKthLargestQuick,
    findKthLargestHeap,
]

for (const func of funcs) {
    test(`${func.name} normal`, () => {
        expect(func([1], 1)).toBe(1)
        expect(func([2, 1], 2)).toBe(1)
        expect(func([2, 1], 1)).toBe(2)
        expect(func([9, 0, 1], 3)).toBe(0)
        expect(func([9, 0, 1], 2)).toBe(1)
        expect(func([9, 0, 1], 1)).toBe(9)
        expect(func([2, 1, 5, 6, 6, 5, 9, 0, 1], 9)).toBe(0)
        expect(func([2, 1, 5, 6, 6, 5, 9, 0, 1], 8)).toBe(1)
        expect(func([2, 1, 5, 6, 6, 5, 9, 0, 1], 7)).toBe(1)
        expect(func([2, 1, 5, 6, 6, 5, 9, 0, 1], 6)).toBe(2)
        expect(func([2, 1, 5, 6, 6, 5, 9, 0, 1], 5)).toBe(5)
        expect(func([2, 1, 5, 6, 6, 5, 9, 0, 1], 4)).toBe(5)
        expect(func([2, 1, 5, 6, 6, 5, 9, 0, 1], 3)).toBe(6)
        expect(func([2, 1, 5, 6, 6, 5, 9, 0, 1], 2)).toBe(6)
        expect(func([2, 1, 5, 6, 6, 5, 9, 0, 1], 1)).toBe(9)
    })
}

for (const func of funcs) {
    const a = Array(1000).fill(null).map((_, i) => i)
    for (let i = 0; i < a.length; i++) swap(a, i, randRange(i, a.length))
    test(`${func.name} random`, () => {
        for (let i = 0; i < a.length; i++) expect(func(a.slice(), i + 1)).toBe(a.length - 1 - i)
    })
}