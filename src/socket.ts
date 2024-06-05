import DocumentsClient from "./clients/documents.client.js"
import Document from "./interfaces/document.interface.js"
import { io } from "./server.js"

const documentsMongoCollection = new DocumentsClient()

io.on('connection', (socket) => {
  console.log('Client Connected', socket.id)

  socket.on('document', async (documentName: string, sendText: (text: string) => void) => {
    socket.join(documentName)
    const document = await documentsMongoCollection.findOne(documentName)
    if (document) {
      sendText(document.text)
    }
  })

  socket.on('editor', async ({ text, name }: Document) => {
    const doc = await documentsMongoCollection.updateOne(name, text)
    if (doc) {
      doc.text = text
      socket.to(name).emit('editor', text)
    }
  })

  socket.on('list-documents', async (listDocuments: (documents: Document[]) => void) => {
    const documents = await documentsMongoCollection.findAll()
    listDocuments(documents)
  })

  socket.on('create-document', async (documentName: string, sendText: (text: string) => void) => {
    await documentsMongoCollection.updateOne(documentName)
  })

  socket.on("disconnect", (reason) => {
    console.log(`Client "${socket.id}" disconnected!
    Reason: ${reason}`)
  })
})