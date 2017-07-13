import FluidEnvironment from '../FluidEnvironment.js'

describe('FluidEnvironment', function() {
  test('constructor', function() {
    expect(() => new FluidEnvironment('1')).toThrow()
    expect(() => new FluidEnvironment([1])).toThrow()
    expect(() => new FluidEnvironment(1, '1')).toThrow()
    const environment = new FluidEnvironment(1,2)
    expect(environment.secPerFrame).toBe(2)
    const environment2 = new FluidEnvironment(1)
    expect(environment2.p).toBe(1)
  })
})
