import { deleteDocumentFromList, addDocumentToList } from "./index.js"

const socket = io("http://localhost:4000/users", {
  auth: {
    token: localStorage.getItem("token")
  }
})

function listDocuments(listCallback) {
  socket.emit("list-documents", (documents) => listCallback(documents))
}

function createDocument(name) {
  socket.emit("create-document", name)
}

socket.on('delete-document', (documentName) => {
  deleteDocumentFromList(documentName)
})

socket.on("create-document", (documentName) => {
  addDocumentToList(documentName)
})

socket.on("connect_error", (error) => {
  console.error("Connection error", error)
  window.location.href = "/login/login.html"
})

export {
  listDocuments,
  createDocument
}