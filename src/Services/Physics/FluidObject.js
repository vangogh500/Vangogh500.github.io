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
  /**
   * Computes velocity and displacement and then resets the forces/torques applied.
   * @param {number} t The time elapsed in seconds.
   * @throws {TypeError} If t is not a number.
   */
  tick(t: number): void {
    // angular acc = 1 / mr * t(t)
    const alpha:Vector = this.netTorque.scale(1/this.mr).scale(t)
    const w0 = this.w
    // w = alpha(t) + w0
    this.w = this.w.add(alpha.scale(t))
    // wavg = (w' + w0)/2 * t
    const averageW = w0.add(this.w).scale(t/2)
    // heading = theta + wavg
    const heading = this.theta.add(averageW)
    // theta = w(t) + theta0
    this.theta = this.theta.add(this.w.scale(t))

    // a(t) = 1/m * f(t)
    const a:Vector = this.netForce.scale(1/this.m).scale(t)
    // v(t) = a(t) + v0 (where v0 is redirected towards the heading)
    this.v = new Vector(Math.cos(heading.z), Math.sin(heading.z)).scale(this.v.length() + a.length() * t)
    // s(t) = v(t) + s0
    this.s = this.s.add(this.v.scale(t))

    // reset torque and force
    this.netForce = new Vector()
    this.netTorque = new Vector()
  }
}
