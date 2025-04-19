import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: () => import('@/views/MenuView.vue')
    },
    {
      path: '/order/:tableId',
      name: 'order',
      component: () => import('@/views/OrderView.vue')
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('@/views/OrderManagementView.vue')
    }
  ]
})

export default router
