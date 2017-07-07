import Vector from './Vector.js'
import {DIRECTIONAL_FORCE, DRAG_FORCE} from './Actions/Force.js'
import {dragForce} from './FluidMechanics.js'

/**
 * Represents a Physics Object
 * @class
 * @alias PhysicsObject
 */
export default class PhysicsObject {
  /**
   * Constructor
   * @param {number} m Mass of object in kg. Must be greater than 0.
   * @param {number} [theta=0] The rotation of the object in radians.
   * @param {number} [s= new Vector] The displacement vector in m.
   * @param {number} [cD] Drag coefficient.
   * @param {number} [aF] Frontal area in m^2.
   * @param {number} [v= new Vector] The velocity vector in m/s.
   * @throws {ReferenceError} If required params are not defined.
   * @throws {TypeError} If params are of not the correct type
   * @throws {RangeError} If m is less than or equal to 0.
   */
  constructor(m, theta = 0, s = new Vector(), cD, aF, v = new Vector()) {
    if(m == null) { throw new ReferenceError() }
    if(typeof m !== 'number' || typeof theta !== 'number' || (cD != null && typeof cD !== 'number') || (aF != null && typeof aF !== 'number')) { throw new TypeError() }
    if(!(v instanceof Vector) || !(s instanceof Vector)) { throw new TypeError() }
    if(m <= 0) { throw new RangeError("m cannot be less or equal to 0")}
    this.m = m
    this.theta = theta
    this.v = v
    this.s = s
    this.cD = cD
    this.aF = aF
    this.netDirectionalForce = new Vector()
  }
  /**
   * Applies force to the physics object.
   * @param {Vector} force The force to apply.
   * @throws {TypeError} If force is not a vector.
   */
  applyForce(force) {
    switch(force.type) {
      case DIRECTIONAL_FORCE:
        this.netDirectionalForce = this.netDirectionalForce.add(force.vector)
        return
      case DRAG_FORCE:
        console.log(this.v.length())
        const magnitude = dragForce(this.cD, this.aF, force.p, this.v.length())
        console.log(magnitude)
        const vector = (magnitude != 0) ? this.v.normalize().scale(magnitude) : new Vector()
        this.netDirectionalForce = this.netDirectionalForce.add(vector)
        return
      default:
        throw new ReferenceError('No force of this type was found.')
    }
  }
  /**
   * Computes velocity and displacement and then resets the forces applied.
   * @param {number} t The time elapsed in seconds.
   * @throws {TypeError} If t is not a number.
   */
  tick(t) {
    if(typeof t !== 'number') { throw new TypeError() }
    // a(t) = 1/m * f(t)
    const a = this.netDirectionalForce.scale(1/this.m).scale(t)
    // v(t) = a(t) + v0
    this.v = this.v.add(a.scale(t))
    // s(t) = v(t) + s0
    this.s = this.s.add(this.v.scale(t))
    this.netDirectionalForce = new Vector()
  }
  /**
   * Returns the essential parts of the state.
   * @returns {object} theta, v, s.
   */
  getState() {
    return {
      theta: this.theta,
      v: this.v,
      s: this.s
    }
  }
  /**
   * Returns the physical properties of the object.
   * @returns {object} m, cD, aF
   */
  getProperties() {
    return {
      m: this.m,
      cD: this.cD,
      aF: this.aF
    }
  }
}
