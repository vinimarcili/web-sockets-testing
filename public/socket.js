import { updateEditor } from "./document.js"

const socket = io("http://localhost:4000")

function emitEditorWrite(text) {
  socket.emit("editor", text)
}

socket.on("editor", (text) => {
  updateEditor(text)
})

socket.on("disconnect", (reason) => {
  console.log(`Server Disconnected.
  Reason: ${reason}`)
})

export {
  socket,
  emitEditorWrite
}