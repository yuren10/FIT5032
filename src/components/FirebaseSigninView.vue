<template>
  <div class="container" style="max-width: 480px">
    <h1 class="my-4 text-center">Sign in</h1>
    <div class="card">
      <div class="card-body">
        <p>
          <input type="text" placeholder="Email" v-model="email" class="form-control" />
        </p>
        <p>
          <input type="password" placeholder="Password" v-model="password" class="form-control" />
        </p>
        <p>
          <button class="btn btn-primary w-100" @click="signin">Sign in via Firebase</button>
        </p>
        <div v-if="errorMessage" class="alert alert-danger mt-3">
          {{ errorMessage }}
        </div>
        <div v-if="successMessage" class="alert alert-success mt-3">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { setFirebaseUserByEmail } from '../stores/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()
const auth = getAuth()

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Sign In Successful!')
      // Minimal role assignment based on email prefix
      setFirebaseUserByEmail(email.value)
      successMessage.value = 'Firebase authentication successful!'
      errorMessage.value = ''
      setTimeout(() => {
        router.push('/')
      }, 1500)
    })
    .catch((error) => {
      console.log(error.code)
      errorMessage.value = `Authentication failed: ${error.message}`
      successMessage.value = ''
    })
}
</script>
