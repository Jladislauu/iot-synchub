// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { 
      path: '/dashboard', 
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

export default router