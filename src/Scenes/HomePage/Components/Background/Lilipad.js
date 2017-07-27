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
import Vector from '../../../../Services/Physics/Vector.js'


type PropTypes = {
  s: Vector,
  ticker: PIXI.ticker.Ticker
}

type StateTypes = {
  s: Vector,
  tick: number
}

/**
 * @class
 * @extends {React.Component}
 * Lilipad
 */
class Lilipad extends React.Component<void, PropTypes, StateTypes> {
  state = {
    s: this.props.s,
    tick: 0
  }
  componentDidMount() {
    const {ticker} = this.props
    ticker.add((deltaTime) => this.animate())
  }
  animate() {
    var {tick, s} = this.state

    tick = (tick + 1) % 61
    if(tick == 30) {
      s.y += 2
    }
    if(tick == 60) {
      s.y -= 2
    }
    this.setState({ tick, s })
  }
  render() {
    const {s} = this.state
    const loader = PIXI.loader
    return (
      <Graphics.Sprite texture={loader.resources['koi_pond'].textures['lilipad.png']} s={s} />
    )
  }
}

const contextTypes = {
  ticker: ReactPropTypes.object.isRequired
}
export default withContext(contextTypes)(Lilipad)
