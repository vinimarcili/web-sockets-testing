import { emitEditorWrite, selectDocument, emitDeleteDocument } from "./socket-document.js"

const params = new URLSearchParams(window.location.search)
const documentName = params.get("name")
const documentHtmlTile = document.querySelector("#document-title")
documentHtmlTile.innerHTML = documentName || "Untitled Document"
document.title = `Editando Documento | ${documentName || "Untitled Document"}`

const editor = document.querySelector("#editor")
editor.addEventListener("keyup", () => {
  emitEditorWrite({
    text: editor.value, name: documentName
  })
})

const deleteButton = document.querySelector("#delete-document")
deleteButton.addEventListener("click", () => {
  if (confirm("Deseja realmente excluir este documento?")) {
    emitDeleteDocument(documentName)
    window.location.href = "/index.html"
  }
})

function updateEditor(text) {
  editor.value = text
}

function successAuth(payload) {
  selectDocument({ name: documentName, username: payload.username })
}

function updateUsers(users) {
  const list = document.querySelector("#users-list")
  list.innerHTML = ""
  users.forEach((user) => {
    const item = document.createElement("li")
    item.classList.add("list-group-item")
    item.innerHTML = user
    list.appendChild(item)
  })
}

export {
  updateEditor,
  successAuth,
  updateUsers
}
