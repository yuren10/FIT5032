<template>
  <div class="container" style="max-width: 520px">
    <div class="card mt-4">
      <div class="card-body text-center">
        <h3>Logged out</h3>
        <p class="text-muted">You have been signed out.</p>
        <router-link to="/" class="btn btn-primary">Back to Home</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getAuth, signOut } from 'firebase/auth'
import { onMounted } from 'vue'
import { logout } from '../stores/auth'

onMounted(() => {
  const auth = getAuth()
  signOut(auth)
    .catch(() => {})
    .finally(() => {
      logout()
      console.log('User logged out (Firebase + local store).')
    })
})
</script>

<style scoped></style>
