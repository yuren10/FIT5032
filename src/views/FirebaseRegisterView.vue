<template>
  <div class="container" style="max-width: 480px">
    <h1 class="my-4 text-center">Create an Account</h1>
    <div class="card">
      <div class="card-body">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" class="form-control" v-model="email" placeholder="Email" />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" v-model="password" placeholder="Password" />
        </div>
        <button class="btn btn-primary w-100" @click="register">Save to Firebase</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const router = useRouter()
const auth = getAuth()

const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(() => {
      console.log('Firebase Register Successful!')
      router.push('/firelogin')
    })
    .catch((error) => {
      console.log(error.code)
    })
}
</script>
