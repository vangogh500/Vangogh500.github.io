import React from 'react'
import PropTypes from 'prop-types'
import {DisplayObjectContainer, Sprite} from 'react-pixi'
import reducer from './Reducers/Koi.js'
import physicsReducer from '../../../../Services/Physics/Reducers/Index.js'
import {move} from './Actions/Koi.js'

/**
 * Koi
 * @class
 * @alias Koi
 * @prop {number} canvasWidth - Canvas width.
 * @prop {number} canvasHeight - Canvas height.
 * @prop {number} frameRate - Canvas frame rate.
 */
export default class Koi extends React.Component {
  static propTypes() {
    return {
      canvasWidth: PropTypes.number.isRequired,
      canvasHeight: PropTypes.number.isRequired,
      frameRate: PropTypes.number.isRequired
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
    this.animate.bind(this)
    this.state = {
      tickCount: 0,
      frame: 0,
      physics: {
        s: {
          x: props.canvasWidth + 200
        },
        m: 6,
        cD: 0.04,
        aF: 0.4
      }
    }
  }

  animate() {
    const oldState = this.state
    const newState = reducer(oldState, move())
    const newPhysics = physicsReducer(newState.physics, { p: 1, pxPerM: 200, secPerFrame: this.props.frameRate })
    this.setState({ ...newState, physics: newPhysics })
  }
  render() {
    const { canvasHeight, canvasWidth } = this.props
    return(
      <DisplayObjectContainer alpha={0.6} x={this.state.physics.s.x} y={0}>
        <Sprite key={"koi"} texture={this.props.textures[Koi.getFrame(this.state.frame)]} rotation={1.35} />
      </DisplayObjectContainer>
    )
  }
}
