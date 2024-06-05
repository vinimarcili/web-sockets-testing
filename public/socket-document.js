import { updateEditor } from "./document.js"

const socket = io("http://localhost:4000")

function emitEditorWrite(data) {
  socket.emit("editor", data)
}

function selectDocument(name) {
  socket.emit("document", name, (text) => updateEditor(text))
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
  emitEditorWrite,
  selectDocument
}