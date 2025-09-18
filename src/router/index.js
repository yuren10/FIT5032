import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import { isAuthenticated } from '../stores/auth'
import FirebaseSigninView from '../components/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import AddBookView from '../views/AddBookView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView, meta: { requiresAuth: true } },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/denied', name: 'Denied', component: AccessDenied },
  { path: '/firelogin', name: 'FireLogin', component: FirebaseSigninView },
  { path: '/fireRegister', name: 'FireRegister', component: FirebaseRegisterView },
  { path: '/addbook', name: 'AddBook', component: AddBookView },
  { path: '/logout', name: 'Logout', component: LogoutView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    return { name: 'Login' }
  }
  return true
})

export default router
