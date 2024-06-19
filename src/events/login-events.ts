import { Socket } from "socket.io"
import UsersClient from "../clients/users.client.js"
import { validatePassword } from "../utils/password-security.js"

export default function registerLoginPageEvents(socket: Socket, dbClient: UsersClient) {
  socket.on('login', async ({ username, password }: { username: string, password: string }) => {
    const user = await dbClient.findOne('username', username)
    if (user && validatePassword(password, user.password)) {
      socket.emit('login-success', { username })
      return
    }

    socket.emit('login-failure', { username })
    return
  })
}