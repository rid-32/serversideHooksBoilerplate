import { fetchData } from 'ducks/shared/fetch'

import * as api from 'api/application'
import * as CONST from './const'

export const fetchMyData = () => dispatch => {
  console.log('fetching...')

  const config = {
    name: CONST.DATA,
    apiMethod: api.fetchData,
  }

  dispatch(fetchData(config))
}
