import { Socket } from "socket.io"
import UsersClient from "../clients/users.client"

export default function registerRegisterPageEvents(socket: Socket, dbClient: UsersClient) {
  socket.on('register', async ({ username, password }: { username: string, password: string }) => {
    const user = await dbClient.findOne('username', username)
    if (user) {
      socket.emit('register-failure-exists', { username })
      return
    }

    const result = await dbClient.insertOne({ username, password })

    if (result.acknowledged) {
      socket.emit('register-success', { username })
    } else {
      socket.emit('register-failure', { username })
    }
  })
}