import express from 'express'

import * as handlers from '../controllers/api'

const router = express.Router()

router
  .route('/token')
  .post(handlers.setTokenToCookie)
  .delete(handlers.deleteTokenFromCookie)

export default router
