import { io } from "./server.js"

io.on('connection', (socket) => {
  console.log('a user connected', socket.id)

  socket.on('editor_write', (text) => {
    socket.broadcast.emit('editor_read', text)
  })
})