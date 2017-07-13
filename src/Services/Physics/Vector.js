/* @flow */

/**
 * A simple 3D Vector
 * @author Kai Matsuda
 * @class
 * @alias Vector
 * @version 0.0.1
 */
export default class Vector {
  x: number
  y: number
  z: number
  /**
   * Constructor
   * @param {number} [x=0] x value
   * @param {number} [y=0] y value
   * @param {number} [z=0] z value
   * @throws {Error} If x, y, or z is not a number.
   */
  constructor(x: number = 0, y: number = 0, z: number = 0) {
    this.x = x
    this.y = y
    this.z = z
    // bind
    const self: any = this
    self.length = this.length.bind(self)
    self.negative = this.negative.bind(this)
    self.add = this.add.bind(this)
    self.subtract = this.subtract.bind(this)
    self.scale = this.scale.bind(this)
    self.dotProduct = this.dotProduct.bind(this)
  }

  /**
   * Returns whether v2 is equal to v.
   * @param {Vector} v2 Vector to compare.
   * @throws {Error} If v2 is not a vector.
   * @return {boolean} v === v2
   */
  equals(v: Vector): boolean {
    return (this.x === v.x && this.y === v.y && this.z === v.z)
  }

  /**
   * Returns the length or magnitude of the vector.
   * Uses the property: ||v|| = sqrt(v . v)
   * @return {number} ||v||
   */
  length(): number {
    return Math.sqrt(this.dotProduct(this))
  }

  /**
   * Returns the negative of the vector.
   * @return {Vector} -v
   */
  negative(): Vector {
    return new Vector(-this.x, -this.y, -this.z)
  }

  /**
   * Returns the unit vector. Utilizes v* = 1 / ||v|| * v
   * @return {Vector} v*
   * @throws {RangeError} If the vector is a zero vector.
   */
  normalize(): Vector {
    if(this.length() == 0) { throw new RangeError('A 0 vector has no unit vector.')}
    return this.scale(1 / this.length())
  }
  /**
   * Returns v + v2
   * @param {Vector} v2 The vector to add.
   * @return {Vector} v + v2
   * @throws {Error} If v2 is not a vector.
   */
  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y, this.z + v.z)
  }
  /**
   * Returns v - v2. Uses the property: v - v2 = v + -(v2)
   * @param {Vector} v2 The vector to subtract.
   * @return {Vector} v - v2
   * @throws {Error} If v2 is not a vector.
   */
  subtract(v: Vector): Vector {
    return this.add(v.negative())
  }
  /**
   * Returns a * v
   * @param {number} a The scalar.
   * @return {Vector} a * v
   * @throws {Error} If a is not a number.
   */
  scale(a: number): Vector {
    return new Vector(a * this.x, a * this.y, a * this.z)
  }
  /**
   * Returns v . v2
   * @param {Vector} v2 The vector to dot product.
   * @return {number} v . v2
   * @throws {Error} If v2 is not a vector.
   */
  dotProduct(v: Vector): number {
    return (this.x * v.x) + (this.y * v.y) + (this.z * v.z)
  }

  /**
   * Returns v x v2
   * @param {Vector} v2 The vector to cross product.
   * @return {number} v x v2
   * @throws {Error} If v2 is not a vector.
   */
  crossProduct(v: Vector): Vector {
    return new Vector((this.y * v.z) - (this.z * v.y), (this.z * v.x) - (this.x * v.z), (this.x * v.y) - (this.y * v.x))
  }
}
