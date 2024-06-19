import { Collection } from "mongodb"
import { client } from "../server.js"
import User from "../interfaces/user.interface.js"
import { hashPassword } from "../utils/password-security.js"

export default class UsersClient {
  collection: Collection<User>

  constructor() {
    this.collection = client.db("socket").collection("users")
  }

  private setPassword(user: User) {
    if (user.password) {
      user.password = hashPassword(user.password)
    }
    return user
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
    user = this.setPassword(user)

    return this.collection.insertOne(user)
  }

  updateOne(_id: string, user: User) {
    user = this.setPassword(user)

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