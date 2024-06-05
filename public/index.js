import { listDocuments, createDocument } from "./socket-list.js"

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

document.getElementById("add-document").addEventListener("submit", (e) => {
  e.preventDefault()
  const name = e.target.name.value
  createDocument(name)
  e.target.reset()
  const newUrl = new URL('/document.html', window.location.origin)
  newUrl.searchParams.set("name", name)
  window.location.href = newUrl
})