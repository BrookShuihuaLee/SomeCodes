import Calculator from './calculator'

test('Calculator test', () => {
    const calculator = new Calculator()
    expect(calculator.run('3')).toBe(3)
    expect(calculator.run('3+5')).toBe(8)
    expect(calculator.run('3+5*(2-1)')).toBe(8)
    expect(calculator.run('3+5*(2-1)/(10-3-2)-4/1')).toBe(0)
    expect(calculator.run('3+5*(2-1)/(10-3-2)-4/1-4*4*4')).toBe(-64)
    expect(calculator.run('8/2')).toBe(4)
})