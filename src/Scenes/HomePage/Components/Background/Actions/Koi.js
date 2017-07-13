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
export function thrust() {
  return (applyKoiAction, applyForce, getPhysicsState) => {
    applyKoiAction(thrustAction())
    const {theta} = getPhysicsState()
    const u = new Vector(Math.cos(theta), Math.sin(theta), -1).normalize()
    applyForce(directionalForce(u.scale(40)))
  }
}
