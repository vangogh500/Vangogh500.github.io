import FluidObject from '../FluidObject.js'
import Vector from '../Vector.js'

describe('FluidObject', function() {
  test('constructor', function() {
    expect(() => new FluidObject(1,1,undefined,undefined,'1',25,25,5)).toThrow()
    expect(() => new FluidObject(1,1,undefined,undefined,0.2,[1],25,5)).toThrow()
    expect(() => new FluidObject(1,1,undefined,undefined,0.5,25,undefined,5)).toThrow()
    expect(() => new FluidObject(1,1,undefined,undefined,0.5,25,25,'5')).toThrow()
    const object = new FluidObject(1,1,undefined,undefined,0.2,25,25,5)
    expect(object.theta.equals(new Vector())).toBe(true)
    expect(object.s.equals(new Vector())).toBe(true)
    expect(object.cD).toBe(0.2)
    expect(object.frontalA).toBe(25)
    expect(object.length).toBe(5)
  })
})
