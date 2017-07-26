/**
 * @file Entry point for Pixi graphics.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import Container from './Container.js'
import Rectangle from './Rectangle.js'
import Sprite from './Sprite.js'
import TilingSprite from './TilingSprite.js'
import DisplacementFilter from './DisplacementFilter.js'

/**
 * @class
 * PixiGraphics
 */
export default class PixiGraphics {
  static get Container() {
    return Container
  }
  static get Rectangle() {
    return Rectangle
  }
  static get Sprite() {
    return Sprite
  }
  static get TilingSprite() {
    return TilingSprite
  }
  static get DisplacementFilter() {
    return DisplacementFilter
  }
}
