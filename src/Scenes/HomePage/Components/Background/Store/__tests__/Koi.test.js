import KoiStore from '../Koi.js'
import {thrust, steer} from '../../Actions/Koi.js'
import FluidObject from '../../../../../../Services/Physics/FluidObject.js'
import FluidEnvironment from '../../../../../../Services/Physics/Environments/FluidEnvironment.js'

import Vector from '../../../../../../Services/Physics/Vector.js'


describe('KoiStore', function() {
  test('thrust', function() {
    const object = new FluidObject(1,1,undefined,undefined,1,1,1,1)
    const environment = new FluidEnvironment(1,1,1,1,1)
    const koi = new KoiStore(object,environment)
    koi.dispatch(thrust())
    expect(koi.fo.netForce.equals(new Vector(0,0,0))).toBe(true)
    expect(koi.fo.v.equals(new Vector(10,0,0))).toBe(true)
    expect(koi.fo.s.equals(new Vector(10,0,0))).toBe(true)
    expect(koi.fo.theta.equals(new Vector(0,0,0))).toBe(true)
  })
  test('steer', function() {
    const object = new FluidObject(1,1,undefined,undefined,1,1,1,2, new Vector(10,0,0))
    const enviroment = new FluidEnvironment(1,1,1,1,1)
    const koi = new KoiStore(object,enviroment)
    koi.dispatch(steer(Math.PI/3))

    const f = new Vector(Math.cos(Math.PI/3), Math.sin(Math.PI/3)).scale(10)
    const t = new Vector(1,0,0).crossProduct(f)

    expect(koi.fo.netTorque.equals(new Vector(0,0,0))).toBe(true)
    expect(koi.fo.w.equals(t)).toBe(true)
    expect(koi.fo.theta.equals(t)).toBe(true)
  })
})
