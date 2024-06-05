const socket = io("http://localhost:4000")

function listDocuments(listCallback) {
  socket.emit("list-documents", (documents) => listCallback(documents))
}

export {
  listDocuments
}