import React from 'react'
import Ripple from './Ripple.js'
import Koi from './Koi.js'
import * as PIXI from 'pixi.js'

/**
 * Koi Pond. Uses PIXI.js.
 */
export default class KoiPond extends React.Component {
  constructor(props) {
    super(props)
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    this.app = new PIXI.Application(width, height)
    this.state = {
      textures: null
    }
  }
  componentDidMount() {
    // load resources
    PIXI.loader.add('bg','./assets/koipond/koi-pond.json')
      .add('koi','./assets/koipond/koi.json')
      .add('ripple', './assets/koipond/ripple-map.png').load(() => {
      this.refs.canvas.appendChild(this.app.view)
      // background
      const bg = new PIXI.extras.TilingSprite(PIXI.loader.resources['bg'].textures['koi_pond.png'], this.app.renderer.width, this.app.renderer.height)
      bg.alpha = 0.5
      this.app.stage.addChild(bg)

      const koi = new Koi(PIXI.loader.resources['koi'].textures, 1/30)
      this.app.stage.addChild(koi)

      // water
      const water = new PIXI.Graphics()
      water.beginFill(0x66ff99)
      water.alpha = 0.4
      water.drawRect(0,0,this.app.stage.width, this.app.stage.height)
      water.endFill()
      this.app.stage.addChild(water)

      this.app.stage.entities = [koi]

      const waves = PIXI.Sprite.fromImage("http://i.imgur.com/2yYayZk.png")
      waves.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
      const wavesFilter = new PIXI.filters.DisplacementFilter(waves)
      this.app.stage.addChild(waves)
      this.app.stage.filters = [wavesFilter]

      this.app.view.addEventListener('mousedown', (ev) => {
        const ripple = new Ripple(PIXI.loader.resources['ripple'].texture, ev.clientX, ev.clientY, this.app.stage)
      })

      this.app.ticker.add((delta) => {
        const offset = 0.2
        this.app.stage.entities.forEach((entity) => {
          entity.animate()
        })
        waves.x += offset
        waves.y += offset
      })
      // this.setState({ textures: PIXI.loader.resources['./assets/koipond/textureAtlas.json'].textures })
    })

  }
  render() {
    const {app} = this.state
    return (
      <div id="koi-pond" ref="canvas">
      </div>
    )
  }
}
