import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/menu'
import { setError, handleApiError } from '@/utils/errorHandler'
import { ApiService } from '@/services/api'
import type { Order } from '@/types/order'

interface OrderItem {
  menuItem: MenuItem
  quantity: number
  tableNumber: string
}

interface OrderState {
  items: OrderItem[]
  currentTableNumber: string | null
  isLoading: boolean
  error: string | null
  orders: Order[]
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    items: [],
    currentTableNumber: null,
    isLoading: false,
    error: null,
    orders: []
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    totalAmount: (state) => {
      return state.items.reduce((total, item) => {
        return total + item.menuItem.price * item.quantity
      }, 0)
    },

    itemsByTable: (state) => {
      const tableGroups: Record<string, OrderItem[]> = {}

      state.items.forEach((item) => {
        if (!tableGroups[item.tableNumber]) {
          tableGroups[item.tableNumber] = []
        }
        tableGroups[item.tableNumber].push(item)
      })

      return tableGroups
    }
  },

  actions: {
    setTableNumber(tableNumber: string) {
      if (!tableNumber.trim()) {
        setError({
          message: 'テーブル番号を入力してください',
          code: 'VALIDATION_ERROR'
        })
        return
      }
      this.currentTableNumber = tableNumber
    },

    addItem(menuItem: MenuItem, quantity: number = 1) {
      try {
        if (!this.currentTableNumber) {
          throw new Error('テーブル番号が設定されていません')
        }

        if (quantity < 1) {
          throw new Error('数量は1以上を指定してください')
        }

        const existingItem = this.items.find(
          (item) => item.menuItem.id === menuItem.id && item.tableNumber === this.currentTableNumber
        )

        if (existingItem) {
          existingItem.quantity += quantity
        } else {
          this.items.push({
            menuItem,
            quantity,
            tableNumber: this.currentTableNumber
          })
        }
      } catch (error) {
        setError(handleApiError(error))
      }
    },

    removeItem(menuItemId: string, tableNumber: string) {
      try {
        this.items = this.items.filter(
          (item) => !(item.menuItem.id === menuItemId && item.tableNumber === tableNumber)
        )
      } catch (error) {
        setError(handleApiError(error))
      }
    },

    updateQuantity(menuItemId: string, tableNumber: string, quantity: number) {
      try {
        if (quantity < 1) {
          throw new Error('数量は1以上を指定してください')
        }

        const item = this.items.find(
          (item) => item.menuItem.id === menuItemId && item.tableNumber === tableNumber
        )

        if (item) {
          item.quantity = quantity
        } else {
          throw new Error('指定された商品が見つかりません')
        }
      } catch (error) {
        setError(handleApiError(error))
      }
    },

    clearCart(tableNumber: string) {
      try {
        this.items = this.items.filter((item) => item.tableNumber !== tableNumber)
      } catch (error) {
        setError(handleApiError(error))
      }
    },

    async submitOrder(tableNumber: string) {
      try {
        this.isLoading = true
        this.error = null

        const orderItems = this.itemsByTable[tableNumber]
        if (!orderItems || orderItems.length === 0) {
          throw new Error('注文する商品がありません')
        }

        const orderRequest = {
          tableNumber,
          items: orderItems.map(item => ({
            menuItemId: item.menuItem.id,
            quantity: item.quantity
          }))
        }

        const order = await ApiService.createOrder(orderRequest)
        this.orders.push(order)
        this.clearCart(tableNumber)
      } catch (error) {
        this.error = error instanceof Error ? error.message : '注文の送信に失敗しました'
        setError(handleApiError(error))
      } finally {
        this.isLoading = false
      }
    },

    async fetchOrders() {
      try {
        this.isLoading = true
        this.error = null
        this.orders = await ApiService.getOrders()
      } catch (error) {
        this.error = error instanceof Error ? error.message : '注文の取得に失敗しました'
        setError(handleApiError(error))
      } finally {
        this.isLoading = false
      }
    },

    async updateOrderStatus(orderId: string, status: string) {
      try {
        this.isLoading = true
        this.error = null

        const updatedOrder = await ApiService.updateOrderStatus(orderId, status)
        const index = this.orders.findIndex(order => order.id === orderId)
        if (index !== -1) {
          this.orders[index] = updatedOrder
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : '注文ステータスの更新に失敗しました'
        setError(handleApiError(error))
      } finally {
        this.isLoading = false
      }
    }
  }
})
