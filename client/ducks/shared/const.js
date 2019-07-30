const prefix = 'fetch'

export const STARTED = `${prefix}/STARTED`
export const SUCCESS = `${prefix}/SUCCESS`
export const FAILURE = `${prefix}/FAILURE`
export const CLEAR = `${prefix}/CLEAR`

export const INITIAL_STATE = {
  isFetching: false,
  isFetched: false,
  payload: null,
  errorMessage: null,
}
