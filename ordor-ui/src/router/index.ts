import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import OrderView from '../views/OrderView.vue'
import UserView from '../views/UserView.vue'
import PaymentView from '../views/PaymentView.vue'

const routes = [
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
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
