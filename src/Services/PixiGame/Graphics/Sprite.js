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

type PropTypes = {
  stage: PIXI.Container,
  texture: PIXI.Texture,
  x: number,
  y: number
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
class PixiSprite extends React.Component<void, PropTypes, StateTypes> {
  state = {
    sprite: new PIXI.Sprite(this.props.texture)
  }
  /**
   * Life cycle hook for mounting.
   * @method
   * @memberof PixiSprite
   */
  componentDidMount() {
    const {stage,x,y} = this.props
    const {sprite} = this.state
    sprite.x = x
    sprite.y = y
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
    const {x, y, stage} = nextProps
    const {sprite} = this.state
    if(x !== sprite.x || y !== sprite.y) {
      sprite.x = x
      sprite.y = y
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
