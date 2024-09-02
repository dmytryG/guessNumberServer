import { type Socket as SocketIO } from 'socket.io'

declare module 'socket.io' {
  interface Socket extends SocketIO {
    userId: string
  }
}
