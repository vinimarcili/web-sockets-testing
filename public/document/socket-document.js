import { successAuth, updateEditor, updateUsers } from "./document.js"

const socket = io("http://localhost:4000/users", {
  auth: {
    token: localStorage.getItem("token")
  }
})

function emitEditorWrite(data) {
  socket.emit("editor", data)
}

function selectDocument(data) {
  socket.emit("document", data, (text) => updateEditor(text))
}

function emitDeleteDocument(name) {
  socket.emit("delete-document", name)
}

socket.on("users", updateUsers)

socket.on("delete-document", (name) => {
  window.alert(`O documento ${name} foi deletado.`)
  window.location.href = "/index.html"
})

socket.on("editor", (text) => {
  updateEditor(text)
})

socket.on("connect_error", (error) => {
  console.error("Connection error", error)
  window.location.href = "/login/login.html"
})

socket.on("disconnect", (reason) => {
  console.log(`Server Disconnected.
  Reason: ${reason}`)
})

socket.on("user_alredy", () => {
  alert("Document already open in another tab.")
  window.location.href = "/index.html"
})

socket.on("authenticated", successAuth)

export {
  socket,
  emitEditorWrite,
  emitDeleteDocument,
  selectDocument
}