import { errorCatcher } from "../middleware/errorCatcher.js"

export const docs = errorCatcher(async(req,res) => {
  res.send({
    "name": `getWeather`,
    "description": `returns the weather data of the location the user asked for`,
    "parameters": {
      "type": `object`,
      "anyOf": [
        { "required": [`city`] },
        { "required": [`postal_code`] },
        { "required": [`coordinates`] },
      ],
      "properties": {
        "city": {
          "type": `string`,
          "description": `City name for which the weather is requested`,
        },
        "postal_code": {
          "type": `string`,
          "description": `postal/zip code of the city for which the weather is requested`,
        },
        "coordinates": {
          "type": `object`,
          "description": `co-ordinates of the city for which the weather is requested`,
          "required": [`lat`,`long`],
          "properties": {
            "lat": {
              "type": `string`,
              "description": `lattitude city for which the weather is requested`,
            },
            "long": {
              "type": `string`,
              "description": `longitude city for which the weather is requested`,
            },
          },
        },
      },
    },
  })
})