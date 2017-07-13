import React from 'react'
import Koi from './Koi.js'
import Canvas from '../../../Components/Canvas.js'
import {loader} from 'pixi.js'

/**
 * Koi Pond. Uses Pixi.js.
 */
export default class KoiPond extends React.Component {
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
        <Koi ref="koi" textures={this.state.textures} depth={100} pxPerM={100} />
      </Canvas>
    )
  }
}
