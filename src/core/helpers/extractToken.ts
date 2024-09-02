import { type Request } from 'express'

export function extractToken(req: Request): string | null {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1]
  } else if (req.query?.token) {
    return req.query.token as string
  }
  return null
}
