/**
 * @module Newtonian
 */

/*
  BASIC NEWTONIAN PHYSICS
  s(t)=s0+v(t)
  v(t)=v0+a(t)
  a(t)=a0+F(t)/m
*/

/**
 * Calculates linear position
 * @memberof module:Newtonian
 * @throws {ReferenceError} If v or t are not defined.
 * @throws {TypeError} If params are of not the right type.
 * @param {number} state Current position.
 * @param {number} v Current velocity.
 * @param {number} t The time elapsed.
 * @param {number} pxPerM Pixels per meter.
 * @return {number} Next linear position.
 */
export function sLin(state = 0, v, t, pxPerM) {
  if(v == null || t == null || pxPerM == null) { throw new ReferenceError() }
  if(typeof state !== 'number' || typeof v !== 'number' || typeof t !== 'number' || typeof pxPerM !== 'number') { throw new TypeError() }
  return state + (v * t * pxPerM)
}

/**
 * Calculates linear velocity
 * @memberof module:Newtonian
 * @throws {ReferenceError} If a or t are not defined.
 * @throws {TypeError} If params are of not the right type.
 * @param {number} state Current velocity.
 * @param {number} a Current acceleration.
 * @param {number} t Time elapsed.
 * @return {number} Next linear velocity.
 */
export function vLin(state = 0, a, t) {
  if(a == null || t == null) { throw new ReferenceError()}
  if(typeof state !== 'number' || typeof a !== 'number' || typeof t !== 'number') { throw new TypeError() }
  return state + (a * t)
}

/**
 * Calculates linear acceleration
 * @memberof module:Newtonian
 * @throws {ReferenceError} If fNet or m are not defined.
 * @throws {TypeError} If params are of not the right type.
 * @throws {RangeError} If m is less than or equal to 0.
 * @param {number} fNet Net force.
 * @param {number} m Mass.
 * @return {number} Next linear acceleration.
 */
export function aLin(fNet, m) {
  if(fNet == null || m == null){ throw new ReferenceError() }
  if(typeof fNet !== 'number' || typeof m !== 'number') { throw new TypeError() }
  if(m <= 0) { throw new RangeError("Massless object") }
  return (fNet / m)
}
/**
 * Calculates linear net force
 * @memberof module:Newtonian
 * @throws {TypeError} If f is not a number.
 * @param {number} [f=0] Force applied.
 * @param {number} cD Coefficient of drag.
 * @param {number} aF Frontal area.
 * @param {number} p Density of fluid/liquid.
 * @param {number} v Current velocity.
 * @return {number} Net force.
 */
export function fNetLin(f = 0, cD, aF, p, v) {
  if(typeof f !== 'number') { throw new TypeError() }
  const drag = fDLin(cD, aF, p, v)
  return f + drag
}

/**
 * Calculates linear drag force
 * @memberof module:Newtonian
 * @throws {ReferenceError} If any of the params are not defined.
 * @throws {TypeError} If params are not of correct type.
 * @param {number} cD Coefficient of drag.
 * @param {number} aF Frontal area.
 * @param {number} p Density of fluid/liquid.
 * @param {number} [v=0] Current velocity.
 * @return {number} Drag force.
 */
export function fDLin(cD, aF, p, v = 0) {
  if(cD == null || aF == null || p == null) { throw new ReferenceError() }
  if(typeof cD !== 'number' || typeof aF !== 'number' || typeof p !== 'number' || typeof v !== 'number') { throw new TypeError() }
  return -0.5 * Math.sign(v) * p * cD * aF * Math.pow(v, 2)
}
