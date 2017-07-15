/* @flow */
import type {KoiAction} from '../Actions/Koi.js'

/**
 * @module KoiReducer
 * @file Includes reducer and koi state
 * @author Kai Matsuda
 * @version 0.0.1
 */

/**
 * KoiState
 */
export type KoiState = {
  +frame: number,
  +tick: number
}

/**
 * Main reducer for the Koi
 * @memberof module:KoiReducer
 * @param {KoiState} state The state of the Koi.
 * @param {KoiAction} action The action take by the Koi.
 * @return {KoiState} The new state.
 * @throws {Error} If params are not of the right type.
 */
export function reducer(state: KoiState, action: KoiAction): KoiState {
  return {
    tick: tickCount(state.tick, action),
    frame: (state.tick % 5 == 0) ? frame(state.frame, action) : state.frame
  }
}

/**
 * Reducer for the tick count
 * @memberof module:KoiReducer
 * @param {number} [state=0] The tick count.
 * @param {KoiAction} action The Koi action.
 * @return {number} The next tick count.
 * @throws {Error} If params are not of the right type.
 */
function tickCount(state:number = 0, action: KoiAction): number {
  switch(action.type) {
    case 'THRUST':
      return (state + 1) % 20
    default:
      return state
  }
}

/**
 * Reducer for the Koi frame
 * @memberof module:KoiReducer
 * @param {number} [state=0] The current frame.
 * @param {KoiAction} action The Koi action.
 * @return {number} The next frame.
 * @throws {Error} If params are not of the right type.
 */
function frame(state:number = 0, action: KoiAction): number {
  switch(action.type) {
    case 'THRUST':
      return (state + 1) % 4
    case 'STEER':
      return (action.theta > 0) ? 3 : 1
    default:
      return state
  }
}
