import * as PIXI from 'pixi.js'

export default class Ripple {
  constructor(texture: PIXI.Texture, x: number, y: number, stage: PIXI.Container) {
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor = new PIXI.Point(0.5,0.5)
    this.sprite.x = x
    this.sprite.y = y
    this.sprite.scale = new PIXI.Point(0.1,0.1)
    this.stage = stage
    this.stage.addChild(this.sprite)
    this.filter = new PIXI.filters.DisplacementFilter(this.sprite)
    this.stage.filters = [...this.stage.filters, this.filter]
    this.stage.entities.push(this)
  }
  animate() {
    if(this.sprite.width > window.innerWidth * 4 && this.sprite.height > window.innerHeight * 4) {
      this.stage.removeChild(this.sprite)
      this.stage.filters = this.stage.filters.filter((filter) => (filter !== this.filter))
      this.stage.entities.splice(this.stage.entities.indexOf(this), 1)
    }
    else {
      this.sprite.scale.x += 0.025
      this.sprite.scale.y += 0.025
    }
  }
}
