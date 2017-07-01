/**
 * @namespace FluidDynamics
 */

/**
 * Represents a 2d fluid body.
 * Employs the grid method to simulate fluid mechanics.
 * @class
 * @alias FluidBody
 * @memberof FluidDynamics
 */
export default class FluidBody {
  /**
   * Creates 2d grid
   * @param {Number} width Grid width
   * @param {Number} height Grid height
   */
  constructor(width, height) {
    if(typeof width !== "number") {
      throw new TypeError("width must be a number")
    }
    if(typeof height !== "number") {
      throw new TypeError("height must be a number")
    }
    const rows = new Array(height)
    this.state = rows.map((row) => new Array(width))
  }
}
