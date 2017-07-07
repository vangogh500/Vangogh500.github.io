/**
 * A simple 3D Vector
 * @class
 * @alias Vector
 */
export default class Vector {
  /**
   * Constructor
   * @param {number} [x=0] x value
   * @param {number} [y=0] y value
   * @param {number} [z=0] z value
   * @throws {TypeError} If x, y, or z is not a number.
   */
  constructor(x = 0, y = 0, z = 0) {
    if(typeof x !== 'number' || typeof y !== 'number' || typeof z !== 'number') {
      throw new TypeError("x, y, and z must be numbers.")
    }
    this.x = x
    this.y = y
    this.z = z

    // bind functions
    this.length = this.length.bind(this)
    this.negative = this.negative.bind(this)
    this.add = this.add.bind(this)
    this.subtract = this.subtract.bind(this)
    this.scale = this.scale.bind(this)
    this.dotProduct = this.dotProduct.bind(this)
  }

  /**
   * Returns whether v2 is equal to v.
   * @param {Vector} v Vector to compare.
   * @return {boolean} v === v2
   */
  equals(v) {
    if(v instanceof Vector) {
      return (this.x === v.x && this.y === v.y && this.z === v.z)
    }
    else {
      throw new TypeError("param must be an instanceof Vector")
    }
  }
  /**
   * Returns the length or magnitude of the vector.
   * Uses the property: ||v|| = sqrt(v . v)
   * @return {number} ||v||
   */
  length() {
    return Math.sqrt(this.dotProduct(this))
  }
  /**
   * Returns the negative of the vector.
   * @return {Vector} -v
   */
  negative() {
    return new Vector(-this.x, -this.y, -this.z)
  }
  /**
   * Returns the unit vector. Utilizes v* = 1 / ||v|| * v
   * @return {Vector} v*
   */
  normalize() {
    if(this.length() == 0) { throw new RangeError('A 0 vector has no unit vector.')}
    return this.scale(1 / this.length())
  }
  /**
   * Returns v + v2
   * @param {Vector} v2 The vector to add.
   * @return {Vector} v + v2
   * @throws {TypeError} If v2 is not a vector.
   */
  add(v) {
    if(v instanceof Vector) {
      return new Vector(this.x + v.x, this.y + v.y, this.z + v.z)
    }
    else {
      throw new TypeError("param must be an instanceof Vector")
    }
  }
  /**
   * Returns v - v2. Uses the property: v - v2 = v + -(v2)
   * @param {Vector} v2 The vector to subtract.
   * @return {Vector} v - v2
   * @throws {TypeError} If v2 is not a vector.
   */
  subtract(v) {
    return this.add(v.negative())
  }
  /**
   * Returns a * v
   * @param {number} a The scalar.
   * @return {Vector} a * v
   * @throws {TypeError} If a is not a number.
   */
  scale(a) {
    if(typeof a === 'number') {
      return new Vector(a * this.x, a * this.y, a * this.z)
    }
    else { throw new TypeError("param must be a number") }
  }
  /**
   * Returns v . v2
   * @param {Vector} v2 The vector to dot product.
   * @return {number} v . v2
   * @throws {TypeError} If v2 is not a vector.
   */
  dotProduct(v) {
    if(v instanceof Vector) {
      return (this.x * v.x) + (this.y * v.y) + (this.z * v.z)
    }
    else { throw new TypeError("param must be an instanceof Vector") }
  }
  vectorFunction(f) {
    return new Vector(f(this.x), f(this.y))
  }
}
