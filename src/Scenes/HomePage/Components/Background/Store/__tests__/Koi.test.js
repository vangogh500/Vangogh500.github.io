import KoiStore from '../Koi.js'
import {thrust} from '../../Actions/Koi.js'
import PhysicsObject from '../../../../../../Services/Physics/PhysicsObject.js'
import Vector from '../../../../../../Services/Physics/Vector.js'


describe('KoiStore', function() {
  test('test 1', function() {
    const object = new PhysicsObject(1, 0, new Vector(0,0,0), 1, 1, 1, new Vector(0,0,0))
    const koi = new KoiStore(object, { p: 1, secPerFrame: 1 })
    koi.dispatch(thrust(new Vector(1,1,1).normalize()))
    const state = koi.getPhysicsState()
    expect(state.v.equals(new Vector(1,1,1).normalize())).toBe(true)
    expect(state.s.equals(new Vector(1,1,1).normalize())).toBe(true)
    expect(state.theta).toEqual(0)
  })
})
