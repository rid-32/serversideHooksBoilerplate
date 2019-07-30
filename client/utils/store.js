import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from 'ducks'

const middleware = applyMiddleware(thunk)
const isBrowserDevelopment = process.env.BROWSER && process.env.DEVELOPMENT
const enhancers = isBrowserDevelopment
  ? composeWithDevTools(middleware)
  : middleware

const store = createStore(reducers, enhancers)

export default store
