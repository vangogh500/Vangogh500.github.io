/**
 * @file Provides a wrapper for physics bodies in the pixi world.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import {provideContext, Wrapper} from '../../hocs.js'
import Vector from '../../Physics/Vector.js'

type PropTypes = {
  m: number, mr: number, // mass & rotational mass (inertia)
  theta: Vector, s: Vector, // rotation and position vectors
  v: Vector, w: Vector, // velocity and angular velocity vectors
  children?: React.Children,
  id?: string
}
type StateTypes = {
  theta: Vector, s: Vector,
  v: Vector, w: Vector
}

/**
 * @class
 * @extends {React.Component}
 * Physics body for Pixi world.
 */
export default class PixiBody extends React.Component<PropTypes,PropTypes,StateTypes> {
  static defaultProps = {
    m: 1, mr: 1,
    theta: new Vector(), s: new Vector(),
    v: new Vector(), w: new Vector()
  }
  state = {
    theta: this.props.theta, s: this.props.s,
    v: this.props.v, w: this.props.w
  }
  render() {
    const {m, mr, children, id} = this.props
    const {theta, s, v, w} = this.state

    const childContextTypes = {
      m: ReactPropTypes.number.isRequired, mr: ReactPropTypes.number.isRequired,
      theta: ReactPropTypes.object.isRequired, s: ReactPropTypes.object.isRequired,
      v: ReactPropTypes.object.isRequired, w: ReactPropTypes.object.isRequired
    }
    const getChildContext = () => {
      return {
        m, mr, theta, s, v, w
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
