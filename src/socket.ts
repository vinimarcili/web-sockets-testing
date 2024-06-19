import DocumentsClient from "./clients/documents.client.js"
import UsersClient from "./clients/users.client.js"
import registerDocumentEvents from "./events/document-events.js"
import registerIndexEvents from "./events/index-events.js"
import registerLoginPageEvents from "./events/login-events.js"
import registerRegisterPageEvents from "./events/register-events.js"
import authMiddleware from "./middlewares/auth.js"
import { io } from "./server.js"

const documentsCollection = new DocumentsClient()
const usersCollection = new UsersClient()

const nspUsers = io.of("/users")

nspUsers.use((socket, next) => authMiddleware(socket, next))

nspUsers.on('connection', (socket) => {
  console.log('Client Connected', socket.id)

  registerIndexEvents(socket, documentsCollection)

  registerDocumentEvents(socket, documentsCollection)

  socket.on("disconnect", (reason) => {
    console.log(`Client "${socket.id}" disconnected!
    Reason: ${reason}`)
  })
})

io.of("/").on('connection', (socket) => {
  console.log('Client Connected', socket.id)

  registerRegisterPageEvents(socket, usersCollection)

  registerLoginPageEvents(socket, usersCollection)

  socket.on("disconnect", (reason) => {
    console.log(`Client "${socket.id}" disconnected!
    Reason: ${reason}`)
  })
})