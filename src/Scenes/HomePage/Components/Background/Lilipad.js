import * as PIXI from 'pixi.js'

export default class Lilipad extends PIXI.Sprite {
  constructor(texture: PIXI.Texture) {
    super(texture)
    this.tick = 0
  }
  animate() {
    this.tick = (this.tick + 1) % 61
    if(this.tick == 30) {
      this.y += 2
    }
    if(this.tick == 60) {
      this.y -= 2
    }
  }
}
