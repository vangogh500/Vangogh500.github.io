import koiReducer from '../Reducers/Koi.js'
import {dragForce} from '../../../../../Services/Physics/Actions/Force.js'

/**
 * A Simple Koi Store for storing and handling the state of a Koi
 * @class
 * @alias KoiStore
 */
export default class KoiStore {
  /**
   * Constructor
   * @param {PhysicsState} physics Initial PhysicsState.
   * @param {Environment} environment Physics environment.
   */
  constructor(physics, environment) {
    this.koi = { frame: 0 }
    this.physics = physics
    this.environment = environment
    this.dispatch = this.dispatch.bind(this)
    this.applyKoiAction = this.applyKoiAction.bind(this)
    this.applyForce = this.applyForce.bind(this)
    this.getPhysicsState = this.getPhysicsState.bind(this)
    this.getKoiState = this.getKoiState.bind(this)
  }
  dispatch(action) {
    // async action
    if(typeof action === 'function') {
      action(this.applyKoiAction, this.applyForce)
      this.physics.applyForce(dragForce(this.environment.p))
      this.physics.tick(this.environment.secPerFrame)
    }
    else {
      throw new TypeError()
    }
  }
  applyKoiAction(action) {
    this.koi = koiReducer(this.koi, action)
  }
  applyForce(force) {
    this.physics.applyForce(force)
  }
  getKoiState() {
    return this.koi
  }
  getPhysicsState() {
    return this.physics.getState()
  }
}
