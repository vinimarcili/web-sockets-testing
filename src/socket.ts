import DocumentsClient from "./clients/documents.client.js"
import registerDocumentEvents from "./events/document-events.js"
import registerIndexEvents from "./events/index-events.js"
import { io } from "./server.js"

const documentsMongoCollection = new DocumentsClient()

io.on('connection', (socket) => {
  console.log('Client Connected', socket.id)

  registerIndexEvents(socket, documentsMongoCollection)

  registerDocumentEvents(socket, documentsMongoCollection)

  socket.on("disconnect", (reason) => {
    console.log(`Client "${socket.id}" disconnected!
    Reason: ${reason}`)
  })
})