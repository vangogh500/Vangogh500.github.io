import Vector from '../Vector.js'
import {drag, rudder} from '../FluidMechanics.js'

/**
 * @module FluidMechanicForce
 * @file Represents basic forces that can be applied to fluidobjects.
 * @author Kai Matsuda
 */

/**
 * @constant
 * @memberof module:FluidMechanicForce
 * @type {string}
 */
export const FLUID_MECHANIC = 'FLUID_MECHANIC'

/**
 * @constant
 * @memberof module:FluidMechanicForce
 * @type {string}
 */
export const DRAG_FORCE = 'DRAG_FORCE'

/**
 * @constant
 * @memberof module:FluidMechanicForce
 * @type {string}
 */
export const RUDDER_FORCE = 'RUDDER_FORCE'

// helper method for throwing errors when mandatory parameters are not defined
function mandatory() {
  throw new ReferenceError()
}

/**
 * Creates a drag force.
 * @memberof module:NewtonianForce
 * @param {object} state Physics state.
 * @throws {TypeError} If p is not a number.
 */
export function dragForce(state) {
  const {cD = mandatory(), aF = mandatory(), p = mandatory(), v = mandatory()} = state.
  if(typeof cD !== 'number' || typeof aF !== 'number' || typeof p !== 'number') { throw new TypeError() }
  if(!(v instanceof Vector)) { throw new TypeError() }
  const magnitude = drag(state.cD, state.aF, state.p, state.v.length())
  return state.v.normalize.scale(magnitude)
}

/**
 * Creates a rudder force.
 * @memberof module:NewtonianForce
 * @param {Vector} theta The angle of the rutter in radians (vector represents axis of rotation).
 * @param {number} p The density of the liquid.
 * @throws {TypeError} If params are of not the correct type.
 */
export function rudderForce(theta, p) {
  if(typeof p !== 'number' || !(theta instanceof Vector)) { throw new TypeError() }
  return {
    genre: FLUID_MECHANIC,
    type: RUDDER_FORCE,
    theta, p
  }
}
