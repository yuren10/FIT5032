import { ref } from 'vue'

// Hardcoded demo credentials
const VALID_USERNAME = 'libraryuser'
const VALID_PASSWORD = 'Library@123'

export const isAuthenticated = ref(false)
export const currentUser = ref(null)
export const userRole = ref(null) // 'admin' | 'librarian' | 'member' | 'guest'
export const registeredUsers = ref([]) // { username, password }

export function registerUser(user) {
  if (!user?.username || !user?.password) return
  const exists = registeredUsers.value.some((u) => u.username === user.username)
  if (!exists) {
    registeredUsers.value.push({ username: user.username, password: user.password })
  } else {
    // update password if user re-registers
    registeredUsers.value = registeredUsers.value.map((u) =>
      u.username === user.username ? { username: user.username, password: user.password } : u,
    )
  }
}

export function login(username, password) {
  // demo account
  if (username === VALID_USERNAME && password === VALID_PASSWORD) {
    isAuthenticated.value = true
    currentUser.value = { username }
    userRole.value = 'member'
    return true
  }
  // any registered account from the form
  const match = registeredUsers.value.find(
    (u) => u.username === username && u.password === password,
  )
  if (match) {
    isAuthenticated.value = true
    currentUser.value = { username: match.username }
    userRole.value = 'member'
    return true
  }
  isAuthenticated.value = false
  currentUser.value = null
  userRole.value = null
  return false
}

export function logout() {
  isAuthenticated.value = false
  currentUser.value = null
  userRole.value = null
}

// Minimal helpers for roles
export function hasRole(role) {
  return userRole.value === role
}

// Map email to a role in a very simple way for demo:
// admin@* => admin, librarian@* => librarian, member@* => member, otherwise guest
export function setFirebaseUserByEmail(email) {
  if (!email) return
  const username = email.split('@')[0]
  const localPart = username.toLowerCase()
  let role = 'guest'
  if (localPart.startsWith('admin')) role = 'admin'
  else if (localPart.startsWith('librarian')) role = 'librarian'
  else if (localPart.startsWith('member')) role = 'member'

  isAuthenticated.value = true
  currentUser.value = { username, email }
  userRole.value = role
}
