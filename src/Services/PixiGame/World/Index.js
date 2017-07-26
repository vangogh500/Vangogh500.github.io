/**
 * @file Provides physics world and engine for Pixi game
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {provideContext, Wrapper} from '../../hocs.js'

type PropTypes = {
  p: number, p0: number, p1: number, p2: number,
  children?: React.Children
}
type DefaultPropTypes = {
  p: number,
  p0: number,
  p1: number,
  p2: number
}

/**
 * @class
 * @extends {React.Component}
 * Physics engine and world for PixiGame
 */
export default class PixiWorld extends React.Component<DefaultPropTypes, PropTypes, void> {
  static defaultProps = {
    p: 1, p0: 1, p1: 1, p2: 1
  }
  render() {
    const {p, p0, p1, p2, children} = this.props
    const childContextTypes = {
      p: ReactPropTypes.number,
      p0: ReactPropTypes.number,
      p1: ReactPropTypes.number,
      p2: ReactPropTypes.number
    }
    const getChildContext = () => {
      return {
        p, p0, p1, p2
      }
    }
    const Provider = provideContext(childContextTypes, getChildContext)(Wrapper)
    return (
      <Provider id="world-provider">
        {children}
      </Provider>
    )
  }
}
