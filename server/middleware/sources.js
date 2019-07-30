import config from 'config'

const isDevelopment = config.get('IS_DEVELOPMENT')

export default function(req, res, next) {
  if (isDevelopment) {
    const devserverPort = config.get('WEBPACK_DEVSERVER_PORT')

    req.scriptSource = `http://localhost:${devserverPort}/assets/application.js`
  } else {
    req.scriptSource = '/assets/application.js'
    req.stylesSource = '/assets/styles.css'
  }

  next()
}
