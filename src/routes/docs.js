import { errorCatcher } from "../middleware/errorCatcher.js"

export const docs = errorCatcher(async(req,res) => {
  res.send({
    "name": `getWeather`,
    "description": `returns the weather data of the location the user asked for`,
    "parameters": {
      "type": `object`,
      "properties": {
        "city": {
          "type": `string`,
          "description": `City name for which the weather is requested`,
        },
        "postal_code": {
          "type": `string`,
          "description": `postal/zip code of the city for which the weather is requested`,
        },
        "location": {
          "type": `object`,
          "description": `location of the city for which the weather is requested`,
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