import React from 'react'
import Pond from './Pond.js'
import Lilipad from './Lilipad.js'
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
    PIXI.loader.add('koi_pond','./assets/koipond/koi-pond.json')
      .add('koi','./assets/koipond/koi.json')
      .add('ripple', './assets/koipond/ripple-map.png').load(() => {
      this.refs.canvas.appendChild(this.app.view)
      const pond = new Pond(this.app.stage, this.app.view)
      const ripples = new PIXI.Container()


      const lilipad = new Lilipad(PIXI.loader.resources['koi_pond'].textures['lilipad.png'])
      this.app.stage.addChild(lilipad)

      this.app.ticker.add((delta) => {
        pond.animate()
        lilipad.animate()
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
