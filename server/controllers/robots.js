import fs from 'fs'
import parseUrl from 'parseurl'

const getPathname = req => {
  try {
    return parseUrl(req).pathname
  } catch (e) {
    return undefined
  }
}

export const handleRobots = pathToRobots => {
  if (!pathToRobots) {
    throw new TypeError('path to the robots.txt is required')
  }

  if (typeof pathToRobots !== 'string') {
    throw new TypeError('path to the robots.txt must be a string')
  }

  return (req, res, next) => {
    if (getPathname(req) !== '/robots.txt') {
      return next()
    }

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.statusCode = req.method === 'OPTIONS' ? 200 : 405

      res.setHeader('Allow', 'GET, HEAD, OPTIONS')
      res.setHeader('Content-Length', '0')

      return res.end()
    }

    fs.readFile(pathToRobots, (err, buf) => {
      if (err) return next(err)

      res.status(200).end(buf)
    })
  }
}
