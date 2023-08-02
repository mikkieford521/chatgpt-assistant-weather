import { NotAuthenticated } from "../lib/errors.js"
import { errorCatcher } from "./errorCatcher.js"
import axios from 'axios'

export const authorization = errorCatcher(async(req,res,next) => {

  const { authorization } = req.headers
  if (!authorization || !authorization.includes(`Bearer `))
    throw new NotAuthenticated(`Please provide jwt in Authorization header`)

  const jwt = authorization.split(` `)[1] //eslint-disable-line
  if(!jwt)
    throw new NotAuthenticated(`No Bearer token supplied. Please add an "Authorization" header with value "Bearer 1234" replacing 1234 with your access_token`)

  try {
    await axios({
      method: `GET`,
      url: `https://tokens.wakeflow.io/verify`,
      headers: { Authorization: `Bearer ${jwt}` },
    })
  }catch(err){
    throw new NotAuthenticated(`Your token could not be verified`)
  }

  next()
})