import { login } from "./socket-login.js"

const form = document.querySelector('#form-login')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = form['input-user'].value
  const password = form['input-password'].value

  login({ username, password })
})