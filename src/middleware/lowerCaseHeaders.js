import { errorCatcher } from './errorCatcher.js'

export const lowerCaseHeaders = errorCatcher(async(req,res,next) => {
  addLowerCaseHeaders(req)
  next()
})

export const addLowerCaseHeaders = req => {
  Object.keys(req.headers).forEach(header => {
    if(header.toLowerCase() !== header)
      req.headers[header.toLowerCase()] = req.headers[header]
  })
}
