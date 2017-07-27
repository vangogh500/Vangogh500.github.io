/**
 * @file Provides a wrapper for physics bodies in the pixi world.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import {provideContext, Wrapper, withContext} from '../../hocs.js'
import Vector from '../../Physics/Vector.js'

type PropTypes = {
  ticker: PIXI.ticker.Ticker,
  m: number, mr: number, // mass & rotational mass (inertia)
  theta: Vector, s: Vector, // rotation and position vectors
  v: Vector, w: Vector, // velocity and angular velocity vectors
  children?: React.Children,
  id?: string
}
type DefaultPropTypes = {
  m: number, mr: number, // mass & rotational mass (inertia)
  theta: Vector, s: Vector, // rotation and position vectors
  v: Vector, w: Vector // velocity and angular velocity vectors
}
type StateTypes = {
  theta: Vector, s: Vector,
  v: Vector, w: Vector,
  Provider: Class<React.Component<*,*,*>>
}

/**
 * @class
 * @extends {React.Component}
 * Physics body for Pixi world.
 */
class PixiBody extends React.Component<DefaultPropTypes,PropTypes,StateTypes> {
  static defaultProps = {
    m: 1, mr: 1,
    theta: new Vector(), s: new Vector(),
    v: new Vector(), w: new Vector()
  }
  static childContextTypes = {
    m: ReactPropTypes.number.isRequired, mr: ReactPropTypes.number.isRequired,
    theta: ReactPropTypes.object.isRequired, s: ReactPropTypes.object.isRequired,
    v: ReactPropTypes.object.isRequired, w: ReactPropTypes.object.isRequired
  }
  getChildContext = (function() {
    const {m,mr} = this.props
    const {theta, s, v, w} = this.state
    return {
      m, mr, theta, s, v, w
    }
  }).bind(this)

  state = {
    theta: this.props.theta, s: this.props.s,
    v: this.props.v, w: this.props.w,
    Provider: provideContext(PixiBody.childContextTypes, this.getChildContext)(Wrapper)
  }

  componentDidMount() {
    const {ticker} = this.props
    ticker.add(this.update)
  }
  componentWillUnmount() {
    const {ticker} = this.props
    ticker.remove(this.update)
  }

  update = (function() {
    const t = 0.033
    const {theta,s,v,w} = this.state
    const nextS = s.add(v.scale(t))
    const nextTheta = theta.add(w.scale(t))
    this.setState({ s: nextS, theta: nextTheta })
  }).bind(this)

  render() {
    const {m, mr, children, id} = this.props
    const {theta, s, v, w, Provider} = this.state
    return (
      <Provider m={m} mr={mr} id={id}>
        {children}
      </Provider>
    )
  }
}

const contextTypes = {
  ticker: ReactPropTypes.object.isRequired
}
export default withContext(contextTypes)(PixiBody)
