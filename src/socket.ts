import { io } from "./server.js"

io.on('connection', (socket) => {
  console.log('Client Connected', socket.id)

  socket.on('editor', (text) => {
    socket.broadcast.emit('editor', text)
  })

  socket.on("disconnect", (reason) => {
    console.log(`Client "${socket.id}" disconnected!
    Reason: ${reason}`)
  })
})