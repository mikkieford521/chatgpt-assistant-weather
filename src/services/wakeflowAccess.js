import axios from 'axios'
import 'dotenv/config'

export const wakeflowAccess = async({
  userId,
  method = `GET`,
  url,
  headers = {},
  data,
  scopes,
}) => {

  const payload = {
    request: {
      method,
      url,
      headers,
    },
    scopes,
  }

  if(data) payload.request.data = data

  const axiosConfig = {
    method: `post`,
    url: `https://api.wakeflow.io/access/${userId}`,
    headers: { authorization: `Bearer ${process.env.WAKEFLOW_TOKEN}` },
    data: payload,
  }

  return axios(axiosConfig)
}