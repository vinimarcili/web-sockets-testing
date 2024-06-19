import { Socket } from "socket.io"
import DocumentsClient from "../clients/documents.client"
import Document from "../interfaces/document.interface"

export default function registerIndexEvents(socket: Socket, dbClient: DocumentsClient) {
  socket.on('list-documents', async (listDocuments: (documents: Document[]) => void) => {
    const documents = await dbClient.findAll()
    listDocuments(documents)
  })

  socket.on('create-document', async (documentName: string) => {
    await dbClient.updateOne(documentName)
    socket.emit('create-document', documentName)
    socket.broadcast.emit('create-document', documentName)
  })

  socket.on('delete-document', async (documentName: string) => {
    await dbClient.deleteOne(documentName)
    socket.to(documentName).emit('delete-document', documentName)
    socket.broadcast.except(documentName).emit('delete-document', documentName)
  })
}