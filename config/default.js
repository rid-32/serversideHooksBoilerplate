const dotenv = require('dotenv')

dotenv.config()

module.exports = {
  IS_DEVELOPMENT: true,
  SERVER_PORT: process.env.SERVER_PORT || 3000,
  WEBPACK_DEVSERVER_PORT: process.env.WEBPACK_DEVSERVER_PORT,
}
