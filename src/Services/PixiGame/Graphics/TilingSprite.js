/**
 * @file Provides a react wrapper for a pixi tiling sprite.
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
  width: number,
  height: number,
  alpha: number
}
type DefaultPropTypes = {
  alpha: number
}
/**
 * @todo create state type
 */
type StateTypes = {
  sprite: PIXI.extras.TilingSprite
}

/**
 * @class
 * @extends {React.Component}
 * Pixi tiling sprite React Component.
 */
class PixiTilingSprite extends React.Component<DefaultPropTypes, PropTypes, StateTypes> {
  static defaultProps = {
    alpha: 1
  }
  state = {
    sprite: new PIXI.extras.TilingSprite(this.props.texture, this.props.width, this.props.height)
  }
  /**
   * Life cycle hook for mounting.
   * @method
   * @memberof PixiTilingSprite
   */
  componentDidMount() {
    const {stage, alpha} = this.props
    const {sprite} = this.state
    sprite.alpha = alpha
    stage.addChild(sprite)
  }
  /**
   * Life cycle hook for unmounting.
   * @method
   * @memberof PixiTilingSprite
   */
  componentWillUnmount() {
    const {stage} = this.props
    const {sprite} = this.state
    stage.removeChild(sprite)
  }
  /**
   * Renders React element
   * @method
   * @memberof PixiTilingSprite
   */
  render() {
    return null
  }
}

const contextTypes = {
  stage: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(PixiTilingSprite)
