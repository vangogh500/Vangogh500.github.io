import * as PIXI from 'pixi.js'
import Ripple from './Ripple.js'
import Koi from './Koi.js'

export default class Pond {
  constructor(stage: PIXI.Container, view: HTMLCanvasElement) {
    this.container = new PIXI.Container()
    this.stage = stage
    this.stage.addChild(this.container)
    //background
    this.renderBackground()
    //koi
    const koi = new Koi(PIXI.loader.resources['koi'].textures, 1/30)
    this.container.addChild(koi)
    this.container.entities = [koi]

    // water
    this.renderWater()
    view.addEventListener('mousedown', (ev) => {
      const ripple = new Ripple(PIXI.loader.resources['ripple'].texture, ev.clientX, ev.clientY, this.container)
    })
  }
  renderBackground() {
    const bg = new PIXI.extras.TilingSprite(PIXI.loader.resources['koi_pond'].textures['koi_pond.png'], window.innerWidth, window.innerHeight)
    bg.alpha = 0.5
    this.container.addChild(bg)
  }
  renderWater() {
    const water = new PIXI.Graphics()
    water.beginFill(0x66ff99)
    water.alpha = 0.4
    water.drawRect(0,0,this.container.width, this.container.height)
    water.endFill()
    this.container.addChild(water)
    // waves
    this.waves = PIXI.Sprite.fromImage("http://i.imgur.com/2yYayZk.png")
    this.waves.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT
    const wavesFilter = new PIXI.filters.DisplacementFilter(this.waves)
    this.container.addChild(this.waves)
    this.container.filters = [wavesFilter]
  }

  animate() {
    const offset = 0.2
    this.container.entities.forEach(entity => {
      entity.animate()
    })
    this.waves.x += offset
    this.waves.y += offset
  }
}
