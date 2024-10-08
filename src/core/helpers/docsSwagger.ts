import { APP_NAME, NODE_ENV } from '@config/env'
import { BASE_URL_SERVER } from '@core/constants/baseURL'
import fs from 'fs'
import _ from 'lodash'
import path from 'path'
import swaggerJSDoc from 'swagger-jsdoc'

const baseRouteDocs = path.resolve(`${__dirname}/../../apps/docs/routes`)
const baseSchemaDocs = path.resolve(`${__dirname}/../../apps/docs/schemas`)

/**
 * Get Route Docs
 * @param _path
 * @returns
 */
function getDocsSwaggers(_path: string | Buffer): Record<string, unknown> {
  return fs.readdirSync(_path).reduce((acc, file) => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const data = require(`${_path}/${file}`)
    acc = { ...acc, ...data }

    return acc
  }, {})
}

const docsRoutes = getDocsSwaggers(baseRouteDocs)
const docsSchemas = getDocsSwaggers(baseSchemaDocs)

const baseURLServer = [
  {
    url: `${BASE_URL_SERVER}/v1`,
    description: `${_.capitalize(NODE_ENV)} Server`,
  },
]

const swaggerOptURL = [
  {
    url: `${BASE_URL_SERVER}/v1/api-docs.json`,
    name: `${_.capitalize(NODE_ENV)} Server`,
  },
]

export const swaggerOptions = {
  definition: {
    info: {
      title: `Api ${APP_NAME} Docs`,
      description: `This is Api Documentation ${APP_NAME}`,
      version: '1.0.0',
    },
    openapi: '3.0.1',
    servers: baseURLServer,
    // Set GLOBAL
    // security: [
    //   {
    //     auth_token: []
    //   }
    // ],
    components: {
      securitySchemes: {
        auth_token: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description:
            'JWT Authorization header using the JWT scheme. use signature Authorization: Bearer tokentokentokentoken, it means that the header “Authorization: ” should have that `Bearer tokentokentokentoken`',
        },
      },
      schemas: docsSchemas,
      parameters: {
        page: {
          in: 'query',
          name: 'page',
          schema: { type: 'string' },
          required: false,
        },
        pageSize: {
          in: 'query',
          name: 'pageSize',
          schema: { type: 'string' },
          required: false,
        },
        filtered: {
          in: 'query',
          name: 'filtered',
          schema: { type: 'string' },
          required: false,
          description: 'Example: [{"id": "email", "value": "anyValue"}]',
        },
        sorted: {
          in: 'query',
          name: 'sorted',
          schema: { type: 'string' },
          required: false,
          description: 'Example: [{"sort": "createdAt", "order": "DESC"}]',
        },
        lang: {
          in: 'query',
          name: 'lang',
          schema: { type: 'string', enum: ['en', 'id'] },
          required: false,
        },
      },
    },
    paths: docsRoutes,
  },
  apis: [],
}

export const swaggerSpec = swaggerJSDoc(swaggerOptions)
export const optionsSwaggerUI = {
  explorer: true,
  swaggerOptions: { urls: swaggerOptURL },
}
