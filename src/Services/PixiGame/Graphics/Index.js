/**
 * @file Entry point for Pixi graphics.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import Container from './Container.js'
import Rectangle from './Rectangle.js'
import Sprite from './Sprite.js'
import TilingSprite from './TilingSprite.js'
import DisplacementFilter from './DisplacementFilter.js'
import AnimatedSprite from './AnimatedSprite.js'

/**
 * @class
 * PixiGraphics
 */
export default class PixiGraphics {
  static get Container(): Class<React.Component<*,*,*>> {
    return Container
  }
  static get Rectangle(): Class<React.Component<*,*,*>> {
    return Rectangle
  }
  static get Sprite(): Class<React.Component<*,*,*>> {
    return Sprite
  }
  static get AnimatedSprite(): Class<React.Component<*,*,*>> {
    return AnimatedSprite
  }
  static get TilingSprite(): Class<React.Component<*,*,*>> {
    return TilingSprite
  }
  static get DisplacementFilter(): Class<React.Component<*,*,*>> {
    return DisplacementFilter
  }
}
