import {THRUST} from '../Actions/Koi.js'
import {applyLinearForce} from '../../../../../Services/Physics/Actions/Force.js'

export default function(state = {}, action) {
  return {
    tickCount: tickCount(state.tickCount, action),
    frame: (state.tickCount % 5 == 0) ? frame(state.frame, action) : state.frame
  }
}

function tickCount(state = 0, action) {
  switch(action.type) {
    case THRUST:
      return (state + 1) % 20
    default:
      return state
  }
}

function frame(state = 0, action) {
  switch(action.type) {
    case THRUST:
      return (state + 1) % 4
    default:
      return state
  }
}
