import * as PIXI from 'pixi.js'

export default class Ripple {
  constructor(texture: PIXI.Texture, x: number, y: number, container: PIXI.Container) {
    this.sprite = new PIXI.Sprite(texture)
    this.sprite.anchor = new PIXI.Point(0.5,0.5)
    this.sprite.x = x
    this.sprite.y = y
    this.sprite.scale = new PIXI.Point(0.1,0.1)
    this.container = container
    this.container.addChild(this.sprite)
    this.filter = new PIXI.filters.DisplacementFilter(this.sprite)
    this.container.filters = [...this.container.filters, this.filter]
    this.container.entities.push(this)
  }
  animate() {
    if(this.sprite.width > window.innerWidth * 4 && this.sprite.height > window.innerHeight * 4) {
      this.container.removeChild(this.sprite)
      this.container.filters = this.container.filters.filter((filter) => (filter !== this.filter))
      this.container.entities.splice(this.container.entities.indexOf(this), 1)
    }
    else {
      this.sprite.scale.x += 0.025
      this.sprite.scale.y += 0.025
    }
  }
}
