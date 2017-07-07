/**
 * @module Force
 */
import Vector from '../Vector.js'

/**
 * @constant
 * @memberof module:Force
 * @type {string}
 */
export const DIRECTIONAL_FORCE = 'DIRECTIONAL_FORCE'

/**
 * @constant
 * @memberof module:Force
 * @type {string}
 */
export const DRAG_FORCE = 'DRAG_FORCE'

/**
 * @constant
 * @memberof module:Force
 * @type {string}
 */
export const ROTATIONAL_FORCE = 'ROTATIONAL_FORCE'

/**
 * Creates a directional force that applies to the object's center of mass.
 * @memberof module:Force
 * @param {number} vector The vector representing the force.
 * @throws {TypeError} If vector is not a Vector.
 */
export function directionalForce(vector) {
  if(!(vector instanceof Vector)) { throw new TypeError() }
  return {
    type: DIRECTIONAL_FORCE,
    vector
  }
}

/**
 * Creates a drag force.
 * @memberof module:Force
 * @param {number} p The density of the liquid.
 */
export function dragForce(p) {
  if(typeof p !== 'number') { throw new TypeError() }
  return {
    type: DRAG_FORCE,
    p
  }
}

/**
 * Creates a rotational Force
 * @memberof module:Force
 * @param {number} r The length of the lever arm in px.
 * @param {number} theta The angle of the force in radians.
 * @param {number} magnitude The magnitude of the force.
 */
export function applyRotationalForce(r, theta, magnitude) {
  return {
    type: ROTATIONAL_FORCE,
    r,
    theta,
    magnitude
  }
}
