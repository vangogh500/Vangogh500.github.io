/* @flow */
import Vector from '../Vector.js'

/**
 * Torque
 * @author Kai
 * @class
 * @alias Torque
 * @version 0.0.1
 */
export default class Torque {
  value: Vector
  /**
   * Constructor
   * @param {Vector} force The vector representing the force.
   * @param {Vector} r The vector representing the radial distance.
   * @throws {Error} If params are of not the right type.
   */
   constructor(r: Vector, force: Vector) {
     this.value = r.crossProduct(force)
   }
}
