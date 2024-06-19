const socket = io()

function login({ username, password }) {
  socket.emit('login', { username, password })
}

socket.on('login-success', (data) => {
  window.location.href = '/index.html'
})

socket.on('login-failure', (data) => {
  alert('Login Failure')
})

export {
  login
}