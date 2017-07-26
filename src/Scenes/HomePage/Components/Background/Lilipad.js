/**
 * @file Lilipad for the Koi pond.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import Graphics from '../../../../Services/PixiGame/Graphics/Index.js'
import {withContext} from '../../../../Services/hocs.js'

type PropTypes = {
  x: number,
  y: number,
  texture: PIXI.Texture,
  ticker: PIXI.ticker.Ticker
}

type StateTypes = {
  x: number,
  y: number,
  tick: number
}

/**
 * @class
 * @extends {React.Component}
 * Lilipad
 */
class Lilipad extends React.Component<void, PropTypes, StateTypes> {
  state = {
    x: this.props.x,
    y: this.props.y,
    tick: 0
  }
  componentDidMount() {
    const {ticker} = this.props
    ticker.add((deltaTime) => this.animate())
  }
  animate() {
    var {tick, x, y} = this.state
    tick = (tick + 1) % 61
    if(tick == 30) {
      y += 2
    }
    if(tick == 60) {
      y -= 2
    }
    this.setState({ tick, x, y })
  }
  render() {
    const {texture} = this.props
    const {x, y} = this.state
    return (
      <Graphics.Sprite texture={texture} x={x} y={y} />
    )
  }
}

const contextTypes = {
  ticker: ReactPropTypes.object.isRequired
}
export default withContext(contextTypes)(Lilipad)
