'use strict'

function onLogin(ev) {
  ev.preventDefault()

  const username = document.querySelector('[name="username"]').value
  const password = document.querySelector('[name="password"]').value

  // validate login details
  const user = doLogin(username, password)

  if (!user) return

  // Render safe-content section
  toggleRender(user)

  // clear form
  clearForm()
}

function onLogout() {
  // Render login section
  toggleRender()

  // Remove logged in from local storage
  undoLogin()
}

// Toggle between singin page to safe-content(when logged in)
function toggleRender(user = null) {
  const elLogin = document.querySelector('.login')
  const elSafeContent = document.querySelector('.safe-content')
  const elUsername = document.querySelector('.username')
  const elAdminBtn = document.querySelector('.btn-admin')

  elUsername.innerText = user ? user.username : ''
  if (getLoggedInUser().isAdmin) elAdminBtn.classList.toggle('hidden')
  elLogin.classList.toggle('hidden')
  elSafeContent.classList.toggle('hidden')
}

function clearForm() {
  document.querySelector('[name="username"]').value = ''
  document.querySelector('[name="password"]').value = ''
}
