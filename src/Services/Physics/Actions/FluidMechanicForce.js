/* @flow */
import Vector from '../Vector.js'
import FluidObject from '../FluidObject.js'
import {drag, rudder, angularDrag} from '../FluidMechanics.js'
import Force from './Force.js'
import Torque from './Torque.js'
import FluidEnvironment from '../Environments/FluidEnvironment.js'

/**
 * @module FluidMechanicForce
 * @file Represents basic forces that can be applied to fluidobjects.
 * @author Kai Matsuda
 * @version 0.0.1
 */

/**
 * Applies drag force.
 * @memberof module:FluidMechanicForce
 * @param {FluidObject} fo FluidObject to apply drag to.
 * @param {number} p The density of the fluid.
 * @throws {TypeError} If p is not a number.
 */
export function applyDragForce(fo: FluidObject, environment: FluidEnvironment): void {
  // get magnitude
  const magnitude = drag(fo.cD, fo.frontalA, environment.p, fo.v.length())
  // scale velocity unit vector to get the right direction
  if(magnitude == 0) { return }
  const vector = fo.v.normalize().scale(magnitude)
  fo.applyForce(new Force(vector))
}

/**
 * Applies rudder force.
 * @memberof module:FluidMechanicForce
 * @param {FluidObject} fo Fluid object to apply rudder force to.
 * @param {number} p The density of the liquid.
 * @param {number} theta The angle of rudder in relation to the body.
 * @throws {TypeError} If params are of not the correct type.
 */
export function applyRudderForce(fo: FluidObject, environment: FluidEnvironment, theta: number): void {
  // lever arm is simply 1/2 the object's length
  const r = new Vector(fo.length/2)
  // calculate magnitude
  const magnitude = rudder(fo.rudderA, fo.v.length(), environment.p)
  // scale unit vector (of f's relationship to r) by magnitude
  const f = new Vector(Math.cos(theta), Math.sin(theta)).scale(magnitude)
  fo.applyTorque(new Torque(r.crossProduct(f)))
}

export function applyAngularDrag(fo: FluidObject, environment: FluidEnvironment): void {
  const magnitude = angularDrag(environment.p0, environment.p1, environment.p2, fo.w.length())
  if(fo.w.length() == 0) { return }
  const t = fo.w.normalize().scale(magnitude)
  fo.applyTorque(new Torque(t))

}
