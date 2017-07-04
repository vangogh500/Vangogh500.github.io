import Reducer from '../Index.js'

describe('Index', function() {
  test('Error handling', function() {
    expect(() => Reducer(undefined, undefined)).toThrow()
    expect(() => Reducer(undefined, { p: 1.2 })).toThrow()
    expect(() => Reducer(undefined, { secPerFrame: 1/30 })).toThrow()
    expect(() => Reducer(undefined, { secPerFrame: 1/30, p: 1.2 })).toThrow()
    expect(() => Reducer({ cD: 1.05, aF: 4 }, { secPerFrame: 1/30, p: 1.2 })).toThrow()
    expect(() => Reducer({ aF: 4, m: 10 }, { secPerFrame: 1/30, p: 1.2 })).toThrow()
  })
  test('Should produce expected results', function() {
    const context = { secPerFrame: 1/100, p: 1, pxPerM: 100 }
    const properties = { cD: 2, aF: 1, m: 10 }
    const f = { x: 10 }
    const v = { x: 10 }
    expect(Reducer({ ...properties, f }, context)).toEqual({ ...properties, v: { x: 0.01, y: 0 }, s: { x: 0.01, y: 0 }})
    expect(Reducer({ ...properties, v }, context)).toEqual({ ...properties, v: { x: 9.9, y: 0 }, s: { x: 9.9, y: 0 }})
  })
})
