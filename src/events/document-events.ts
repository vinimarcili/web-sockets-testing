import { Socket } from "socket.io"
import Document from "../interfaces/document.interface"
import DocumentsClient from "../clients/documents.client"

export default function registerDocumentEvents(socket: Socket, dbClient: DocumentsClient) {
  socket.on('document', async (documentName: string, sendText: (text: string) => void) => {
    socket.join(documentName)
    const document = await dbClient.findOne(documentName)
    if (!document) {
      await dbClient.updateOne(documentName)
    }
    sendText(document?.text ?? '')
  })

  socket.on('editor', async ({ text, name }: Document) => {
    const doc = await dbClient.updateOne(name, text)
    if (doc) {
      doc.text = text
      socket.to(name).emit('editor', text)
    }
  })
}