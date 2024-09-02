import { type ReqOptions } from '@core/interface/ReqOptions'
import ResponseError from '@core/modules/response/ResponseError'
import { validate as uuidValidate } from 'uuid'

/**
 *
 * @param value
 * @returns
 */
export function validateUUID(value: string, options?: ReqOptions): string {
  if (!uuidValidate(value)) {
    throw new ResponseError.BadRequest('Invalid UUID format')
  }

  return value
}
