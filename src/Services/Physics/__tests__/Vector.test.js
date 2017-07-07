import Vector from '../Vector.js'

describe('Vector', function() {
  const v = new Vector()
  const v2 = new Vector(1,2,3)
  test('constructor', function(){
    expect(() => new Vector('0',0,0)).toThrow()
    expect(() => new Vector(0,[0],0)).toThrow()
    expect(() => new Vector(0,0,{'0': 0})).toThrow()
    expect(v.x).toBe(0)
    expect(v.y).toBe(0)
    expect(v.z).toBe(0)
  })
  test('equals', function() {
    expect(v.equals(new Vector())).toBe(true)
    expect(v2.equals(new Vector(1,2,3))).toBe(true)
  })
  test('negative', function() {
    expect(v.negative().equals(new Vector())).toBe(true)
    expect(v2.negative().equals(new Vector(-1,-2,-3))).toBe(true)
  })
  test('normalize', function() {
    expect(() => v.normalize()).toThrow()
    expect(v2.normalize().length()).toBe(1)
    expect(v2.normalize().scale(v2.length()).equals(v2))
  })
  test('add', function() {
    expect(() => v.add(1)).toThrow()
    expect(() => v.add('1')).toThrow()
    expect(v.add(new Vector(1,1,1)).equals(new Vector(1,1,1))).toBe(true)
    expect(v2.add(new Vector(1,1,1)).equals(new Vector(2,3,4))).toBe(true)
  })
  test('subtract', function() {
    expect(() => v.subtract(1)).toThrow()
    expect(() => v.subtract('1')).toThrow()
    expect(v.subtract(new Vector(1,1,1)).equals(new Vector(-1,-1,-1))).toBe(true)
    expect(v2.subtract(new Vector(1,1,1)).equals(new Vector(0,1,2))).toBe(true)
  })
  test('scale', function() {
    expect(() => v.scale(new Vector())).toThrow()
    expect(() => v.scale('1')).toThrow()
    expect(v.scale(2).equals(new Vector(0,0,0))).toBe(true)
    expect(v2.scale(2).equals(new Vector(2,4,6))).toBe(true)
  })
  test('dot product', function() {
    expect(() => v.dotProduct(1)).toThrow()
    expect(() => v.dotProduct('1')).toThrow()
    expect(() => v.dotProduct([1])).toThrow()
    expect(v.dotProduct(new Vector(1,1,1))).toEqual(0)
    expect(v2.dotProduct(new Vector(1,1,1))).toEqual(6)
  })
})
