import path from 'path'
import Module from 'module'
import config from 'config'

const isDevelopment = config.get('IS_DEVELOPMENT')

const response = !isDevelopment
  ? require(path.resolve(__dirname, '../assets/serverside.application.js'))
  : {}

/**
 * @param {string} absolutePath
 * @param {string} fileName
 * @param {object} fs
 * считываем код собранного приложения из файловой системы оперативной
 * памяти и преобразуем его в строку
 */
const getCodeFromMemory = (absolutePath, fileName, fs) => {
  const fullPath = path.join(absolutePath, fileName)

  return fs.readFileSync(fullPath).toString('utf8')
}

/**
 * @param {string} code
 * @param {string} fileName
 * создаём модуль из строки кода и экспортируем из него дефолтную функцию
 */
const getRendererFromModule = (code, fileName) => {
  const parent = module.parent
  const m = new Module(fileName, parent)

  m.fileName = fileName
  m.paths = []
  m._compile(code, fileName)

  return m.exports.default
}

/**
 * @param {object} param0
 * fs и webpackStats передаются в res родителя через webpack-dev-middleware
 * fs - это файловая система оперативной памяти
 * webpackStats содержит с себе путь до собранного приложения в оперативке
 * нужно сформировать полный путь до этого приложения, считать код приложения
 * в строку, но основе этой строки создать модуль и экспортировать из него
 * функцию рендеринга приложения в строку
 */
const getApplicationRenderer = ({ fs, webpackStats }) => {
  const fileName = webpackStats.toJson().assetsByChunkName.main
  const absolutePath = webpackStats.toJson().outputPath
  // получаем из оперативной памяти код собранного webpack-dev-middleware
  // приложения
  const code = getCodeFromMemory(absolutePath, fileName, fs)

  // получаем функцию рендера приложения в строку
  return getRendererFromModule(code, fileName)
}

export default function(req, res, next) {
  if (isDevelopment) {
    req.renderApplicationToString = getApplicationRenderer(res.locals)
  } else {
    req.renderApplicationToString = response.default
  }

  next()
}
