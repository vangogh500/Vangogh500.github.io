import {directionalForce, dragForce} from '../Actions/Force.js'
import Vector from '../Vector.js'

describe('Force', function() {
  test('directionalForce', function() {
    expect(() => directionalForce()).toThrow()
    expect(() => directionalForce(1)).toThrow()
    expect(() => directionalForce([3])).toThrow()
  })
  test('dragForce', function() {
    expect(() => directionalForce()).toThrow()
    expect(() => directionalForce('1')).toThrow()
    expect(() => directionalForce([1])).toThrow()
  })
})
