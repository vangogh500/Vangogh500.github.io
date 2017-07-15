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
  p0: number
  p1: number
  p2: number
  secPerFrame: number
  constructor(p: number, secPerFrame: number, p0: number, p1: number, p2: number) {
    this.p = p
    this.secPerFrame = secPerFrame
    this.p0 = p0
    this.p1 = p1
    this.p2 = p2
  }
}
