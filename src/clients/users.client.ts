import { Collection } from "mongodb"
import { client } from "../server.js"
import User from "../interfaces/user.interface.js"

export default class UsersClient {
  collection: Collection<User>

  constructor() {
    this.collection = client.db("socket").collection("users")
  }

  findAll() {
    return this.collection.find().toArray()
  }

  findAllPaginated(page: number, limit: number) {
    return this.collection.find().skip(page * limit).limit(limit).toArray()
  }

  findOne(field: string, value: string) {
    return this.collection.findOne({ [field]: value })
  }

  insertOne(user: User) {
    return this.collection.insertOne(user)
  }

  updateOne(_id: string, user: User) {
    return this.collection.findOneAndUpdate({ _id },
      {
        $set: {
          ...user
        }
      },
      {
        upsert: true,
        returnDocument: 'after'
      }
    )
  }

  deleteOne(_id: string) {
    return this.collection.deleteOne({ _id })
  }
}