import { TOKEN } from '../constants'

export const setTokenToCookie = (req, res) => {
  const { token } = req.body

  req.universalCookies.set(TOKEN, token, {
    httpOnly: true,
    // no expires
    expires: new Date(253402300000000),
  })

  res.status(200).end()
}

export const deleteTokenFromCookie = (req, res) => {
  const { token } = req.body

  req.universalCookies.set(TOKEN, token, {
    httpOnly: true,
    expires: new Date(0),
  })

  res.status(200).end()
}
