import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import InternshipPage from '../pages/InternshipPage.vue'
import AuthPage from '../pages/AuthPage.vue'
import ForgotPassword from '../pages/ForgotPassword.vue'
import ResetPassword from '../pages/ResetPassword.vue'
import Dashboard from '../pages/Dashboard.vue'
import { authState } from '../services/auth'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/internships',
    component: InternshipPage
  },
  {
    path: '/auth',
    component: AuthPage,
    meta: { guestOnly: true }
  },
  {
    path: '/forgot-password',
    component: ForgotPassword,
    meta: { guestOnly: true }
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    meta: { guestOnly: true }
  },
  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !authState.token) {
    return '/auth'
  }

  if (to.meta.guestOnly && authState.token) {
    return '/dashboard'
  }

  return true
})

export default router
