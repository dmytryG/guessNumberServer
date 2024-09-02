import expressErrorResponse from '@apps/middlewares/expressErrorResponse'
import expressErrorSequelize from '@apps/middlewares/expressErrorSequelize'
import expressErrorYup from '@apps/middlewares/expressErrorYups'
import { expressRateLimit } from '@apps/middlewares/expressRateLimit'
import { expressWithState } from '@apps/middlewares/expressWithState'
import { expressUserAgent } from '@apps/middlewares/userAgent'
import {
  APP_NAME,
  APP_PORT, BOT_TOKEN,
  NODE_ENV, WEB_APP_URL,
} from '@config/env'
import { winstonLogger, winstonStream } from '@config/Logger'
import allowedOrigins from '@core/constants/allowedOrigins'
import { optionsSwaggerUI, swaggerSpec } from '@core/helpers/docsSwagger'
import ResponseError from '@core/modules/response/ResponseError'
import chalk from 'chalk'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import Express, { type Application, type Request, type Response } from 'express'
import userAgent from 'express-useragent'
import { printLog } from 'expresso-core'
import helmet from 'helmet'
import hpp from 'hpp'
import http, { type Server } from 'http'
import logger from 'morgan'
import path from 'path'
import requestIp from 'request-ip'
import swaggerUI from 'swagger-ui-express'
import indexRoutes from './routes'
import bodyParser from 'body-parser'
import { processErrorExpress } from '@core/helpers/errorProcessor'
import TelegramBot from "node-telegram-bot-api";
import console from "console";


const optCors: cors.CorsOptions = {
  origin: allowedOrigins,
}

class App {
  private readonly _application: Application
  private readonly _port: number | string
  public socket: any

  constructor() {
    this._application = Express()

    this._port = APP_PORT
    // enabled
    this._plugins()
    this._bot()
    this._routes()
    this._application.use(processErrorExpress)
  }

  /**
   * Express Plugins
   */
  private _plugins(): void {
    this._application.use(helmet())
    this._application.use(cors())
    this._application.use(logger('combined', { stream: winstonStream }))
    this._application.use(
      Express.json({ limit: '200mb', type: 'application/json' })
    )
    this._application.use(Express.urlencoded({ extended: true }))
    this._application.use(cookieParser())
    this._application.use(compression())
    this._application.use(
      Express.static(path.resolve(`${__dirname}/../public`))
    )
    this._application.use(hpp())
    this._application.use(requestIp.mw())
    this._application.use(userAgent.express())
    this._application.use(expressRateLimit())
    this._application.use(expressWithState())
    this._application.use(expressUserAgent())
    this._application.use(bodyParser.json())
  }

  /**
   * Setup Routes
   */
  private _routes(): void {
    this._application.use(indexRoutes)

    // Catch error 404 endpoint not found
    this._application.use('*', function (req: Request, _res: Response) {
      const method = req.method
      const url = req.originalUrl
      const host = req.hostname

      const endpoint = `${host}${url}`

      throw new ResponseError.NotFound(
        `Sorry, the ${endpoint} HTTP method ${method} resource you are looking for was not found.`
      )
    })
  }

  private _bot(): void {
    const bot = new TelegramBot(BOT_TOKEN, {polling: true});

    bot.on('message', async (msg) => {
      const chatId = msg.chat.id;

      await bot.sendMessage(chatId, 'You can play the game using the button below',
        {
          reply_markup: {
            inline_keyboard: [
              [{text: 'PLAY!!!', web_app: { url: WEB_APP_URL }}]
            ]
          }
        }
        );
    });

    console.log('Bot started with token', BOT_TOKEN)
  }

  private _initSocket(server: Server): void {

  }

  /**
   * Return Application Config
   * @returns
   */
  public app(): Application {
    return this._application
  }

  /**
   * Run Express App
   */
  public run(): void {
    this._application.use(expressErrorYup)
    this._application.use(expressErrorSequelize)
    this._application.use(expressErrorResponse)

    // Error handler
    this._application.use(function (err: any, req: Request, res: Response) {
      // Set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      // Add this line to include winston logging
      winstonLogger.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method
        } - ${req.ip}`
      )

      // Render the error page
      res.status(err.status || 500)
      res.render('error')
    })

    // setup port
    this._application.set('port', this._port)
    const server = http.createServer(this._application)
    this._initSocket(server)

    const onError = (error: { syscall: string; code: string }): void => {
      if (error.syscall !== 'listen') {
        throw new Error()
      }

      const bind =
        typeof this._port === 'string'
          ? `Pipe ${this._port}`
          : `Port ${this._port}`

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(`${bind} requires elevated privileges`)
          process.exit(1)
          break
        case 'EADDRINUSE':
          console.error(`${bind} is already in use`)
          process.exit(1)
          break
        default:
          throw new Error()
      }
    }

    const onListening = (): void => {
      const addr = server.address()
      const bind = typeof addr === 'string' ? `${addr}` : `${addr?.port}`

      const host = chalk.cyan(`http://localhost:${bind}`)
      const env = chalk.blue(NODE_ENV)

      const msgType = `${APP_NAME}`
      const message = `Server listening on ${host} ⚡️ & Env: ${env} 🚀`

      const logMessage = printLog(msgType, message)
      console.log(logMessage)
    }

    // Run listener
    server.listen(+this._port, '0.0.0.0')
    console.log("Listening", this._port)
    server.on('error', onError)
    server.on('listening', onListening)
  }
}
export default App
