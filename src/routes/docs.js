import { errorCatcher } from "../middleware/errorCatcher.js"

export const docs = errorCatcher(async(req,res) => {
  res.send({
    "name": `getWeather`,
    "description": `returns the weather data of the location the user asked for`,
    "parameters": {
      "type": `object`,
      "properties": { "city": { "type": `string` } },
      "required": [`city`],
    },
  })
})