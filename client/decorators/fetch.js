import { bindActionCreator } from 'utils/store'

export const fetchDataBy = action => Component => {
  Component.fetchData = bindActionCreator(action)

  return Component
}
