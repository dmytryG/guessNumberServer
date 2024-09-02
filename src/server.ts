import 'module-alias/register'
import './pathAlias'

import App from './app'

export const server = new App()

async function run(): Promise<void> {
  server.run()
}

run().catch((e) => console.error(e))
