/**
 * @file Provides a react wrapper for a pixi animated sprite.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import {withContext} from '../../hocs.js'
import Vector from '../../Physics/Vector.js'


type PropTypes = {
  stage: PIXI.Container,
  textures: Array<PIXI.Texture>,
  s: Vector,
  theta: Vector,
  animationSpeed: number,
  anchor: PIXI.Point
}

type DefaultPropTypes = {
  theta: Vector,
  animationSpeed: number,
  anchor: PIXI.Point
}

type StateTypes = {
  sprite: PIXI.extras.AnimatedSprite
}


/**
 * @class
 * @extends {React.Component}
 * Animated sprite.
 */
class AnimatedSprite extends React.Component<DefaultPropTypes, PropTypes, StateTypes> {
  static defaultProps = {
    theta: new Vector(),
    animationSpeed: 1,
    anchor: new PIXI.Point()
  }
  state = {
    sprite: new PIXI.extras.AnimatedSprite(this.props.textures)
  }

  /**
   * Life cycle hook for mounting.
   * @method
   * @memberof AnimatedSprite
   */
  componentDidMount() {
    const {stage,s,theta, animationSpeed, anchor} = this.props
    const {sprite} = this.state
    sprite.anchor = anchor
    sprite.x = s.x
    sprite.y = s.y
    sprite.rotation = theta.z
    sprite.animationSpeed = animationSpeed
    sprite.play()
    stage.addChild(sprite)
  }

  /**
   * Life cycle hook for unmounting.
   * @method
   * @memberof AnimatedSprite
   */
  componentWillUnmount() {
    const {stage} = this.props
    const {sprite} = this.state
    stage.removeChild(sprite)
  }

  /**
   * Life cycle hook for updating.
   * @method
   * @memberof AnimatedSprite
   */
  componentWillUpdate(nextProps: PropTypes) {
    console.log("test")
    const {stage,s,theta,animationSpeed,anchor} = this.props
    const {sprite} = this.state
    if(sprite.x !== s.x || sprite.y !== s.y) {
      sprite.x = s.x
      sprite.y = s.y
    }
    if(sprite.rotation !== theta.z) {
      sprite.rotation = theta.z
    }
  }

  /**
   * Renders react element.
   * @method
   * @memberof AnimatedSprite
   * @returns {React.Element}
   */
  render() {
    return null
  }
}

const contextTypes = {
  stage: ReactPropTypes.object.isRequired,
  s: ReactPropTypes.object,
  theta: ReactPropTypes.object
}
export default withContext(contextTypes)(AnimatedSprite)
