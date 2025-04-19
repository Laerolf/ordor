export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  isAvailable: boolean
  ingredients: string[]
  allergens: string[]
}

export interface OrderItem {
  id: string
  menuItemId: string
  quantity: number
  specialInstructions?: string
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled'
}

export interface Order {
  id: string
  tableId: string
  items: OrderItem[]
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  createdAt: Date
  updatedAt: Date
  totalAmount: number
  paymentStatus: 'pending' | 'paid' | 'refunded'
}

export interface Table {
  id: string
  number: number
  capacity: number
  status: 'available' | 'occupied' | 'reserved' | 'cleaning'
  currentOrderId?: string
}

export interface Staff {
  id: string
  name: string
  role: 'admin' | 'manager' | 'server' | 'kitchen'
  email: string
  isActive: boolean
}

export interface InventoryItem {
  id: string
  name: string
  quantity: number
  unit: string
  minimumQuantity: number
  supplier: string
  lastRestocked: Date
} 