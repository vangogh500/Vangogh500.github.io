/**
 * @module Hocs
 * @file Higher order components for my website.
 * @author Kai Matsuda
 * @version 0.0.1
 * @flow
 */
import React from 'react'


type PropTypes = {
  children?: React.Children,
  id?: string
}
/**
 * @class
 * @extends {React.Component}
 * Simple utility wrapper class
 */
export class Wrapper extends React.Component<void, PropTypes, void> {
  render() {
    const {children, id} = this.props
    return (
      <div id={id}>
        {children}
      </div>
    )
  }
}

/**
 * @method
 * @param {object} childContextTypes Context types using React proptypes.
 * @param {function} getChildContext Function which returns context values.
 * @returns {function} A function which takes a component and returns a hoc providing context.
 */
export const provideContext = (childContextTypes: {}, getChildContext: ({}) => {}) => (Component: Class<React.Component<*,*,*>>) => {
  /**
   * @class
   * @extends {React.Component}
   * Wrapper for a context providing component
   */
  return class ContextProvider extends React.Component {
    static childContextTypes = childContextTypes
    /**
     * Gets context values.
     * @memberof ContextProvider
     * @method
     * @returns {object} Context values
     */
    getChildContext() {
      return getChildContext(this.props)
    }
    /**
     * Renders React Element.
     * @memberof ContextProvider
     * @method
     * @returns {React.ELement}
     */
    render() {
      return <Component {...this.props} />
    }
  }
}
/**
 * @method
 * @param {object} contextTypes Context types.
 * @returns {function} A function which takes a component and returns a hoc with context.
 */
export const withContext = (contextTypes: {}) => (Component: Class<React.Component<*,*,*>>) => {
  /**
   * @class
   * @extends {React.Component}
   * Wrapper for context consuming components
   */
  return class ContextConsumer extends React.Component {
    static contextTypes = contextTypes

    /**
     * Renders the React Element
     * @method
     * @memberof ContextConsumer
     * @returns {React.Element}
     */
    render() {
      return <Component {...this.props} {...this.context} />
    }
  }
}
