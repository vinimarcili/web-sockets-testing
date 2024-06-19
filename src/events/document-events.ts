import { Socket, Namespace } from "socket.io"
import Document from "../interfaces/document.interface"
import DocumentsClient from "../clients/documents.client"
import { addDocumentConection, getDocumentsUsers, removeUserDocumentConnection } from "../utils/conections.js"

export default function registerDocumentEvents(socket: Socket, dbClient: DocumentsClient, io: Namespace) {
  socket.on('document', async ({ name, username }, sendText: (text: string) => void) => {
    const document = await dbClient.findOne(name)
    if (!document) {
      await dbClient.updateOne(name)
    }
    socket.join(name)

    addDocumentConection({ name, username })

    const documentUsers = getDocumentsUsers(name)

    io.to(name).emit('users', documentUsers)

    sendText(document?.text ?? '')

    socket.on('editor', async ({ text, name }: Document) => {
      const doc = await dbClient.updateOne(name, text)
      if (doc) {
        doc.text = text
        socket.to(name).emit('editor', text)
      }
    })

    socket.on('disconnect', () => {
      removeUserDocumentConnection({ name, username })
      const documentUsers = getDocumentsUsers(name)
      io.to(name).emit('users', documentUsers)
    })
  })
}