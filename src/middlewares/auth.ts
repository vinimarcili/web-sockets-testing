import { Socket } from "socket.io"
import { ExtendedError } from "socket.io/dist/namespace"
import jwt from "jsonwebtoken"

export default function authMiddleware(socket: Socket, next: (err?: ExtendedError) => void): void {
  const token = socket.handshake.auth.token

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET not found")
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    socket.emit("authenticated", payload)

    next()
  } catch (err) {
    return next(new Error("Invalid token"))
  }
}