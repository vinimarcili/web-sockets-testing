import { listDocuments } from "./socket-list.js"
console.log("index.js", listDocuments)
listDocuments((documents) => {
  const list = document.querySelector("#documents-list")
  list.innerHTML = ""

  documents.forEach((d) => {
    const listItem = document.createElement("a")
    listItem.href = `/document.html?name=${d.name}`
    listItem.classList = 'list-group-item list-group-item-action'
    listItem.innerHTML = d.name
    list.appendChild(listItem)
  })  
})