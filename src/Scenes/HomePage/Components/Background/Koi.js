/**
 * @file Koi for the Koi pond.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import * as PIXI from 'pixi.js'
import Graphics from '../../../../Services/PixiGame/Graphics/Index.js'
import Body from '../../../../Services/PixiGame/World/Body.js'

import Vector from '../../../../Services/Physics/Vector.js'


/**
 * @class
 * @extends {React.Component}
 * Koi for the Koi pond.
 */
export default class Koi extends React.Component {
  /**
   * Renders react element.
   * @method
   * @memberof Koi
   * @returns {React.Element}
   */
  render() {
    const loader = PIXI.loader
    const textures = loader.resources['koi'].textures
    const animationTextures = [textures['koi_straight_2.svg'], textures['koi_straight_1.svg'], textures['koi_straight_2.svg'], textures['koi_straight_3.svg']]
    return (
      <Body id="koi" m={6} mr={1/3} theta={new Vector(0,0,-1.765)} s={new Vector(200,200)} v={new Vector(100,0,0)}>
        <Graphics.AnimatedSprite anchor={new PIXI.Point(0.5,0.5)} textures={animationTextures} animationSpeed={0.09} />
      </Body>
    )
  }
}
