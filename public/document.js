import { emitEditorWrite } from "./socket.js"

const editor = document.querySelector("#editor")
editor.addEventListener("keyup", () => {
  emitEditorWrite(editor.value)
})

function updateEditor(text) {
  editor.value = text
}

export {
  updateEditor
}
