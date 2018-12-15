import {
    binarySearch,
    lowerBound,
    upperBound,
} from './binarySearch'

test('binarySearch test', () => {
    expect(binarySearch([], 0)).toBe(-1)
    expect(binarySearch([0], -1)).toBe(-1)
    expect(binarySearch([0], 1)).toBe(-1)
    expect(binarySearch([0], 0)).toBe(0)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 0)).toBe(-1)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 1)).toBe(0)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 2)).toBe(1)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 3)).toBe(-1)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 4)).toBe(4)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 5)).toBe(6)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 6)).toBe(7)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 7)).toBe(-1)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 8)).toBe(-1)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 9)).toBe(8)
    expect(binarySearch([1, 2, 4, 4, 4, 4, 5, 6, 9], 10)).toBe(-1)
})

test('lowerBound test', () => {
    expect(lowerBound([], 0)).toBe(0)
    expect(lowerBound([0], -1)).toBe(0)
    expect(lowerBound([0], 1)).toBe(1)
    expect(lowerBound([0], 0)).toBe(0)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 0)).toBe(0)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 1)).toBe(0)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 2)).toBe(1)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 3)).toBe(2)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 4)).toBe(2)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 5)).toBe(6)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 6)).toBe(7)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 7)).toBe(8)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 8)).toBe(8)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 9)).toBe(8)
    expect(lowerBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 10)).toBe(9)
})

test('upperBound test', () => {
    expect(upperBound([], 0)).toBe(-1)
    expect(upperBound([0], -1)).toBe(-1)
    expect(upperBound([0], 1)).toBe(0)
    expect(upperBound([0], 0)).toBe(0)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 0)).toBe(-1)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 1)).toBe(0)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 2)).toBe(1)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 3)).toBe(1)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 4)).toBe(5)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 5)).toBe(6)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 6)).toBe(7)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 7)).toBe(7)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 8)).toBe(7)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 9)).toBe(8)
    expect(upperBound([1, 2, 4, 4, 4, 4, 5, 6, 9], 10)).toBe(8)
})