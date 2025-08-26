<template>
  <div class="container">
    <div
      class="d-flex align-items-center justify-content-center"
      style="min-height: calc(100vh - 120px)"
    >
      <div class="row w-100 justify-content-center">
        <div class="col-md-6">
          <h2 class="mb-3 text-center">Member Login</h2>
          <div class="card p-4 shadow-sm">
            <div class="row g-3">
              <div class="col-12">
                <label for="username" class="form-label">Username</label>
                <input id="username" type="text" class="form-control" v-model="username" />
              </div>
              <div class="col-12">
                <label for="password" class="form-label">Password</label>
                <input id="password" type="password" class="form-control" v-model="password" />
              </div>
              <div class="col-12">
                <button class="btn btn-primary w-100" @click="onLogin">Login</button>
              </div>
            </div>
            <div v-if="error" class="text-danger mt-2 text-center">{{ error }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { login } from '../stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const error = ref('')

const onLogin = () => {
  error.value = ''
  const ok = login(username.value, password.value)
  if (ok) {
    router.push({ name: 'About' })
  } else {
    error.value = 'Invalid username or password.'
  }
}
</script>

<style scoped></style>
