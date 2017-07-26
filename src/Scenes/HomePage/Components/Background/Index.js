/**
 * @file Koi pond for my website. Utilizes my implementation of Pixi and React.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import * as PIXI from 'pixi.js'
import Game from '../../../../Services/PixiGame/Index.js'
import Graphics from '../../../../Services/PixiGame/Graphics/Index.js'
import Lilipad from './Lilipad.js'
import WaterFilter from './WaterFilter.js'
import RippleGenerator from './RippleGenerator.js'

type StateTypes = {
  loaded: boolean
}
/**
 * @class
 * @extends {React.Component}
 * Koi pond.
 */
export default class KoiPond extends React.Component<void, void, StateTypes> {
  state = {
    loaded: false
  }
  componentDidMount() {
    PIXI.loader.add('koi_pond','./assets/koipond/koi-pond.json')
      .add('koi','./assets/koipond/koi.json')
      .add('ripple', './assets/koipond/ripple-map.png').load(() => {
        this.setState({ loaded: true })
      })
  }
  render() {
    const {loaded} = this.state
    const loader = PIXI.loader
    if(loaded) {
      return (
        <Game id="koi-pond">
          <Game.Loop>
            <Game.Stage>
              <Game.World>
                <Graphics.Container id="pond">
                  <Graphics.TilingSprite id="bg" alpha={0.5} texture={loader.resources['koi_pond'].textures['koi_pond.png']} width={window.innerWidth} height={window.innerHeight} />
                  <Graphics.Rectangle id="water" color={0x66ff99} alpha={0.4} width={window.innerWidth} height={window.innerHeight} />
                  <WaterFilter />
                  <RippleGenerator />
                </Graphics.Container>
                <Lilipad x={0} y={0} texture={loader.resources['koi_pond'].textures['lilipad.png']} />
              </Game.World>
            </Game.Stage>
          </Game.Loop>
        </Game>
      )
    }
    return null
  }
}
