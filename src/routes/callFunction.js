import { errorCatcher } from "../middleware/errorCatcher.js"
import axios from "axios"
import 'dotenv/config'

export const callFunction = errorCatcher(
  /**
   *
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   */
  async(req,res) => {

    const body = req.body.parameters
    const params = getQueryParams(body)
    if(!params)
      res.status(400).send({ success: false,message: `invalid parameters provided` })
    try{
      let weather
      if(body.days && body.days > 1)
        weather = await getForecast(params,body.days)
      else
        weather = await getWeather(params)

      if(!weather)
        res.send({ success: false })
      else
        res.send({
          success: true,
          weather,
        })
    } catch(err){
      res.statusCode = 400
      res.send({ success: false,message: err.message })
    }
  })

async function getForecast(params,days){
  const url = `${process.env.WEATHER_BIT_URL}/forecast/daily`
  const resp = await axios.get(`${url}?${params}`)
  const { data } = resp
  if(!data.city_name)
    return false
  const weather = []
  for(let i = 0; i < days; i++){
    const item = data.data[i]
    weather.push({
      date: item.datetime,
      city: data.city_name,
      status: item.weather.description,
      unit: `Celsius`,
      temp: item.temp,
      feels_like: item.app_temp,
      air_quality: item.aqi,
      precipitation: item.precip,
      snowfall: item.snow,
      wind_dir: item.wind_cdir,
      wind_speed: item.wind_spd,
      visibility: item.vis,
    })
  }
  return weather
}

async function getWeather(params){
  const url = `${process.env.WEATHER_BIT_URL}/current`
  const resp = await axios.get(`${url}?${params}`)
  const [data] = resp.data.data

  if(!data.temp || !data.city_name)
    return false

  return {
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
  }
}

function getQueryParams(body){
  const apiKey = process.env.WEATHER_BIT_KEY
  const { location_type,location } = body
  let params = `key=${apiKey}`
  if(location_type === `city`)
    params += `&city=${location}`
  else if(location_type === `postal_code`)
    params += `&postal_code=${location}`
  else if(location_type === `coordinates`){
    const [lat,long] = location.split(`,`)
    params += `&lat=${lat}&lon=${long}`
  }
  else
    params += `&city=${location}`

  return params
}