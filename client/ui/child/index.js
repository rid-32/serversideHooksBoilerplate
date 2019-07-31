import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { getData } from 'ducks/application/selectors'
import { fetchMyData } from 'ducks/application/actions'
// import { useBindedAction, useServerSyncEffect } from 'utils/hooks'
import { useServerSyncEffect } from 'utils/hooks'
import { fetchDataBy } from 'decorators/fetch'

import pngIcon from 'images/png/client.png'
import webpIcon from 'images/webp/client.webp'
import './styles'

const useDataFromStore = () => ({
  data: useSelector(getData),
})

// const useBindedActions = () => ({
//   fetchData: useBindedAction(fetchMyData),
// })

const ChildComponent = () => {
  console.log('child rendering...')

  const [counter, setCounter] = useState(0)
  const { data } = useDataFromStore()
  // const { fetchData } = useBindedActions()

  useServerSyncEffect(() => {
    ChildComponent.fetchData()
  })

  console.log({ data })

  return (
    <div className="container">
      <h1>{data}</h1>

      <span>{counter}</span>

      <button className="controller" onClick={() => setCounter(counter + 1)}>
        Increase!
      </button>

      <picture>
        <source srcSet={webpIcon} type="image/webp"></source>
        <img src={pngIcon} alt="client" />
      </picture>
    </div>
  )
}

export default fetchDataBy(fetchMyData)(ChildComponent)
