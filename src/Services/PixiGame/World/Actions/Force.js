/**
 * @file React wrapper for a physics force.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import Vector from '../../../Physics/Vector.js'

type PropTypes = {
  m: number,
  magnitude: Vector,
  v: Vector
}

/**
 * @class
 * @extends {React.Component}
 * Force for the world.
 */
export default class WorldForce extends React.Component<void, PropTypes, void> {
  update = function() {
    
  }
  componentDidMount() {
    const {magnitude, m, v} = this.props
    const a = magnitude.scale(1/m)
  }
}
