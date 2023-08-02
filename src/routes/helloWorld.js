import { errorCatcher } from "../middleware/errorCatcher.js"

export const helloWorld = errorCatcher(async(req,res) => {
  res.send({ hello: `world` })
})