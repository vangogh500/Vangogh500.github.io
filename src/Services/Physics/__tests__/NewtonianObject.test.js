import NewtonianObject from '../NewtonianObject.js'
import Vector from '../Vector.js'
import Force from '../Actions/Force.js'
import Torque from '../Actions/Torque.js'

describe('NewtonianObject', function() {
  test('Constructor', function() {
    expect(() => new NewtonianObject(0, 0)).toThrow(new RangeError())
    expect(() => new NewtonianObject(1, 0)).toThrow(new RangeError())
    expect(() => new NewtonianObject('1')).toThrow()
    expect(() => new NewtonianObject(1, '1')).toThrow()
    expect(() => new NewtonianObject(1, 1, 1)).toThrow()
    expect(() => new NewtonianObject(1, 0, '1')).toThrow()
    expect(new NewtonianObject(1, 1, new Vector(), undefined))
    expect(new NewtonianObject(1, 1, undefined, undefined, undefined, undefined))
    expect(() => new NewtonianObject(1, 0, new Vector(), 1)).toThrow()
    expect(() => new NewtonianObject(1, 0, new Vector(), new Vector(), 1)).toThrow()
    expect(() => new NewtonianObject(1, 0, new Vector(), new Vector(), new Vector(), 1)).toThrow()
  })
  test('test 1', function() {
    const object = new NewtonianObject(1, 1, new Vector(), new Vector(), new Vector(1,2,3))
    object.tick(1)
    expect(object.v.equals(new Vector(1,2,3))).toBe(true)
    expect(object.s.equals(new Vector(1,2,3))).toBe(true)
    expect(object.theta.equals(new Vector())).toBe(true)
  })
  test('test 2', function() {
    const object = new NewtonianObject(1, 1, new Vector(), new Vector(), new Vector())
    expect(() => object.applyForce(new Torque(new Vector(), new Vector()))).toThrow()
    object.applyForce(new Force(new Vector(1,1,1)))
    expect(object.netForce.equals(new Vector(1,1,1)))
    object.tick(1)
    expect(object.netForce.equals(new Vector())).toBe(true)
    expect(object.v.equals(new Vector(1,1,1))).toBe(true)
    expect(object.s.equals(new Vector(1,1,1))).toBe(true)
    expect(object.theta.equals(new Vector())).toBe(true)
  })
  test('test 3', function() {
    const object = new NewtonianObject(1,1)
    expect(() => object.applyTorque(new Force(new Vector()))).toThrow()
    object.applyTorque(new Torque(new Vector(0,0,100)))
    expect(object.netTorque.equals(new Vector(0,0,100)))
    object.tick(1)
    expect(object.netTorque.equals(new Vector())).toBe(true)
    expect(object.w.equals(new Vector(0,0,100))).toBe(true)
    expect(object.theta.equals(new Vector(0,0,100))).toBe(true)
  })
})
