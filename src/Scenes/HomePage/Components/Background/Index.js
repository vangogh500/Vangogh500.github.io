import React from 'react'
import Koi from './Koi.js'
import Canvas from '../../../Components/Canvas.js'

const color = 0x709DA7

const assetpath = function(filename) { return './assets/koipond/' + filename }

/**
 * Background for the home page. Uses Three.js.
 */
export default class Background extends React.Component {
  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height
    return (
      <Canvas width={width} height={height}>
        <Koi ref="koi" />
      </Canvas>
    )
  }
}
