import {thrust} from '../Koi.js'

describe('KoiAction', function() {
  test('thrust', function() {
    expect(() => thrust('1')).toThrow()
    expect(() => thrust(1)).toThrow()
    expect(() => thrust([1])).toThrow()
    expect(() => thrust(new Vector(1,2,3))).toThrow()
  })
})
