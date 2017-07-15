import FluidEnvironment from '../FluidEnvironment.js'

describe('FluidEnvironment', function() {
  test('constructor', function() {
    expect(() => new FluidEnvironment('1')).toThrow()
    expect(() => new FluidEnvironment(1, 1, [1])).toThrow()
    expect(() => new FluidEnvironment(1, 1, 1, '1')).toThrow()
    expect(() => new FluidEnvironment(1, 1, 1, 1, [1])).toThrow()
    expect(() => new FluidEnvironment(1, '1')).toThrow()
    const environment = new FluidEnvironment(3,2,1,2,1)
    expect(environment.secPerFrame).toBe(2)
    expect(environment.p).toBe(3)
    expect(environment.p0).toBe(1)
    expect(environment.p1).toBe(2)
    expect(environment.p2).toBe(1)
  })
})
