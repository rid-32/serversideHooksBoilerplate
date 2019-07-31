import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from 'ducks'
import { fetchMyData } from 'ducks/application/actions'

const middleware = applyMiddleware(thunk)
const isBrowserDevelopment = process.env.BROWSER && process.env.DEVELOPMENT
const enhancers = isBrowserDevelopment
  ? composeWithDevTools(middleware)
  : middleware

let store

// create store with of without an initialState
if (process.env.BROWSER) {
  const initialState = window.__initialState__

  store = createStore(reducers, initialState, enhancers)

  delete window.__initialState__
} else {
  store = createStore(reducers, enhancers)
}

/* utils for working with the store */
const getResources = () => {
  return store.dispatch(fetchMyData())
}

export const hydrateStore = async () => {
  await getResources()
}

export const bindActionCreator = action => (...args) =>
  store.dispatch(action(...args))

export default store
