import React from 'react'
import PropTypes from 'prop-types'
import {Stage, Text} from 'react-pixi'

/**
 * Canvas wrapper
 * @class
 * @alias Canvas
 * @prop {number} width - Canvas width.
 * @prop {number} height - Canvas height.
 * @prop {number} frameRate - Animation frame rate (second per frame)
 */
export default class Canvas extends React.Component {
  static propTypes() {
    return {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
      frameRate: PropTypes.number.isRequired
    }
  }
  constructor(props) {
    super(props)
    this.animate = this.animate.bind(this)
    this.state = {
      fps: 0,
      lastFrameDate: Date.now()
    }
  }
  componentDidMount() {
    console.log(this.props.frameRate)
    setInterval(() => {
      requestAnimationFrame(this.animate)
    }, this.props.frameRate * 1000)
  }
  /**
   * Animates canvas
   */
  animate() {
    const delta = (Date.now() - this.state.lastFrameDate) / 1000
    this.setState({ fps: Math.round(1/delta), lastFrameDate: Date.now() })
    // animate all children element
    Object.keys(this.refs).forEach((prop) => this.refs[prop].animate())
  }
  render() {
    const {width, height, frameRate} = this.props
    return (
      <Stage width={width} height={height}>
        <Text text={this.state.fps + " fps"} x={10} y={10} key="fps-counter" />
        {
          // hook refs to all children
          React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, {
              ref: "ce-" + index,
              canvasHeight: height,
              canvasWidth: width,
              frameRate: frameRate
            })
          })
        }
      </Stage>
    )
  }
}
