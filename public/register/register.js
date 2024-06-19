import { register } from "./socket-register.js"

const form = document.querySelector('#form-register')

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const username = form['input-user'].value
  const password = form['input-password'].value

  register({ username, password })
})