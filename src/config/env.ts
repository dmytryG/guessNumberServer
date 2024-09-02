import 'dotenv/config'
import { validateBoolean } from 'expresso-core'
import * as process from 'process'

// node env
export const NODE_ENV = process.env.NODE_ENV ?? 'development'

// app
export const APP_KEY = process.env.APP_KEY ?? undefined
export const APP_NAME = process.env.APP_NAME ?? 'expresso'
export const APP_PORT = Number(process.env.APP_PORT) ?? 8000

export const AXIOS_TIMEOUT = process.env.AXIOS_TIMEOUT ?? '5m'
export const RATE_LIMIT = Number(process.env.RATE_LIMIT) ?? 100

// otp
export const SECRET_OTP = process.env.SECRET_OTP ?? undefined
export const EXPIRED_OTP = process.env.EXPIRED_OTP ?? '5m'

// jwt access
export const JWT_SECRET_ACCESS_TOKEN =
  process.env.JWT_SECRET_ACCESS_TOKEN ?? 'JWT_SECRET_ACCESS_TOKEN'
export const JWT_ACCESS_TOKEN_EXPIRED =
  process.env.JWT_ACCESS_TOKEN_EXPIRED ?? '1d'

// url staging
export const URL_CLIENT_STAGING =
  process.env.URL_CLIENT_STAGING ?? 'https://sandbox.example.com'
export const URL_SERVER_STAGING =
  process.env.URL_SERVER_STAGING ?? 'https://api-sandbox.example.com'

// url production
export const URL_CLIENT_PRODUCTION =
  process.env.URL_CLIENT_PRODUCTION ?? 'https://example.com'
export const URL_SERVER_PRODUCTION =
  process.env.URL_SERVER_PRODUCTION ?? 'https://api.example.com'


export const BOT_TOKEN = process.env.BOT_TOKEN ?? ''
export const WEB_APP_URL = process.env.WEB_APP_URL ?? ''
