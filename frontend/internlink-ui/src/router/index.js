import { createRouter, createWebHistory } from 'vue-router'
import ApplicationPage from '../pages/ApplicationPage.vue'
import Home from '../pages/Home.vue'
import InternshipPage from '../pages/InternshipPage.vue'

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
    path: '/applications',
    component: ApplicationPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router