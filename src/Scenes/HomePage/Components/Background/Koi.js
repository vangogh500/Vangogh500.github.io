import React from 'react'
import {DisplayObjectContainer, Sprite} from 'react-pixi'

const assetpath = function(filename) { return './assets/koipond/' + filename }

export default class Koi extends React.Component {
  constructor(props) {
    super(props)
    this.animate.bind(this)
    this.state = {
      rotation: 0
    }
  }
  animate() {
    this.setState({ rotation: this.state.rotation + Math.PI*0.005})
  }
  render() {
    return(
      <DisplayObjectContainer alpha={0.5} rotation={this.state.rotation}>
        <Sprite key={"koi"} image={assetpath('koi-frame-1.svg')} />
      </DisplayObjectContainer>
    )
  }
}
