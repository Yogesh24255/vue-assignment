import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/components/LoginPage.vue'
import { auth } from '@/main'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/sign-in',
      name: 'home',
      component: LoginPage,
    },
    {
      path: '/',
      redirect: '/sign-in',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/components/DashboardPage.vue'),
      meta: {
        requiresAuth: true
      }
    },
  ],
})
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        next()
      } else {
        next('/sign-in')
      }
    })
  } else {
    next()
  }
})
export default router
