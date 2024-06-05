import { io } from "./server.js"

io.on('connection', (socket) => {
  console.log('Client Connected', socket.id)

  socket.on('document', (document) => {
    socket.join(document)
  })

  socket.on('editor', ({ text, document }) => {
    socket.to(document).emit('editor', text)
  })

  socket.on("disconnect", (reason) => {
    console.log(`Client "${socket.id}" disconnected!
    Reason: ${reason}`)
  })
})