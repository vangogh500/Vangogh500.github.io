/**
 * @file Provides a react wrapper for a pixi filter.
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
  sprite: PIXI.Sprite
}
type StateTypes = {
  filter: PIXI.filters.DisplacementFilter
}

/**
 * @class
 * @extends {React.Component}
 * Pixi Filter
 */
class PixiDisplacementFilter extends React.Component<void, PropTypes, StateTypes> {
  state = {
    filter: new PIXI.filters.DisplacementFilter(this.props.sprite)
  }
  /**
   * Life cycle hook for mount.
   * @method
   * @memberof PixiDisplacementFilter
   */
  componentDidMount() {
    const {stage, sprite} = this.props
    const {filter} = this.state
    stage.addChild(sprite)
    stage.filters = [...stage.filters, filter]
  }
  componentWillUnmount() {
    const {stage, sprite} = this.props
    const {filter} = this.state
    stage.removeChild(sprite)
    stage.filters = stage.filters.filter((stageFilter) => {
      return stageFilter != filter
    })
  }

  render() {
    return null
  }
}

const contextTypes = {
  stage: ReactPropTypes.object.isRequired
}

console.log(withContext)

export default withContext(contextTypes)(PixiDisplacementFilter)
