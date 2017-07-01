import React from 'react'
import PropTypes from 'prop-types'
import { ConnectedRouter } from 'react-router-redux'
import {Route, Redirect} from 'react-router'

// import scenes
import HomePage from '../../Scenes/HomePage/Index.js'

/**
 * The router for the application. Handles all routing logic.
 * @class
 * @alias Router
 * @prop {object} history - The app history.
 */
export default class Router extends React.Component {
  static propTypes() {
    return {
      history: PropTypes.object.isRequired
    }
  }
  render() {
    const {history} = this.props
    return (
      <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={HomePage} />
        </div>
      </ConnectedRouter>
    )
  }
}
