import React from 'react'
import Background from './Components/Background/Index.js'

/**
 * Home page component
 */
export default class HomePage extends React.Component {
  render() {
    return (
      <div className="d-flex justify-content-center align-items-center h-vh100 w-vw100">
        <Background />
      </div>
    )
  }
}
