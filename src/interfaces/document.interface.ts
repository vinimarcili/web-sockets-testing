import { ObjectId } from "mongodb"

export default interface Document {
  _id?: ObjectId
  name: string
  text: string
}