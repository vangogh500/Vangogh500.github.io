/**
 * @file Provides a react wrapper for a pixi sprite.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import * as PIXI from 'pixi.js'
import ReactPropTypes from 'prop-types'
import {withContext} from '../../hocs.js'
import Vector from '../../Physics/Vector.js'

type PropTypes = {
  stage: PIXI.Container,
  texture: PIXI.Texture,
  s: Vector,
  theta: Vector
}
type DefaultPropTypes = {
  theta: Vector
}
/**
 * @todo create state type
 */
type StateTypes = {
  sprite: PIXI.Sprite
}

/**
 * @class
 * @extends {React.Component}
 * Pixi sprite React Component.
 */
class PixiSprite extends React.Component<DefaultPropTypes, PropTypes, StateTypes> {
  static defaultProps = {
    theta: new Vector()
  }
  state = {
    sprite: new PIXI.Sprite(this.props.texture)
  }
  /**
   * Life cycle hook for mounting.
   * @method
   * @memberof PixiSprite
   */
  componentDidMount() {
    const {stage,s,theta} = this.props
    const {sprite} = this.state
    sprite.x = s.x
    sprite.y = s.y
    sprite.rotation = theta.z
    stage.addChild(sprite)
  }
  /**
   * Life cycle hook for unmounting.
   * @method
   * @memberof PixiSprite
   */
  componentWillUnmount() {
    const {stage} = this.props
    const {sprite} = this.state
    stage.removeChild(sprite)
  }
  /**
   * Life cycle hook for prop update.
   * @method
   * @memberof PixiSprite
   */
  componentWillUpdate(nextProps: PropTypes) {
    const {s, stage} = nextProps
    const {sprite} = this.state
    if(s.x !== sprite.x || s.y !== sprite.y) {
      sprite.x = s.x
      sprite.y = s.y
    }
  }

  /**
   * Renders React element
   * @method
   * @memberof PixiSprite
   */
  render() {
    return null
  }
}

const contextTypes = {
  stage: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(PixiSprite)
