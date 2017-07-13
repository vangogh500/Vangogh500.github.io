import {drag, rudder, angularDrag} from '../FluidMechanics.js'

describe('fluid dynamics', function() {
  test('drag', function() {
    expect(() => drag('6', 6, 6, 6)).toThrow()
    expect(() => drag(6, [6,6], 6, 6)).toThrow()
    expect(() => drag(6, 6, "6", 6)).toThrow()
    expect(() => drag(6, 6, 6, {six: 6})).toThrow()
    expect(drag(1.05, 4, 1.204, 10)).toBe(-252.84)
    expect(drag(1.05, 4, 1.204, 0)).toBe(0)
  })
  test('rudder', function() {
    expect(() => rudder()).toThrow()
    expect(() => rudder('1')).toThrow()
    expect(() => rudder(1, '1')).toThrow()
    expect(() => rudder(1, 1, '1')).toThrow()
    expect(rudder(1,1,1)).toBe(1)
    expect(rudder(1,2,3)).toBe(6)
  })
  test('angularDrag', function() {
    expect(() => angularDrag()).toThrow()
    expect(() => angularDrag('1')).toThrow()
    expect(() => angularDrag(1, '1')).toThrow()
    expect(() => angularDrag(1,1,'1')).toThrow()
    expect(() => angularDrag(1,1,1)).toThrow()
    expect(angularDrag(1,1,1,1)).toBe(3)
    expect(angularDrag(2,1,1,1)).toBe(4)
  })
})
