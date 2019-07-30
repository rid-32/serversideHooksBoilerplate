import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import Application from 'ui/application'

import store from 'utils/store'

const renderApplication = ({ url }) =>
  new Promise((res, rej) => {
    const context = {}
    const initialState = store.getState()

    const applicationMarkup = renderToString(
      <Provider store={store}>
        <StaticRouter location={url} context={context}>
          <Application />
        </StaticRouter>
      </Provider>,
    )

    if (context.url) {
      return rej(context.url)
    }

    return res({ applicationMarkup, initialState })
  })

export default renderApplication
