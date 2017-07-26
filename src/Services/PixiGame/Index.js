/**
 * @file An alternative to Pixi-React. A custom combination of react=game-kit and pixi logic in a React Component.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import {provideContext, Wrapper} from '../hocs.js'
import Loop from './Loop.js'
import Stage from './Stage/Index.js'
import World from './World/Index.js'
import Body from './World/Body.js'
import Vector from '../Physics/Vector.js'

type PropTypes = {
  children?: React.Children,
  id?: string
}
type StateTypes = {
  app: PIXI.Application
}

/**
 * @class
 * @extends {React.Component}
 * PixiGame container.
 */
export default class PixiGame extends React.Component<void,PropTypes,StateTypes> {
  state = {
    app: new PIXI.Application()
  }
  static get Loop() {
    return Loop
  }
  static get Stage() {
    return Stage
  }
  static get World() {
    return World
  }
  render() {
    const {children, id} = this.props
    const {app} = this.state
    const childContextTypes = {
      app: ReactPropTypes.object.isRequired
    }
    const getChildContext = () => {
      return {
        app: app
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
