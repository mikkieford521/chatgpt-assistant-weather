import { errorCatcher } from "../middleware/errorCatcher.js"
import axios from "axios"

export const callFunction = errorCatcher(
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async(req,res) => {

    const { city,postal_code,location } = req.body.parameters
    const apiKey = process.env.WEATHER_BIT_KEY
    const url = process.env.WEATHER_BIT_URL
    let params = `key=${apiKey}`
    if(city)
      params += `&city=${city}`
    else if(postal_code)
      params += `&postal_code=${postal_code}`
    else if(location)
      params += `&lat=${location.lat}&lon=${location.lon}`
    else
      res.status(400).send({ success: false,message: `invalid parameters provided` })
    try{
      const resp = await axios.get(`${url}?${params}`)
      const [data] = resp.data.data
      if(!data.temp || !data.city_name)
        res.send({ success: false })
      else
        res.send({
          success: true,
          data: {
            city: data.city_name,
            status: data.weather.description,
            unit: `Celsius`,
            temp: data.temp,
            feels_like: data.app_temp,
            air_quality: data.aqi,
            precipitation: data.precip,
            snowfall: data.snow,
            wind_dir: data.wind_cdir,
            wind_speed: data.wind_spd,
            visibility: data.vis,
          },
        })
    } catch(err){
      res.statusCode = 400
      res.send({ success: false,message: err.message })
    }
  })