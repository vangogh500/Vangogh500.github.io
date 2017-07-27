/**
 * @file Ripple generator for the Koi pond water.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import * as PIXI from 'pixi.js'
import Ripple from './Ripple.js'
import Graphics from '../../../../Services/PixiGame/Graphics/Index.js'
import MouseEvent from '../../../../Services/PixiGame/Events/MouseEvent.js'

type StateTypes = {
  ripples: Array<any>,
  counter: number
}

/**
 * @class
 * @extends {React.Component}
 * Ripple generator for the Koi Pond
 */
export default class RippleGenerator extends React.Component<void, void, StateTypes> {
  state = {
    ripples: [],
    counter: 0
  }
  /**
   * Add ripple.
   * @method
   * @memberof RippleGenerator
   * @param {PIXI.Point} point The position of the ripple.
   * @emits {StateChange}
   */
  addRipple(point: PIXI.Point) {
    var {ripples, counter} = this.state
    const newRipple = {
      id: (counter).toString(),
      position: point
    }
    counter = (counter + 1) % 21
    this.setState({ ripples: [...ripples, newRipple], counter })
  }

  removeRipple(id: string) {
    const {ripples} = this.state
    this.setState({ ripples: ripples.filter(ripple => (ripple.id !== id)) })
  }

  /**
   * Renders the react element.
   * @method
   * @memberof RippleGenerator
   * @returns {React.Element}
   */
  render() {
    const {ripples} = this.state

    return (
      <div>
        <MouseEvent onClick={(ev) => this.addRipple(ev.data.global)} />
        {
          ripples.map((ripple) => {
            return <Ripple id={ripple.id} x={ripple.position.x} y={ripple.position.y} onRemove={(id) => this.removeRipple(id)} key={'ripple-' + ripple.id} />
          })
        }
      </div>
    )
  }
}
