import config from 'config'

// eslint-disable-next-line
export const handleError = (err, req, res, next) => {
  const isDevelopment = config.get('IS_DEVELOPMENT')

  if (isDevelopment) {
    return res.status(500).json(err)
  }

  return res.status(500).end()
}
