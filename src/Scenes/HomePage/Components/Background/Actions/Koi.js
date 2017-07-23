/* @flow */

/**
 * @module KoiAction
 * @file Represents actions that can be taken by the Koi
 * @author Kai Matsuda
 * @version 0.0.1
 */
import FluidObject from '../../../../../Services/Physics/FluidObject.js'
import FluidEnvironment from '../../../../../Services/Physics/Environments/FluidEnvironment.js'
import {applyRudderForce} from '../../../../../Services/Physics/Actions/FluidMechanicForce.js'
import Force from '../../../../../Services/Physics/Actions/Force.js'
import Vector from '../../../../../Services/Physics/Vector.js'

/* ----- ACTION TYPES ----- */
/**
 * Represents a KoiAction
 */
export type KoiAction =
  | ThrustType
  | SteerType
/**
 * Represents Koi thrusting fin
 * @memberof module:KoiAction
 * @type {object}
 */
export type ThrustType = {
  +type: 'THRUST'
}
/**
 * Represents Koi steering fin
 * @memberof module:KoiAction
 * @type {object}
 */
export type SteerType = {
  +type: 'STEER',
  +theta: number
}

/* ----- ACTION GENERATORS ----- */
function thrustAction(): ThrustType {
  return {
    type: 'THRUST'
  }
}
function steerAction(theta: number): SteerType {
  return {
    type: 'STEER',
    theta
  }
}

/* ----- KoiObjectActions ----- */
/**
 * Represents actions taken by the Koi entity
 */
export type KoiObjectAction = (fo?: FluidObject, applyKoiAction: Function, environment?: FluidEnvironment) => void

/**
 * Tells Koi to thrust fins to generate motion
 * @memberof module:KoiAction
 * @param {number} magnitude The strength of the thrust.
 * @return {KoiObjectAction} Callback for the koi dispatcher to handle.
 * @throws {Error} If vector is not a Vector.
 */
export function thrust(magnitude: number) {
  return (fo: FluidObject, applyKoiAction: Function): void => {
    applyKoiAction(thrustAction())
    const theta = fo.theta.z
    const u = new Vector(Math.cos(theta), Math.sin(theta), 0)
    fo.applyForce(new Force(u.scale(magnitude)))
  }
}

/**
 * Tells Koi to steer
 * @memberof module:KoiAction
 * @param {number} theta Angle of the fin in relation to the body.
 * @return {KoiObjectAction} Callback for the koi dispatcher to handle.
 * @throws {Error} If theta is not a number.
 */
export function steer(theta: number) {
  return (fo: FluidObject, applyKoiAction: Function, environment: FluidEnvironment): void => {
    applyKoiAction(steerAction(theta))
    applyRudderForce(fo, environment, theta)
  }
}
