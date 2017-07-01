import React from 'react'
import ReactDOM from 'react-dom'
import {createBrowserHistory} from 'history'

import Store from './Services/Store/Index.js'
import Router from './Services/Router/Index.js'
import 'bootstrap/dist/css/bootstrap.css'
import './Styles/index.scss'

const history = createBrowserHistory()

ReactDOM.render(
  <Store history={history}>
    <Router history={history} />
  </Store>,
  document.getElementById('app')
)
