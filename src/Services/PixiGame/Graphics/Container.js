/**
 * @file Custom react wrapper for a pixi container.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import {withContext, provideContext, Wrapper} from '../../hocs.js'

/** @todo define types */
type PropTypes = {
  stage: PIXI.Container,
  children?: React.Children,
  id?: string
}
type StateTypes = {
  container: PIXI.Container
}

/**
 * @class
 * @extends {React.Component}
 * Custom Pixi container.
 */
class PixiContainer extends React.Component<void, PropTypes, StateTypes> {
  state = {
    container: this.initializeContainer()
  }

  initializeContainer() {
    const container = new PIXI.Container()
    container.filters = []
    return container
  }
  /**
   * Life cycle hook for mounting.
   * @method
   * @memberof PixiContainer
   */
  componentDidMount() {
    const {stage} = this.props
    const {container} = this.state
    stage.addChild(container)
  }
  /**
   * Life cycle hook for unmount.
   * @method
   * @memberof PixiContainer
   */
  componentWillUnmount() {
    const {stage} = this.props
    const {container} = this.state
    stage.removeChild(container)
  }
  /**
   * Renders the react element
   * @method
   * @memberof PixiContainer
   * @return {ReactElement}
   */
  render() {
    const {children, id} = this.props
    const {container} = this.state
    const childContextTypes = {
      stage: ReactPropTypes.object.isRequired
    }
    const getChildContext = () => {
      return {
        stage: container
      }
    }
    const Provider = provideContext(childContextTypes, getChildContext)(Wrapper)
    return (
      <Provider id={id}>
        {children}
      </Provider>
    )
  }
}

const contextTypes = {
  stage: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(PixiContainer)
