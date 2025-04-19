export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
  allergens: string[]
  isAvailable: boolean
  preparationTime: number // 分単位
}

export interface MenuCategory {
  id: string
  name: string
  description?: string
}

export interface OrderItem extends MenuItem {
  quantity: number
  specialInstructions?: string
}

export interface Order {
  id: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  tableNumber: number
  createdAt: Date
  updatedAt: Date
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  IN_PREPARATION = 'IN_PREPARATION',
  READY = 'READY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
} 