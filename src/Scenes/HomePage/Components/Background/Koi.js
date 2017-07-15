/* @flow */
import * as PIXI from 'pixi.js'
import FluidObject from '../../../../Services/Physics/FluidObject.js'
import FluidEnvironment from '../../../../Services/Physics/Environments/FluidEnvironment.js'
import Vector from '../../../../Services/Physics/Vector.js'
import {thrust, steer} from './Actions/Koi.js'
import KoiStore from './Store/Koi.js'

type KoiTextures = {
  'koi_straight_1.svg': PIXI.Texture,
  'koi_straight_2.svg': PIXI.Texture,
  'koi_straight_3.svg': PIXI.Texture
}
const actions = Array(300).fill(thrust())

/**
 * Koi
 * @class
 * @alias Koi
 * @prop {number} canvasWidth - Canvas width.
 * @prop {number} canvasHeight - Canvas height.
 * @prop {number} frameRate - Canvas frame rate.
 * @prop {pxPerM} pixels per meter
 * @prop {depth} depth of pond
 */
export default class Koi extends PIXI.Container {
  static getFrame(id) {
    switch(id) {
      case 0:
        return 'koi_straight_2.svg'
      case 1:
        return 'koi_straight_1.svg'
      case 2:
        return 'koi_straight_2.svg'
      default:
        return 'koi_straight_3.svg'
    }
  }

  constructor(textures: KoiTextures, frameRate: number, x: number = 300, y: number = 300) {
    super()
    this.x = x
    this.y = y
    const koi = new PIXI.extras.AnimatedSprite([textures['koi_straight_2.svg'], textures['koi_straight_1.svg'], textures['koi_straight_2.svg'], textures['koi_straight_3.svg']])
    koi.anchor = new PIXI.Point(0.5, 0.5)
    koi.rotation = -1.765
    koi.animationSpeed = 0.09
    koi.play()
    this.addChild(koi)
    const fo = new FluidObject(6, 1/3, new Vector(0,0,0), new Vector(x/100,y/100), 0.04, 0.5, 0.3, 2)
    const environment = new FluidEnvironment(1, frameRate, 0, 0.5, 1)
    this.store = new KoiStore(fo, environment)
    this.animate.bind(this)
  }

  animate() {
    const ac = actions.pop()
    this.store.dispatch(ac ? ac : steer(Math.PI/3))
    const {s, theta} = this.store.fo
    this.x = s.x * 100
    this.y = s.y * 100
    this.rotation = theta.z
  }
  /*
  render() {
    const { canvasHeight, canvasWidth, depth, pxPerM } = this.props
    const { s, theta, w } = this.store.fo
    console.log(w.z)
    const {frame} = this.store.koi
    return(
      <DisplayObjectContainer alpha={(100 - Math.pow(s.z, 2))/150} x={s.x * pxPerM} y={s.y * pxPerM} rotation={theta.z} scale={(depth + s.z)/(1.2*depth)}>
        <Sprite key={"koi"} texture={this.props.textures[Koi.getFrame(frame)]} anchor={new PIXI.Point(0.5,0.5)} rotation={-1.765} />
      </DisplayObjectContainer>
    )
  } */
}
