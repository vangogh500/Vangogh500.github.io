/* @flow */
import FluidObject from '../../../../../Services/Physics/FluidObject.js'
import FluidEnvironment from '../../../../../Services/Physics/Environments/FluidEnvironment.js'
import {reducer} from '../Reducers/Koi.js'
import {applyDragForce, applyAngularDrag} from '../../../../../Services/Physics/Actions/FluidMechanicForce.js'
import type {KoiAction, KoiObjectAction} from '../Actions/Koi.js'
import type {KoiState} from '../Reducers/Koi.js'

/**
 * A Simple Koi Store for storing and handling the state of a Koi
 * @class
 * @alias KoiStore
 * @author Kai Matsuda
 * @version 0.0.1
 */
export default class KoiStore {
  koi: KoiState
  fo: FluidObject
  environment: FluidEnvironment
  /**
   * Constructor
   * @param {FluidObject} fo Fluid object representing the koi.
   * @param {FluidEnvironment} environment Fluid enviroment representing the koi pond.
   * @throws {Error} If params are not of correct type.
   */
  constructor(fo: FluidObject, environment: FluidEnvironment) {
    this.koi = { frame: 0, tick: 0 }
    this.fo = fo
    this.environment = environment
    const self : any = this
    self.dispatch = self.dispatch.bind(this)
    self.applyKoiAction = self.applyKoiAction.bind(this)
  }

  /**
   * Dispatches Koi Object Actions
   * @param {KoiObjectAction} action The action to take.
   * @throws {Error} If param is not of the right type.
   */
  dispatch(action: KoiObjectAction): void {
    action(this.fo, this.applyKoiAction, this.environment)
    applyDragForce(this.fo, this.environment)
    applyAngularDrag(this.fo, this.environment)
    this.fo.tick(this.environment.secPerFrame)
  }
  /**
   * Applies Koi Action
   * @param {KoiAction} action The action to take.
   * @throws {Error} If param is not of the right type.
   */
  applyKoiAction(action: KoiAction): void {
    this.koi = reducer(this.koi, action)
  }
}
