import * as CONST from './const'

export const getForm = state => state[CONST.FORM_NAME]

export const getData = state => getForm(state).data.payload
