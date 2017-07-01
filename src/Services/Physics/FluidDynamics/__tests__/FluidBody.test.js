import FluidBody from '../FluidBody.js'

describe('FluidBody', function() {
  test('constructor', function() {
    expect(() => new FluidBody("hi", 60)).toThrow()
    expect(() => new FluidBody(60, [1,2,3])).toThrow()
    const test = new FluidBody(60,60)
    expect(test.state.length).toEqual(60)
    test.state.forEach(row => {
      expect(row.length).toEqual(60)
    })
  })
})
