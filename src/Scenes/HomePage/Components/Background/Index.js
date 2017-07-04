import React from 'react'
import Koi from './Koi.js'
import Canvas from '../../../Components/Canvas.js'
import {loader} from 'pixi.js'

const color = 0x709DA7

const assetpath = function(filename) { return './assets/koipond/' + filename }

/**
 * Background for the home page. Uses Three.js.
 */
export default class Background extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textures: null
    }
  }
  componentDidMount() {
    loader.add('./assets/koipond/textureAtlas.json').load(() => {
      this.setState({ textures: loader.resources['./assets/koipond/textureAtlas.json'].textures })
    })
  }
  render() {
    if(!this.state.textures) {
      return <div></div>
    }
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    return (
      <Canvas width={width} height={height} frameRate={1/30}>
        <Koi ref="koi" textures={this.state.textures} />
      </Canvas>
    )
  }
}
