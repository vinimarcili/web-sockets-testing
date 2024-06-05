import { updateEditor } from "./document.js"

const socket = io("http://localhost:4000")

function emitEditorWrite(text) {
  socket.emit("editor_write", text)
}

socket.on("editor_read", (text) => {
  updateEditor(text)
})

export {
  socket,
  emitEditorWrite
}