'use  strict'

let gLayout

function initAdmin() {
  // if user not admin redirect him to index.html
  const user = getLoggedInUser()
  if (!user || !user.isAdmin) {
    window.location.href = 'index.html'
  }

  // Redner table of users by default
  gLayout = 'table'
  renderUsers()
}

// Render user in given layout
function renderUsers() {
  const users = getUsersToShow()

  let strHTMLs

  if (gLayout === 'table') strHTMLs = renderUsersTable(users)

  if (gLayout === 'cards') strHTMLs = renderUsersCards(users)

  const elUsers = document.querySelector('.users-container')
  elUsers.innerHTML = strHTMLs
}

// table format
function renderUsersTable(users) {
  let strHTMLs = `
                <table class="users-table">
                  <thead>
                      <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Last login time</th>
                        <th>isAdmin</th>
                      </tr>
                  </thead>`

  strHTMLs += users
    .map(
      user => `
              <tr class="user-row">
                  <td>${user.username}</td>
                  <td>${user.password}</td>
                  <td>${new Date(user.lastLoginTime).toString()}</td>
                  <td>${user.isAdmin}</td>
              </tr>`
    )
    .join('')

  strHTMLs += `<tbody class="users"></tbody>
              </table>`

  return strHTMLs
}

// Cards format
function renderUsersCards(users) {
  let strHTMLs = `
        <div class="users-grid">`

  strHTMLs += users
    .map(
      (user, idx) => `
                  <div class="user-card">
                     <img src="img/${user.id}.jpg" />
                      <p><strong>username:</strong> ${user.username}</p>
                      <p><strong>password:</strong> ${user.password}</p>
                      <p><strong>last login:<br></strong> ${new Date(
                        user.lastLoginTime
                      ).toString()}</p>
                      <p><strong>is admin:</strong> ${user.isAdmin}</p>
                  </div>`
    )
    .join('')

  strHTMLs += `</div>`

  return strHTMLs
}

function onSortUsers(sorter) {
  setSorter(sorter)
  renderUsers()
}

function onSetLayout(layout) {
  gLayout = layout
  renderUsers()
}
