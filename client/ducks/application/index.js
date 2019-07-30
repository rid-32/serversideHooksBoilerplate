import { combineReducers } from 'redux'

import { getFetchReducer } from 'ducks/shared/fetch'
import * as CONST from './const'

export default combineReducers({
  data: getFetchReducer(CONST.DATA),
})
