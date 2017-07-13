import {applyDragForce, applyRudderForce} from '../FluidMechanicForce.js'
import FluidObject from '../../FluidObject.js'
import Vector from '../../Vector.js'
import FluidEnvironment from '../../Environments/FluidEnvironment.js'

describe('FluidMechanicForce', function() {
  test('applyDragForce', function() {
    const environment = new FluidEnvironment(2)
    const object = new FluidObject(1,1,undefined,undefined,0.5,20,25,5, new Vector(4,3,0))
    applyDragForce(object, environment)
    expect(object.netForce.equals(new Vector(4,3).normalize().scale(-250))).toBe(true)
  })
  test('applyRudderForce', function() {
    const object = new FluidObject(1,1,undefined,undefined,0.5,20,2,2, new Vector(4,3,0))
    const environment = new FluidEnvironment(2)
    applyRudderForce(object,environment,Math.PI/4)
    const f = new Vector(Math.cos(Math.PI/4), Math.sin(Math.PI/4)).scale(10)
    expect(object.netTorque.equals(new Vector(1).crossProduct(f))).toBe(true)
  })
})
