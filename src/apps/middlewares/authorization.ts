import {NextFunction, Request, Response} from "express";
import {extractToken} from "@core/helpers/extractToken";
import {processError} from "@core/helpers/errorProcessor";
import APIError from "@core/modules/errors/APIError";

async function authorization(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | undefined> {
  try {
    const auth = req.headers.authorization
    console.log('Auth:', auth)
    if (!auth) {
      throw new Error('Missing auth headers')
    }
    req.setState({
      userId: Number(auth),
    })
  } catch (e) {
    return await processError(
      req,
      res,
      new APIError('Unauthorized, invalid jwt', 401)
    )
  }
  next()
}

export default authorization
