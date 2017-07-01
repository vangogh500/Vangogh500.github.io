import React from 'react'
import PropTypes from 'prop-types'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import logger from 'redux-logger'

/**
 * The store for the application
 * @class
 * @alias Store
 * @prop {object} history - The app history.
 */
export default class Store extends React.Component {
  static propTypes() {
    return {
      history: PropTypes.object.isRequired
    }
  }
  /**
   * Constructor
   * @param {object} props React props.
   */
  constructor(props) {
    super(props)
    const routerMw = routerMiddleware(props.history)
    this.store = createStore(combineReducers({
      router: routerMw
    }), applyMiddleware(logger))
  }
  render() {
    return (
      <Provider store={this.store}>
        {this.props.children}
      </Provider>
    )
  }
}
