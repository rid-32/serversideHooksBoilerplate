import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router-dom'

import Application from 'ui/application'

import store, { hydrateStore } from 'utils/store'

const renderApplication = async ({ url }) => {
  await hydrateStore()

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
    throw Error(context.url)
  }

  return { applicationMarkup, initialState }
}

export default renderApplication
