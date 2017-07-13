/* @flow */

/**
 * @module KoiAction
 * @file Represents actions that can be taken by the Koi
 * @author Kai Matsuda
 * @version 0.0.1
 */
import FluidObject from '../../../../../Services/Physics/FluidObject.js'
import Force from '../../../../../Services/Physics/Actions/Force.js'
import Vector from '../../../../../Services/Physics/Vector.js'

/**
 * Represents a KoiAction
 */
export type KoiAction = { type: string }
/**
 * Represents Koi thrusting fin
 * @constant
 * @memberof module:KoiAction
 * @type {string}
 */
export const THRUST = 'THRUST'

function thrustAction(): KoiAction {
  return {
    type: THRUST
  }
}

/**
 * Represents actions taken by the Koi entity
 */
export type KoiObjectAction = (fo: FluidObject, applyKoiAction: Function) => void

/**
 * Tells Koi to thrust fins to generate motion
 * @memberof module:KoiAction
 * @param {FluidObject} fo Fluid object representing the Koi
 * @param {function} applyKoiAction Call back to apply Koi action.
 * @throws {Error} If vector is not a Vector.
 */
export function thrust() {
  return (fo: FluidObject, applyKoiAction: Function): void => {
    applyKoiAction(thrustAction())
    const theta = fo.theta.z
    const u = new Vector(Math.cos(theta), Math.sin(theta), 0)
    fo.applyForce(new Force(u.scale(10)))
  }
}
