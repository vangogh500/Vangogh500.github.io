/**
 * @module PhysicsReducer
 */
import * as Newtonian from './Newtonian.js'

/**
 * Physics Reducer
 * @memberof module:PhysicsReducer
 * @param {object} [state={}] Current state.
 * @param {object} context Physical attributes of its context.
 * @throws {ReferenceError} If there is no context.
 * @return {object} New state.
 */
export default function(state = {}, context) {
  const {cD, aF, m, v={}, s={}, f={}} = state
  if(!context){ throw new ReferenceError() }
  const netF = {
    x: Newtonian.fNetLin(f.x, cD, aF, context.p, v.x),
    y: Newtonian.fNetLin(f.y, cD, aF, context.p, v.y)
  }
  const a = {
    x: Newtonian.aLin(netF.x, m),
    y: Newtonian.aLin(netF.y, m)
  }

  const v2 = {
    x: Newtonian.vLin(v.x, a.x, context.secPerFrame),
    y: Newtonian.vLin(v.y, a.y, context.secPerFrame)
  }
  const s2 = {
    x: Newtonian.sLin(s.x, v2.x, context.secPerFrame, context.pxPerM),
    y: Newtonian.sLin(s.y, v2.y, context.secPerFrame, context.pxPerM)
  }
  return {
    s: s2,
    v: v2,
    m: m,
    aF: aF,
    cD: cD
  }
}
