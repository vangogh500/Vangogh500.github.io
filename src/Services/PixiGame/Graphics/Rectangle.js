/**
 * @file Provides a react wrapper for drawing a pixi rectangle.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import {withContext} from '../../hocs.js'

type PropTypes = {
  stage: PIXI.Container,
  color: number,
  alpha: number,
  x: number,
  y: number,
  width: number,
  height: number
}
type DefaultPropTypes = {
  alpha: number,
  x: number,
  y: number
}
type StateTypes = {
  graphics: PIXI.Graphics
}

/**
 * @class
 * @extends {React.Component}
 * Pixi rectangle.
 */
class PixiRectangle extends React.Component<DefaultPropTypes, PropTypes, StateTypes> {
  static defaultProps = {
    alpha: 1,
    x: 0,
    y: 0
  }
  state = {
    graphics: new PIXI.Graphics()
  }
  /**
   * Life cycle hook for mounting.
   * @method
   * @memberof PixiRectangle
   */
  componentDidMount() {
    const {graphics} = this.state
    const {stage, color, alpha, x, y, width, height} = this.props
    graphics.beginFill(color)
    graphics.alpha = alpha
    graphics.drawRect(x, y, width, height)
    graphics.endFill()
    stage.addChild(graphics)
  }
  /**
   * Life cycle hook for unmounting.
   * @method
   * @memberof PixiRectangle
   */
  componentWillUnmount() {
    const {graphics} = this.state
    const {stage} = this.props
    stage.removeChild(graphics)
  }
  /**
   * Renders React element
   * @method
   * @memberof PixiRectangle
   */
  render() {
    return null
  }
}

const contextTypes = {
  stage: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(PixiRectangle)
