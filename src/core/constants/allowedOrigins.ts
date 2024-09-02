import { URL_CLIENT_PRODUCTION, URL_CLIENT_STAGING } from '@config/env'

const allowedOrigins = [
  'http://localhost:3333', // Frontend Web
  'http://localhost:3000', // Frontend Web
  URL_CLIENT_STAGING,
  URL_CLIENT_PRODUCTION,
]

export default allowedOrigins
