import Torque from '../Torque.js'
import Vector from '../../Vector.js'

describe('Torque', function() {
  test('constructor', function() {
    expect(() => new Torque(1, new Vector())).toThrow()
    expect(() => new Torque([1], new Vector())).toThrow()
    const torque = new Torque(new Vector(-4,8,-4))
    expect(torque.value.equals(new Vector(-4,8,-4)))
  })
})
