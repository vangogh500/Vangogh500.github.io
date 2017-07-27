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

  /**
   * Life cycle hook for unmount.
   * @method
   * @memberof PixiDisplacementFilter
   */
  componentWillUnmount() {
    const {stage, sprite} = this.props
    const {filter} = this.state
    stage.removeChild(sprite)
    stage.filters = stage.filters.filter((stageFilter) => {
      return stageFilter != filter
    })
  }

  /**
   * Life cycle hook for update.
   * @method
   * @memberof PixiDisplacementFilter
   */
  componentWillUpdate(nextProps: PropTypes) {
    const {stage, sprite} = nextProps
    var {filter} = this.state
    // if sprite is the same do nothing
    if(filter.maskSprite == sprite) {
      return
    }
    // else remove everything, create new filter and add all components
    else {
      stage.removeChild(filter.maskSprite)
      stage.filters = stage.filters.filter((stageFilter) => {
        return stageFilter != filter
      })
      filter = new PIXI.filters.DisplacementFilter(sprite)
      stage.addChild(sprite)
      stage.filters = [...stage.filters, filter]
    }
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
