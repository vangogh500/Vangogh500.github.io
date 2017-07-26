/**
 * @file A react wrapper for a mouse event in Pixi
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import {withContext} from '../../hocs.js'

type PropTypes = {
  stage: PIXI.Container,
  onClick: any
}

/**
 * @class
 * @extends {React.Component}
 * Pixi Mouse Event.
 */
class PixiMouseEvent extends React.Component<void, PropTypes, void> {
  handleClick = (function(ev) {
    const {onClick} = this.props
    onClick(ev)
  }).bind(this)

  componentDidMount() {
    const {stage, onClick} = this.props
    stage.interactive = true
    stage.on('click', this.handleClick)
  }
  componentWillUnmount() {
    const {stage} = this.props
    stage.off('click', this.handleClick)
  }
  render() {
    return null
  }
}

const contextTypes = {
  stage: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(PixiMouseEvent)
