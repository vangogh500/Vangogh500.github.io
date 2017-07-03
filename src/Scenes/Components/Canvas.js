import React from 'react'
import PropTypes from 'prop-types'
import {Stage} from 'react-pixi'

/**
 * Canvas wrapper
 * @class
 * @alias Canvas
 * @prop {number} width - Canvas width.
 * @prop {number} height - Canvas height.
 */
export default class Canvas extends React.Component {
  static propTypes() {
    return {
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
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
    this.animate()
  }
  /**
   * Animates canvas
   */
  animate() {
    const delta = (Date.now() - this.state.lastFrameDate) / 1000
    this.setState({ fps: 1/delta, lastFrameDate: Date.now() })
    Object.keys(this.refs).forEach((prop) => this.refs[prop].animate())
    requestAnimationFrame(this.animate)
  }
  render() {
    const {width, height} = this.props
    return (
      <Stage width={width} height={height}>
        {
          // returns children with refs
          React.Children.map(this.props.children, (child, index) => {
            return React.cloneElement(child, { ref: "ce-" + index })
          })
        }
      </Stage>
    )
  }
}
