import {dragForce} from '../FluidMechanics.js'

describe('fluid dynamics', function() {
  test('dragForce', function() {
    expect(() => dragForce(undefined, 6, 6, 6)).toThrow()
    expect(() => dragForce(6, [6,6], 6, 6)).toThrow()
    expect(() => dragForce(6, 6, "6", 6)).toThrow()
    expect(() => dragForce(6, 6, 6, {six: 6})).toThrow()
    expect(dragForce(1.05, 4, 1.204, 10)).toBe(-252.84)
    expect(dragForce(1.05, 4, 1.204, 0)).toBe(0)
  })
})
