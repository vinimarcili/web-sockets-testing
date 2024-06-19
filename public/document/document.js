import { emitEditorWrite, selectDocument, emitDeleteDocument } from "./socket-document.js"

const params = new URLSearchParams(window.location.search)
const documentName = params.get("name")
const documentHtmlTile = document.querySelector("#document-title")
documentHtmlTile.innerHTML = documentName || "Untitled Document"
document.title = `Editando Documento | ${documentName || "Untitled Document"}`
selectDocument(documentName)

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

export {
  updateEditor
}
