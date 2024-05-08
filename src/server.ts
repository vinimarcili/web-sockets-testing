import express, { Express } from 'express'
import * as path from 'path'
import { fileURLToPath } from 'url'

const app: Express = express()
const PORT: number = Number(process.env.PORT) || 4000

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicFolder: string = path.join(__dirname, '../public')

app.use(express.static(publicFolder))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
