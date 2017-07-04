import {MOVE} from '../Actions/Koi.js'

export default function(state = {}, action) {
  return {
    tickCount: tickCount(state.tickCount, action),
    frame: (state.tickCount % 5 == 0) ? frame(state.frame, action) : state.frame,
    physics: physics(state.physics, action)
  }
}

function physics(state = {}, action) {
  switch(action.type) {
    case MOVE:
      return {
        ...state,
        f: {
          x: -1
        }
      }
    default:
      return state
  }
}

function tickCount(state = 0, action) {
  return (state + 1) % 20
}

function frame(state = 0, action) {
  switch(action.type) {
    case MOVE:
      return (state + 1) % 4
    default:
      return state
  }
}
