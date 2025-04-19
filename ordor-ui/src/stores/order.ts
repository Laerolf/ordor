import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Order, OrderItem, OrderHistory } from '@/types'
import { useMenuStore } from './menu'
import { useOrderHistoryStore } from './orderHistory'

export const useOrderStore = defineStore('order', () => {
  const menuStore = useMenuStore()
  const currentOrder = ref<Order | null>(null)
  const orderHistory = ref<Order[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const addItemToOrder = (menuItemId: string, quantity: number = 1, specialInstructions?: string) => {
    if (!currentOrder.value) {
      currentOrder.value = {
        id: Date.now().toString(),
        tableId: '1', // TODO: テーブル選択機能を実装
        items: [],
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date(),
        totalAmount: 0,
        paymentStatus: 'pending'
      }
    }

    const menuItem = menuStore.getMenuItemById(menuItemId)
    if (!menuItem) {
      error.value = 'メニューアイテムが見つかりません'
      return
    }

    const orderItem: OrderItem = {
      id: Date.now().toString(),
      menuItemId,
      quantity,
      specialInstructions,
      status: 'pending'
    }

    currentOrder.value.items.push(orderItem)
    currentOrder.value.totalAmount += menuItem.price * quantity
    currentOrder.value.updatedAt = new Date()
  }

  const removeItemFromOrder = (orderItemId: string) => {
    if (!currentOrder.value) return

    const itemIndex = currentOrder.value.items.findIndex(item => item.id === orderItemId)
    if (itemIndex === -1) return

    const item = currentOrder.value.items[itemIndex]
    const menuItem = menuStore.getMenuItemById(item.menuItemId)
    if (menuItem) {
      currentOrder.value.totalAmount -= menuItem.price * item.quantity
    }

    currentOrder.value.items.splice(itemIndex, 1)
    currentOrder.value.updatedAt = new Date()
  }

  const updateItemQuantity = (orderItemId: string, quantity: number) => {
    if (!currentOrder.value) return

    const item = currentOrder.value.items.find(item => item.id === orderItemId)
    if (!item) return

    const menuItem = menuStore.getMenuItemById(item.menuItemId)
    if (!menuItem) return

    const oldTotal = menuItem.price * item.quantity
    const newTotal = menuItem.price * quantity

    item.quantity = quantity
    currentOrder.value.totalAmount += newTotal - oldTotal
    currentOrder.value.updatedAt = new Date()
  }

  const submitOrder = async () => {
    if (!currentOrder.value) return

    isLoading.value = true
    error.value = null

    try {
      // TODO: API呼び出しを実装
      // const response = await fetch('/api/orders', {
      //   method: 'POST',
      //   body: JSON.stringify(currentOrder.value)
      // })
      // const savedOrder = await response.json()
      
      currentOrder.value.status = 'confirmed'
      orderHistory.value.push({ ...currentOrder.value })
      currentOrder.value = null
    } catch (err) {
      error.value = '注文の送信に失敗しました'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const generateOrderId = () => {
    return Date.now().toString()
  }

  const completeOrder = () => {
    const orderHistoryStore = useOrderHistoryStore()
    const orderHistory: OrderHistory = {
      id: generateOrderId(),
      items: [...currentOrder.value?.items || []],
      totalAmount: currentOrder.value?.totalAmount || 0,
      status: 'completed',
      createdAt: new Date().toISOString(),
      completedAt: new Date().toISOString()
    }
    
    orderHistoryStore.addOrderHistory(orderHistory)
    currentOrder.value = null
  }

  return {
    currentOrder,
    orderHistory,
    isLoading,
    error,
    addItemToOrder,
    removeItemFromOrder,
    updateItemQuantity,
    submitOrder,
    completeOrder
  }
}) 