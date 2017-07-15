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
   * @param {Vector} value The vector represnting the torque.
   * @throws {Error} If params are of not the right type.
   */
   constructor(value: Vector) {
      this.value = value
   }
}
