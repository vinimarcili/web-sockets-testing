const socket = io()

function register({ username, password }) {
  socket.emit('register', { username, password })
}

socket.on('register-success', (data) => {
  alert('Register success')
  window.location.href = '/index.html'
})

socket.on('register-failure', (data) => {
  alert('Register Failure')
})

socket.on('register-failure-exists', (data) => {
  alert('Register Failure: Username already exists')
})

export {
  register
}