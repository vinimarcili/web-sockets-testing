const documentsConnections: Array<{ name: string, username: string }> = []

export function addDocumentConection({ name, username }: { name: string, username: string }) {
  documentsConnections.push({ name, username })
}

export function removeUserDocumentConnection({ name, username }: { name: string, username: string }) {
  const index = documentsConnections.findIndex(doc => doc.name === name && doc.username === username)
  if (index !== -1) {
    documentsConnections.splice(index, 1)
  }
}

export function getDocumentsUsers(name: string) {
  return documentsConnections.filter(doc => doc.name === name).map(doc => doc.username)
}