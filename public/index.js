import { listDocuments, createDocument } from "./socket-list.js"

document.getElementById("logout").addEventListener("click", (e) => {
  localStorage.removeItem("token")
  window.location.href = "/login/login.html"
})

function updateList(documents) {
  const list = document.querySelector("#documents-list")
  list.innerHTML = ""
  documents.forEach((d) => list.appendChild(createDocumentLink(d.name)))  
}

function deleteDocumentFromList(name) {
  const list = document.querySelector("#documents-list")
  list.childNodes.forEach((child) => {
    if (child.innerHTML === name) {
      list.removeChild(child)
    }
  })
}

function addDocumentToList(name) {
  const list = document.querySelector("#documents-list")
  const exists = Array.from(list.childNodes).some((child) => child.innerHTML === name)
  if (!exists) {
    list.appendChild(createDocumentLink(name))
  }
}

function createDocumentLink(name) {
  const listItem = document.createElement("a")
  listItem.href = `/document/document.html?name=${name}`
  listItem.classList = 'list-group-item list-group-item-action'
  listItem.innerHTML = name
  return listItem
}

listDocuments(updateList)

document.getElementById("add-document").addEventListener("submit", (e) => {
  e.preventDefault()
  const name = e.target.name.value
  createDocument(name)
  e.target.reset()
  const newUrl = new URL('/document/document.html', window.location.origin)
  newUrl.searchParams.set("name", name)
  window.location.href = newUrl
})

export {
  updateList,
  deleteDocumentFromList,
  addDocumentToList
}