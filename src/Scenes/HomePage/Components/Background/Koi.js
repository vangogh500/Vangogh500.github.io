import React from 'react'
import PropTypes from 'prop-types'
import {DisplayObjectContainer, Sprite} from 'react-pixi'
import {Point} from 'pixi.js'
import reducer from './Reducers/Koi.js'
import PhysicsObject from '../../../../Services/Physics/PhysicsObject.js'
import Vector from '../../../../Services/Physics/Vector.js'
import {thrust} from './Actions/Koi.js'
import KoiStore from './Store/Koi.js'

/**
 * Koi
 * @class
 * @alias Koi
 * @prop {number} canvasWidth - Canvas width.
 * @prop {number} canvasHeight - Canvas height.
 * @prop {number} frameRate - Canvas frame rate.
 * @prop {pxPerM} pixels per meter
 * @prop {depth} depth of pond
 */
export default class Koi extends React.Component {
  static propTypes() {
    return {
      canvasWidth: PropTypes.number.isRequired,
      canvasHeight: PropTypes.number.isRequired,
      frameRate: PropTypes.number.isRequired,
      pxPerM: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired
    }
  }
  static getFrame(id) {
    switch(id) {
      case 0:
        return 'koi_straight_2.svg'
      case 1:
        return 'koi_straight_1.svg'
      case 2:
        return 'koi_straight_2.svg'
      default:
        return 'koi_straight_3.svg'
    }
  }

  constructor(props) {
    super(props)
    const {frameRate, pxPerM} = props
    this.animate.bind(this)
    const physics = new PhysicsObject(6, Math.PI / 6, new Vector(300/pxPerM,300/pxPerM), 0.04, 0.4)
    const environment = { p: 1, secPerFrame: frameRate }
    this.store = new KoiStore(physics, environment)
  }

  animate() {
    this.store.dispatch(thrust(new Vector(1,0,0)))
  }
  render() {
    const { canvasHeight, canvasWidth, depth, pxPerM } = this.props
    const { s, theta } = this.store.getPhysicsState()
    const {frame} = this.store.getKoiState()
    return(
      <DisplayObjectContainer alpha={(100 - Math.pow(s.z, 2))/150} x={s.x * pxPerM} y={s.y * pxPerM} rotation={theta} scale={(depth + s.z)/(1.2*depth)}>
        <Sprite key={"koi"} texture={this.props.textures[Koi.getFrame(frame)]} anchor={new Point(0.5,0.5)} rotation={-1.765} />
      </DisplayObjectContainer>
    )
  }
}
