import Force from '../Force.js'
import Vector from '../../Vector.js'

describe('Force', function() {
  test('constructor', function() {
    expect(() => new Force(1)).toThrow()
    expect(() => new Force([1])).toThrow()
    const force = new Force(new Vector(1,2,3))
    expect(force.value.equals(new Vector(1,2,3))).toBe(true)
  })
})
