const socket = io("http://localhost:4000")

const editor = document.querySelector("#editor")
editor.addEventListener("keyup", () => {
  socket.emit("editor_write", editor.value)
})

socket.on("editor_read", (data) => {
  editor.value = data
})