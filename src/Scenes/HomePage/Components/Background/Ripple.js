/**
 * @file Ripple for the Koi Pond.
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
  ticker: PIXI.ticker.Ticker,
  id: string,
  onRemove: (id: string) => void
}

type StateTypes = {
  filterSprite: PIXI.Sprite
}
/**
 * @class
 * @extends {React.Component}
 * Ripple for the Koi Pond.
 */
class KoiPondRipple extends React.Component<void, PropTypes, StateTypes> {
  state = {
    filterSprite: this.initFilterSprite()
  }
  /**
   * Initializes the initial sprite for filter
   * @method
   * @private
   * @memberof KoiPondRipple
   * @return {PIXI.Sprite}
   */
  initFilterSprite() {
    const filterSprite = new PIXI.Sprite(PIXI.loader.resources['ripple'].texture)
    filterSprite.anchor = new PIXI.Point(0.5,0.5)
    const {x,y} = this.props
    filterSprite.x = x
    filterSprite.y = y
    filterSprite.scale = new PIXI.Point(0.1,0.1)
    return filterSprite
  }
  /**
   * Life cycle hook for mounting.
   * @method
   * @memberof KoiPondRipple
   */
  componentDidMount() {
    const {ticker} = this.props
    ticker.add(this.animate)
  }
  /**
   * Life cycle hook for unmounting.
   * @method
   * @memberof KoiPondRipple
   */
  componentWillUnmount() {
    const {ticker} = this.props
    ticker.remove(this.animate)
  }

  /**
   * Animates the ripple.
   * @method
   * @memberof KoiPondRipple
   */
  animate = (function() {
    const delta = 0.025
    const {filterSprite} = this.state
    const {onRemove, id} = this.props
    if(filterSprite.width > window.innerWidth * 4 && filterSprite.height > window.innerHeight * 4) {
      return onRemove(id)
    }
    filterSprite.scale.x += delta
    filterSprite.scale.y += delta
  }).bind(this)

  /**
   * Renders the react element.
   * @method
   * @memberof KoiPondRipple
   * @returns {React.Element}
   */
  render() {
    const {filterSprite} = this.state
    return <Graphics.DisplacementFilter sprite={filterSprite} />
  }
}

const contextTypes = {
  ticker: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(KoiPondRipple)
