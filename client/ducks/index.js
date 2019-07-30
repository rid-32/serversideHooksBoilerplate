import { combineReducers } from 'redux'

import applicationReducer from 'ducks/application'

export default combineReducers({
  application: applicationReducer,
})
