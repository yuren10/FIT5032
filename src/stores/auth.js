import { ref } from 'vue'

// Hardcoded demo credentials
const VALID_USERNAME = 'libraryuser'
const VALID_PASSWORD = 'Library@123'

export const isAuthenticated = ref(false)
export const currentUser = ref(null)
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
    return true
  }
  // any registered account from the form
  const match = registeredUsers.value.find(
    (u) => u.username === username && u.password === password,
  )
  if (match) {
    isAuthenticated.value = true
    currentUser.value = { username: match.username }
    return true
  }
  isAuthenticated.value = false
  currentUser.value = null
  return false
}

export function logout() {
  isAuthenticated.value = false
  currentUser.value = null
}
