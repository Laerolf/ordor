import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/staff',
      name: 'staff',
      component: () => import('../views/StaffView.vue'),
      children: [
        {
          path: 'tables',
          name: 'tables',
          component: () => import('../views/staff/TablesView.vue')
        },
        {
          path: 'orders',
          name: 'staff-orders',
          component: () => import('../views/staff/OrdersView.vue')
        },
        {
          path: 'inventory',
          name: 'inventory',
          component: () => import('../views/staff/InventoryView.vue')
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      children: [
        {
          path: 'menu-management',
          name: 'menu-management',
          component: () => import('../views/admin/MenuManagementView.vue')
        },
        {
          path: 'staff-management',
          name: 'staff-management',
          component: () => import('../views/admin/StaffManagementView.vue')
        },
        {
          path: 'reports',
          name: 'reports',
          component: () => import('../views/admin/ReportsView.vue')
        }
      ]
    }
  ]
})

export default router
