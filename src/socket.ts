import { io } from "./server.js"

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)

  socket.on('editor', (text) => {
    socket.broadcast.emit('editor', text)
  })
})