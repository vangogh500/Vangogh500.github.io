/**
 * @module FluidMechanics
 */

/**
 * Calculates drag force
 * @memberof module:FluidMechanics
 * @throws {ReferenceError} If any of the params are not defined.
 * @throws {TypeError} If params are not of correct type.
 * @param {number} cD Coefficient of drag.
 * @param {number} aF Frontal area.
 * @param {number} p Density of fluid/liquid.
 * @param {number} v Current velocity.
 * @return {number} Drag force.
 */
export function dragForce(cD, aF, p, v) {
  if(v == null || cD == null || aF == null || p == null) { throw new ReferenceError() }
  if(typeof cD !== 'number' || typeof aF !== 'number' || typeof p !== 'number' || typeof v !== 'number') { throw new TypeError() }
  return -0.5 * p * cD * aF * Math.pow(v, 2)
}
