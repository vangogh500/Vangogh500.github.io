/* @flow */
import NewtonianObject from './NewtonianObject'
import Vector from './Vector.js'

/**
 * Represents a Physics Object
 * @author Kai Matsuda
 * @class
 * @extends {NewtonianObject}
 * @alias FluidObject
 * @version 0.0.1
 */
export default class FluidObject extends NewtonianObject {
  cD: number
  frontalA: number
  rudderA: number
  length: number

  /**
   * Constructor
   * @param {number} m Mass of object in kg. Must be greater than 0.
   * @param {number} mr Moment of Inertia or rotational mass.
   * @param {Vector} [theta= new Vector] The rotation of the object in radians.
   * @param {Vector} [s= new Vector] The displacement vector in m.
   * @param {number} cD Drag coefficient.
   * @param {number} frontalA Frontal area in m^2.
   * @param {number} rudderA The area of the rudder in m^2.
   * @param {number} length The length of the object.
   * @param {Vector} [v= new Vector] The velocity vector in m/s.
   * @param {Vector} [w= new Vector] The angular velocity in rad/s.
   * @throws {Error} If params are of not the correct type
   * @throws {RangeError} If m is less than or equal to 0.
   */
  constructor(m: number, mr: number, theta: Vector = new Vector(), s: Vector = new Vector(), cD: number, frontalA: number, rudderA: number, length: number, v: Vector = new Vector(), w: Vector = new Vector()) {
    super(m, mr, theta, s, v, w)
    this.cD = cD
    this.frontalA = frontalA
    this.rudderA = rudderA
    this.length = length
  }
}
