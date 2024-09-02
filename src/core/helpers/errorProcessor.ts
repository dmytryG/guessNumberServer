import { type NextFunction, type Request, type Response } from 'express'
import BaseResponse from '@core/modules/errors/BaseResponse'
import { ValidationError } from 'yup'
import APIError from "@core/modules/errors/APIError";

export async function processError(
  req: Request,
  res: Response,
  e: any
): Promise<any> {
  console.error('error occured during request', e)
  if (e instanceof APIError) {
    res.status(e.statusCode).json({ code: e.statusCode, message: e.message, reason: e.reason })
  } else if (e instanceof BaseResponse) {
    res.status(e.statusCode).json({ code: e.statusCode, message: e.message })
  } else if (e instanceof Error && e.constructor === Error) {
    res.status(500).json({ code: 500, message: e.message })
  } else if (e instanceof ValidationError) {
    const errors = e.inner.map(
      (error) => `${error.path}: ${error.errors.join(', ')}`
    )
    res.status(400).json({ code: 400, message: errors.join('; ') })
  } else {
    const eObj = { message: { ...e }, code: 500 }
    res.status(500).json(eObj)
  }
}

export async function processErrorExpress(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  await processError(req, res, err)
}
