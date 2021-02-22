import sum from './sum.js'

// Function takes in 2 numbers, return sum
describe('Testing the sum module', () => {
    // pass in 2 num, 1 and 1, expect sum of 2
    test('sum of two positive integers', () => {
        expect(sum(1, 1)).toBe(2)
    })
    // -1 and 1, expect 0
    test('sum of positive and negative integer', () => {
        expect(sum(-1, 1)).toBe(0)
    })
    // .5 and 1, expect 1.5
    test('sum of decimals', () => {
        expect(sum(.5, 1)).toBe(1.5)
    })
    //'1' and 2, expect 3
    test('sum of string and positive integer', () => {
        expect(sum('1', 2)).toBe(3)
    })

    test('sum of string and positive integer', () => {
        expect(sum('ten', 1)).toBe(NaN)
    })

    test('sum of 1 number', () => {
        expect(sum(1)).toBe(1)
    })
})



