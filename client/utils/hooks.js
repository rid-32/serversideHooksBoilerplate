import { useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'

export const useBindedAction = action => {
  const dispatch = useDispatch()

  return useCallback((...args) => dispatch(action(...args)), [dispatch])
}

// use hook which is syncronized with SSR
export const useServerSyncEffect = (callback, props) => {
  return useEffect(() => {
    return callback()
  }, props)
}
