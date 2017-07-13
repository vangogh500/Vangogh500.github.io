/* @flow */
import Vector from '../Vector.js'

/**
 * Force
 * @author Kai Matsuda
 * @class
 * @alias Force
 * @version 0.0.1
 */
export default class Force {
  value: Vector
  /**
   * Constructor
   * @param {Vector} f Vector representing the force applied.
   * @throws {Error} If params are of not the correct type.
   */
  constructor(value: Vector) {
    this.value = value
  }
}
