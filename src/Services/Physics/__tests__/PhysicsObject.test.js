import PhysicsObject from '../PhysicsObject.js'
import Vector from '../Vector.js'
import {directionalForce} from '../Actions/Force.js'

describe('PhysicsObject', function() {
  test('Constructor', function() {
    expect(() => new PhysicsObject(0)).toThrow()
    expect(() => new PhysicsObject('1')).toThrow()
    expect(() => new PhysicsObject(1, '1')).toThrow()
    expect(() => new PhysicsObject(1, 0, '1')).toThrow()
    expect(new PhysicsObject(1, 0, undefined))
    expect(() => new PhysicsObject(1, 0, null, null, '1')).toThrow()
    expect(() => new PhysicsObject(1, 0, null, null, 1, '1')).toThrow()
    expect(new PhysicsObject(1, 0, undefined, 1, 1, undefined))
  })
  test('test 1', function() {
    const object = new PhysicsObject(1, 0, new Vector(0,0,0), 1, 1, new Vector(1,2,3))
    object.tick(1)
    const state = object.getState()
    expect(state.v.equals(new Vector(1,2,3))).toBe(true)
    expect(state.s.equals(new Vector(1,2,3))).toBe(true)
    expect(state.theta).toBe(0)
  })
  test('test 2', function() {
    const object = new PhysicsObject(1, 0, new Vector(0,0,0), 1, 1, new Vector(0,0,0))
    object.applyForce(directionalForce(new Vector(1,1,1)))
    object.tick(1)
    expect(object.netDirectionalForce.equals(new Vector())).toBe(true)
    const state = object.getState()
    expect(state.v.equals(new Vector(1,1,1))).toBe(true)
    expect(state.s.equals(new Vector(1,1,1))).toBe(true)
    expect(state.theta).toBe(0)
  })
})
