import { Collection } from "mongodb"
import Document from "../interfaces/document.interface.js"
import { client } from "../server.js"

export default class DocumentsClient {
  collection: Collection<Document>

  constructor() {
    this.collection = client.db("socket").collection("documents")
  }

  findAll() {
    return this.collection.find().toArray()
  }

  findAllPaginated(page: number, limit: number) {
    return this.collection.find().skip(page * limit).limit(limit).toArray()
  }

  findOne(name: string) {
    return this.collection.findOne({ name })
  }

  insertOne(document: Document) {
    return this.collection.insertOne(document)
  }

  updateOne(name: string, text: string) {
    return this.collection.updateOne({ name },
      {
        $set: { text, name }
      },
      {
        upsert: true
      }
    )
  }

  deleteOne(name: string) {
    return this.collection.deleteOne({ name })
  }
}