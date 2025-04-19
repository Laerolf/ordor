import { apiClient } from '@/utils/apiClient'
import type { MenuItem } from '@/types/menu'
import type { Order } from '@/types/order'

interface MenuResponse {
  items: MenuItem[]
}

interface OrderResponse {
  order: Order
}

interface CreateOrderRequest {
  tableNumber: string
  items: {
    menuItemId: string
    quantity: number
  }[]
}

export class ApiService {
  // メニュー関連のAPI
  static async getMenuItems(): Promise<MenuItem[]> {
    const response = await apiClient.get<MenuResponse>('/menu')
    return response.data.items
  }

  static async createMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    const response = await apiClient.post<{ item: MenuItem }>('/menu', item)
    return response.data.item
  }

  static async updateMenuItem(id: string, item: Partial<MenuItem>): Promise<MenuItem> {
    const response = await apiClient.put<{ item: MenuItem }>(`/menu/${id}`, item)
    return response.data.item
  }

  static async deleteMenuItem(id: string): Promise<void> {
    await apiClient.delete(`/menu/${id}`)
  }

  // 注文関連のAPI
  static async createOrder(request: CreateOrderRequest): Promise<Order> {
    const response = await apiClient.post<OrderResponse>('/orders', request)
    return response.data.order
  }

  static async getOrders(): Promise<Order[]> {
    const response = await apiClient.get<{ orders: Order[] }>('/orders')
    return response.data.orders
  }

  static async updateOrderStatus(orderId: string, status: string): Promise<Order> {
    const response = await apiClient.put<OrderResponse>(`/orders/${orderId}/status`, { status })
    return response.data.order
  }
} 