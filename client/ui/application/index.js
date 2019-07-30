import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { getData } from 'ducks/application/selectors'
import { fetchMyData } from 'ducks/application/actions'
import { useBindedAction } from 'utils/hooks'

import img from 'images/png/client.png'
import 'stylesheets/styles'
import './styles'

const ChildComponent = () => {
  console.log('rendering...')

  return null
}

const NewChildComponent = React.memo(ChildComponent)

const useDataFromStore = () => ({
  data: useSelector(getData),
})

const useBindedActions = () => ({
  fetchData: useBindedAction(fetchMyData),
})

const Application = () => {
  const [counter, setCounter] = useState(0)
  const { data } = useDataFromStore()
  const { fetchData } = useBindedActions()

  useEffect(fetchData, [])

  console.log({ data })

  return (
    <div>
      <span>{counter}</span>

      <button className="controller" onClick={() => setCounter(counter + 1)}>
        Increase!
      </button>

      <NewChildComponent callback={fetchData} />

      <img src={img} alt="client" />
    </div>
  )
}

export default Application
