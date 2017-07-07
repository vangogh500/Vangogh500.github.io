/**
 * @module KoiAction
 */
import {directionalForce, dragForce} from '../../../../../Services/Physics/Actions/Force.js'
import Vector from '../../../../../Services/Physics/Vector.js'

/**
 * @constant
 * @memberof module:KoiAction
 * @type {string}
 */
export const THRUST = 'THRUST'

function thrustAction() {
  return {
    type: THRUST
  }
}


/**
 * Tells Koi to thrust fins to generate motion
 * @memberof module:KoiAction
 * @param {number} unitVector The unit vector representing the force. The length of this vector should equal 1.
 * @throws {TypeError} If vector is not a Vector.
 */
export function thrust(unitVector) {
  if(!(unitVector instanceof Vector)) { throw new TypeError() }
  if(unitVector.length() !== 1) {
    throw new RangeError() }
  return (applyKoiAction, applyForce) => {
    applyKoiAction(thrustAction())
    applyForce(directionalForce(unitVector.scale(40)))
  }
}
