/**
 * @file Provides game loop to Pixi game.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import * as PIXI from 'pixi.js'
import ReactPropTypes from 'prop-types'
import {withContext, provideContext, Wrapper} from '../hocs.js'

type PropTypes = {
  app: PIXI.Application,
  children?: React.Children
}
type StateTypes = {
  ticker: any
}
/**
 * @class
 * @extends {React.Component}
 * Game loop provider for Pixi.
 */
class PixiLoop extends React.Component<void, PropTypes, StateTypes> {
  state = {
    ticker: this.props.app.ticker
  }
  componentDidMount() {
    const {ticker} = this.state
    ticker.start()
  }
  /**
   * Life cycle hook for unmount.
   * @method
   * @memberof PixiLoop
   */
  componentWillUnmount() {
    const {ticker} = this.state
    ticker.stop()
  }
  /**
   * Renders the react element
   * @method
   * @memberof PixiLoop
   * @return {ReactElement}
   */
  render() {
    const {children} = this.props
    const childContextTypes = {
      ticker: ReactPropTypes.object.isRequired
    }
    const getChildContext = () => {
      return {
        ticker: this.state.ticker
      }
    }
    const Provider = provideContext(childContextTypes, getChildContext)(Wrapper)
    return (
      <Provider id="looper-provider">
        {children}
      </Provider>
    )
  }
}

const contextTypes = {
  app: ReactPropTypes.object.isRequired
}
export default withContext(contextTypes)(PixiLoop)
