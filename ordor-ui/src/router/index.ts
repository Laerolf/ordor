import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '@/views/MenuView.vue'
import OrderView from '@/views/OrderView.vue'
import OrderManagementView from '@/views/OrderManagementView.vue'
import MenuManagementView from '@/views/MenuManagementView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'menu',
      component: MenuView
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView
    },
    {
      path: '/order-management',
      name: 'order-management',
      component: OrderManagementView
    },
    {
      path: '/menu-management',
      name: 'menu-management',
      component: MenuManagementView
    }
  ]
})

export default router
