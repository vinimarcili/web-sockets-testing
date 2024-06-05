import { emitEditorWrite, selectDocument } from "./socket.js"

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

function updateEditor(text) {
  editor.value = text
}

export {
  updateEditor
}
