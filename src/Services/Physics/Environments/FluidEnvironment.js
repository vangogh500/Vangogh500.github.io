/* @flow */

/**
 * An environment for fluid objects
 * @class
 * @alias FluidEnvironment
 * @author Kai Matsuda
 * @version 0.0.1
 */
export default class FluidEnvironment {
  p: number
  secPerFrame: number
  constructor(p: number, secPerFrame: number = 1) {
    this.p = p
    this.secPerFrame = secPerFrame
  }
}
