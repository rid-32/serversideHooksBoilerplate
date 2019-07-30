import path from 'path'
import express from 'express'
import webpack from 'webpack'
import mustacheExpress from 'mustache-express'
import webpackMiddleware from 'webpack-dev-middleware'
import morgan from 'morgan'
import config from 'config'

import rendererMiddleware from './middleware/renderer'
import sourcesMiddleware from './middleware/sources'
import { handleRobots } from './controllers/robots'
import { handleApplication } from './controllers/application'
import { handleError } from './controllers/error'
import * as routes from './routes'
import webpackConfig from '../webpack.serverside.dev.js'

const isDevelopment = config.get('IS_DEVELOPMENT')
const port = config.get('SERVER_PORT')
const morganMode = isDevelopment ? 'dev' : 'combined'
const app = express()
const webpackCompiler = webpack(webpackConfig)

const assetsPath = isDevelopment ? '../public/assets' : './assets'
const viewsPath = isDevelopment ? '../public' : './assets'
const robotsPath = isDevelopment ? '../robots.txt' : './robots.txt'

app.engine('mustache', mustacheExpress())

app.set('view engine', 'mustache')
app.set('views', path.resolve(__dirname, viewsPath))

if (isDevelopment) {
  app.use(webpackMiddleware(webpackCompiler, { serverSideRender: true }))
}

app.use(
  express.urlencoded({
    extended: true,
  }),
)
app.use(express.json())
app.use(morgan(morganMode))
app.use(rendererMiddleware)
app.use(sourcesMiddleware)

app.use(handleRobots(path.resolve(__dirname, robotsPath)))
app.use('/assets', express.static(path.resolve(__dirname, assetsPath)))
app.use('/api', routes.api)
app.use(handleApplication)

app.use(handleError)

app.listen(port, () => {
  console.info(`\n\x1b[32mServer is listening on port ${port}\x1b[0m\n\n`)
})
