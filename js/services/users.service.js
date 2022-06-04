'use strict'

/*
data example:

{
id: 'u101',
username: 'puki',
password: 'secret',
lastLoginTime: 1601891998864,
isAdmin: false
}
*/

const STORAGE_KEY_USER = 'loggedinUser'
const STORAGE_KEY_USERS = 'usersDB'

// Global variables
let gUsers
let gId = 101
let gSortBy = 'username'

// initialize users
_createUsers()

function getUsersToShow() {
  const users = gUsers

  _sortUsers(users)

  return users
}

function doLogin(username, password) {
  const users = gUsers

  // Finds user that tryied to log in
  const user = users.find(
    user => user.username === username && user.password === password
  )

  // Returns null if no user found
  if (!user) return null

  // Updating user logged in time
  user.lastLoginTime = Date.now()

  // Update in localStorage
  saveToStorage(STORAGE_KEY_USER, user)
  _saveUsers()

  return user
}

function undoLogin() {
  localStorage.removeItem(STORAGE_KEY_USER)
}

function setSorter(sorter) {
  gSortBy = sorter
}

function getLoggedInUser() {
  return loadFromStorage(STORAGE_KEY_USER)
}

function _createUsers() {
  gUsers = loadFromStorage(STORAGE_KEY_USERS)

  if (gUsers) return

  gUsers = [
    _createUser('guyk70', 'g1g2g3', true),
    _createUser('yosi123', '123456'),
    _createUser('puki', 'secret'),
  ]

  _saveUsers()
}

function _createUser(username, password, isAdmin = false) {
  return {
    id: 'u' + gId++,
    username,
    password,
    lastLoginTime: Date.now(),
    isAdmin,
  }
}

function _saveUsers() {
  saveToStorage(STORAGE_KEY_USERS, gUsers)
}

function _sortUsers(users) {
  if (gSortBy === 'username') {
    return users.sort((user1, user2) =>
      user1.username.localeCompare(user2.username)
    )
  }

  if (gSortBy === 'login-time') {
    return users.sort(
      (user1, user2) => user1.lastLoginTime - user2.lastLoginTime
    )
  }
}
