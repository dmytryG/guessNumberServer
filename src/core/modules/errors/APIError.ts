import BaseResponse from '@core/modules/errors/BaseResponse'

class APIError extends BaseResponse {
  public reason: string | null
  constructor(message: string, code: number = 500, reason: string | null = null) {
    super(message, code)
    this.reason = reason
    Object.setPrototypeOf(this, APIError.prototype)
  }
}

export default APIError

// When 2fa is required, but code isn't provided
export const required2FAButNotProvided = new APIError(
  '2FA code required but not provided',
  400,
  '2FA'
)

// When 2da is required, but user doesn't have enabled 2FA
export const required2FAToCallThisMethod = new APIError(
  'Required 2FA enabled for this user',
  400,
  '2FA_NOT_ENABLED'
)

// When captcha is required, but isn't provided
export const requiredCaptchaButNotProvided = new APIError(
  'Captcha score required but not provided',
  400,
  'CAPTCHA'
)
