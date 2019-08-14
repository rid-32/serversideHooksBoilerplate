import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import store from 'utils/store'
import history from 'utils/history'

import Application from 'ui/application'

import 'normalize.css'
import 'stylesheets/styles'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Application />
    </Router>
  </Provider>,
  document.getElementById('app-root'),
)
