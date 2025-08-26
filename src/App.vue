<script setup>
import { isAuthenticated, logout, currentUser } from './stores/auth'
import { useRouter } from 'vue-router'
const router = useRouter()
const onLogout = () => {
  logout()
  router.push({ name: 'Login' })
}
</script>

<template>
  <!-- Top centered fixed navbar -->
  <nav class="navbar navbar-light bg-light fixed-top border-bottom">
    <div class="container justify-content-center">
      <ul class="nav nav-pills align-items-center">
        <li class="nav-item me-2">
          <router-link to="/" class="nav-link" active-class="active">Home</router-link>
        </li>
        <li class="nav-item me-2">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
        <li class="nav-item ms-3" v-if="!isAuthenticated">
          <router-link class="btn btn-outline-primary btn-sm" to="/login">Login</router-link>
        </li>
        <li class="nav-item ms-3" v-else>
          <span class="me-2">Welcome, {{ currentUser && currentUser.username }}</span>
          <button class="btn btn-outline-danger btn-sm" @click="onLogout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>

  <!-- Routed content with top padding so it doesn't hide behind fixed navbar -->
  <div class="container" style="padding-top: 80px">
    <router-view />
  </div>
</template>

<style scoped></style>
