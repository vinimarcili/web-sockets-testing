import express, { Express } from 'express'
import * as path from 'path'
import { fileURLToPath } from 'url'
import http from 'http'
import { Server } from 'socket.io'
import { startDatabse } from './db/db.js'
import dotnev from 'dotenv'
dotnev.config()

const app: Express = express()
const PORT: number = Number(process.env.PORT) || 4000

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicFolder: string = path.join(__dirname, '../public')

app.use(express.static(publicFolder))

const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

const client = await startDatabse()

export { io, client }
