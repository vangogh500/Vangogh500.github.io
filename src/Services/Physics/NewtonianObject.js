/* @flow */
import Vector from './Vector.js'
import Force from './Actions/Force.js'
import Torque from './Actions/Torque.js'

/**
 * Represents a basic NewtonianObject
 * @class
 * @alias NewtonianObject
 * @author Kai Matsuda
 * @version 0.0.1
 */
export default class NewtonianObject {
  m: number
  mr: number
  theta: Vector
  s: Vector
  v: Vector
  w: Vector
  netForce: Vector
  netTorque: Vector
  /**
   * Constructor
   * @param {number} m Mass of object in kg. Must be greater than 0.
   * @param {number} mr Rotational mass/inertia. Must be greater than 0.
   * @param {Vector} [theta= new Vector] The rotation of the object in radians CCW (vector defines the axis of rotation).
   * @param {Vector} [s= new Vector] The displacement vector in m.
   * @param {Vector} [v= new Vector] The velocity vector in m/s.
   * @param {Vector} [w= new Vector] The angular velocity in rad/s.
   * @throws {TypeError} If params are of not the correct type
   * @throws {RangeError} If m is less than or equal to 0.
   */
  constructor(m: number, mr: number, theta: Vector = new Vector(), s: Vector = new Vector(), v: Vector = new Vector(), w: Vector = new Vector()) {
    if(m <= 0 || mr <= 0) { throw new RangeError()}
    this.m = m
    this.mr = mr
    this.theta = theta
    this.s = s
    this.v = v
    this.w = w
    this.netForce = new Vector()
    this.netTorque = new Vector()
  }

  /**
   * Add torque
   * @param {Torque} t Torque applied to object
   * @throws {Error} If t is not of type t.
   */
  applyTorque(t: Torque): void {
    this.netTorque = this.netTorque.add(t.value)
  }

  /**
   * Apply force
   * @param {Force} f The force applied to object.
   * @throws {Error} If f is not a force.
   */
  applyForce(f: Force): void {
    this.netForce = this.netForce.add(f.value)
  }

  /**
   * Computes velocity and displacement and then resets the forces/torques applied.
   * @param {number} t The time elapsed in seconds.
   * @throws {TypeError} If t is not a number.
   */
  tick(t: number): void {
    // angular acc = 1 / mr * t(t)
    const alpha:Vector = this.netTorque.scale(1/this.mr).scale(t)
    // w = alpha(t) + w0
    this.w = this.w.add(alpha.scale(t))
    // theta = w(t) + theta0
    this.theta = this.theta.add(this.w.scale(t))

    // a(t) = 1/m * f(t)
    const a:Vector = this.netForce.scale(1/this.m).scale(t)
    // v(t) = a(t) + v0
    this.v = this.v.add(a.scale(t))
    // s(t) = v(t) + s0
    this.s = this.s.add(this.v.scale(t))


    // reset torque and force
    this.netForce = new Vector()
    this.netTorque = new Vector()
  }
}
