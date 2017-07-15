import {applyDragForce, applyRudderForce, applyAngularDrag} from '../FluidMechanicForce.js'
import FluidObject from '../../FluidObject.js'
import Vector from '../../Vector.js'
import FluidEnvironment from '../../Environments/FluidEnvironment.js'

describe('FluidMechanicForce', function() {
  test('applyDragForce', function() {
    const environment = new FluidEnvironment(2,1,1,1,1)
    const object = new FluidObject(1,1,undefined,undefined,0.5,20,25,5, new Vector(4,3,0))
    applyDragForce(object, environment)
    expect(object.netForce.equals(new Vector(4,3).normalize().scale(-250))).toBe(true)
  })
  test('applyRudderForce', function() {
    const object = new FluidObject(1,1,undefined,undefined,0.5,20,2,2, new Vector(4,3,0))
    const environment = new FluidEnvironment(2,1,1,1,1)
    applyRudderForce(object,environment,Math.PI/4)
    const f = new Vector(Math.cos(Math.PI/4), Math.sin(Math.PI/4)).scale(20)
    expect(object.netTorque.equals(new Vector(1).crossProduct(f))).toBe(true)
  })
  test('applyAngularDrag', function() {
    const object = new FluidObject(1,1,undefined,undefined,0.5,20,2,2, new Vector(0,0,0), new Vector(0,0,10))
    const environment = new FluidEnvironment(2,1,1,1,1)
    applyAngularDrag(object, environment)
    expect(object.netTorque.equals(new Vector(0,0,-120)))
  })
})
