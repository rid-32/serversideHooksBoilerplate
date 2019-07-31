import { useEffect } from 'react'
import { renderRoutes } from 'react-router-config'

import routes from 'configuration/routes'

import 'stylesheets/styles'

const Application = () => {
  console.log('application rendering...')

  // set first application rendering flag to false after the application rendering
  // it's needed for useServerSyncEffect hook that doesn't execute useEffect callback
  // during first rendering. That's because all data was already received from server
  useEffect(() => {
    console.log('application was mounted')
  }, [])

  return renderRoutes(routes)
}

export default Application
