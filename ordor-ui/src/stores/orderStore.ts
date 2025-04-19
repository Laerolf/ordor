import { defineStore } from 'pinia'
import type { MenuItem } from '@/types/menu'

interface OrderItem {
  menuItem: MenuItem
  quantity: number
  tableNumber: string
}

interface OrderState {
  items: OrderItem[]
  currentTableNumber: string | null
}

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    items: [],
    currentTableNumber: null
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
      this.currentTableNumber = tableNumber
    },

    addItem(menuItem: MenuItem, quantity: number = 1) {
      if (!this.currentTableNumber) {
        throw new Error('テーブル番号が設定されていません')
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
    },

    removeItem(menuItemId: string, tableNumber: string) {
      this.items = this.items.filter(
        (item) => !(item.menuItem.id === menuItemId && item.tableNumber === tableNumber)
      )
    },

    updateQuantity(menuItemId: string, tableNumber: string, quantity: number) {
      const item = this.items.find(
        (item) => item.menuItem.id === menuItemId && item.tableNumber === tableNumber
      )

      if (item) {
        item.quantity = quantity
      }
    },

    clearCart(tableNumber: string) {
      this.items = this.items.filter((item) => item.tableNumber !== tableNumber)
    },

    submitOrder(tableNumber: string) {
      // TODO: APIを呼び出して注文を送信
      console.log('注文を送信:', this.itemsByTable[tableNumber])
      this.clearCart(tableNumber)
    }
  }
})
