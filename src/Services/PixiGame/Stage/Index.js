/**
 * @file Provides canvas and pixi container for the game.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'
import ReactPropTypes from 'prop-types'
import * as PIXI from 'pixi.js'
import {provideContext, Wrapper, withContext} from '../../hocs.js'

type PropTypes = {
  app: PIXI.Application,
  children?: React.Children
}
/**
 * @todo Create types
 */
type StateTypes = {
  renderer: any,
  stage: PIXI.Container,
  view: any
}

/**
 * @class
 * @extends {React.Component}
 * Stage for the pixi game
 */
class PixiStage extends React.Component<void,PropTypes,StateTypes> {
  state = {
    stage: this.props.app.stage,
    renderer: this.props.app.renderer,
    view: this.props.app.view
  }
  /**
   * Handles windows resize event
   * @method
   * @memberof PixiStage
   */
  onResize() {
    const {renderer, view} = this.state
    const w = window.innerWidth
    const h = window.innerHeight
    view.style.width = w + 'px'
    view.style.height = h + 'px'
    renderer.resize(w,h)
  }
  /**
   * Did mount life cycle hook. Hooks up pixi renderer and stage.
   * @method
   * @memberof PixiStage
   */
  componentDidMount() {
    const {view, stage} = this.state
    this.onResize()
    this.refs.container.appendChild(view)
    this.state.renderer.render(stage)
    window.addEventListener('resize', this.onResize.bind(this))
  }
  /**
   * Renders React Element (including pixi canvas)
   * @method
   * @memberof PixiStage
   * @returns {ReactElement}
   */
  render() {
    const {children} = this.props
    const {stage} = this.state
    const childContextTypes = {
      stage: ReactPropTypes.object.isRequired
    }
    const getChildContext = () => {
      return {
        stage: stage
      }
    }
    const Provider = provideContext(childContextTypes, getChildContext)(Wrapper)
    return (
      <div id="canvas-container" ref="container">
        <Provider id="stage-provider">
          {children}
        </Provider>
      </div>
    )
  }
}

const contextTypes = {
  app: ReactPropTypes.object.isRequired
}

export default withContext(contextTypes)(PixiStage)
