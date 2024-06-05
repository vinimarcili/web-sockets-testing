import { io } from "./server.js"

const documents = [
  {
    name: "JavaScript",
    text: "Text 1"
  },
  {
    name: "Node",
    text: "Text 2"
  },
  {
    name: "Socket.io",
    text: "Text 3"
  }
]

function findDocument(document: string) {
  return documents.find((d) => d.name?.toLowerCase()?.trim() === document?.toLowerCase()?.trim())
}

io.on('connection', (socket) => {
  console.log('Client Connected', socket.id)

  socket.on('document', (documentName, sendText) => {
    socket.join(documentName)
    const document = findDocument(documentName)
    if (document) {
      sendText(document.text)
    }
  })

  socket.on('editor', ({ text, document }) => {
    const doc = findDocument(document)
    if (doc) {
      doc.text = text
      socket.to(document).emit('editor', text)
    }
  })

  socket.on("disconnect", (reason) => {
    console.log(`Client "${socket.id}" disconnected!
    Reason: ${reason}`)
  })
})