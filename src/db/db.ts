import { MongoClient } from "mongodb"

async function startDatabse() {
  if (!process.env.MONGO_URI) {
    throw new Error('Please set a MONGO_URI')
  }
  const client = new MongoClient(process.env.MONGO_URI)
  await client.connect()
  await client.db("admin").command({ ping: 1 })
  console.log("Pinged your deployment. You successfully connected to MongoDB!")
  return client
}

export { startDatabse }