import { NODE_ENV } from '@config/env'
import { BASE_URL_SERVER } from '@core/constants/baseURL'
import { formatDateTime } from '@core/helpers/date'
import HttpResponse from '@core/modules/response/HttpResponse'
import ResponseError from '@core/modules/response/ResponseError'
import v1Routes from '@routes/v1'
import Express, { type Request, type Response } from 'express'

const route = Express.Router()

route.get('/', function index(req: Request, res: Response) {
  let responseData: any = {
    message: 'check',
    maintaner: 'vvwvann',
  }

  if (NODE_ENV !== 'production') {
    responseData = {
      ...responseData,
      docs: `${BASE_URL_SERVER}/v1/api-docs`,
    }
  }

  const httpResponse = HttpResponse.get(responseData)
  res.status(200).json(httpResponse)
})

route.get('/health', function serverHealth(req: Request, res: Response) {
  const startUsage = process.cpuUsage()

  const status = {
    uptime: process.uptime(),
    message: 'Ok',
    timezone: 'ID',
    date: formatDateTime(new Date()),
    node: process.version,
    memory: process.memoryUsage,
    platform: process.platform,
    cpu_usage: process.cpuUsage(startUsage),
  }

  const httpResponse = HttpResponse.get({
    message: 'Server Uptime',
    data: status,
  })
  res.status(200).json(httpResponse)
})

// Forbidden Api
route.get('/v1', function (req: Request, res: Response) {
  const method = req.method
  const url = req.originalUrl
  const host = req.hostname

  const endpoint = `${host}${url}`

  throw new ResponseError.Forbidden(
    `Forbidden, wrong access method ${method} endpoint: ${endpoint}`
  )
})

// Using Route v1
route.use('/v1', v1Routes)

export default route
