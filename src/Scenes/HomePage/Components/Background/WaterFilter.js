/**
 * @file Water filter for the Koi pond.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import {withContext} from '../../../../Services/hocs.js'
import Graphics from '../../../../Services/PixiGame/Graphics/Index.js'

type PropTypes = {
  ticker: PIXI.ticker.Ticker
}
type StateTypes = {
  filterSprite: PIXI.Sprite
}

/**
 * @class
 * @extends {React.Component}
 * Water filter for the Koi Pond.
 */
class WaterFilter extends React.Component<void, PropTypes, StateTypes> {
  state = {
    filterSprite: PIXI.Sprite.fromImage("http://i.imgur.com/2yYayZk.png")
  }
  /**
   * Life cycle hook for mounting.
   * @method
   * @memberof WaterFilter
   */
  componentDidMount() {
    const {ticker} = this.props
    const {filterSprite} = this.state
    filterSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    ticker.add(this.animate)
  }
  /**
   * Life cycle hook for unmounting.
   * @method
   * @memberof WaterFilter
   */
  componentWillUnmount() {
    const {ticker} = this.props
    ticker.remove(this.animate)
  }
  /**
   * Animates Water
   * @method
   * @memberof WaterFilter
   */
  animate = (function() {
    const {filterSprite} = this.state
    const offset = 0.2
    filterSprite.x += offset
    filterSprite.y += offset
  }).bind(this)

  /**
   * Renders React Element
   * @method
   * @memberof WaterFilter
   * @returns {ReactElement}
   */
  render() {
    const {filterSprite} = this.state
    const loader = PIXI.loader
    return (
      <Graphics.DisplacementFilter id="waves" sprite={filterSprite}/>
    )
  }
}

const contextTypes = {
  ticker: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(WaterFilter)
