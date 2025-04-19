import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Order, OrderItem, OrderStatus } from '@/types/menu'
import { useMenuStore } from './menu'
import { useOrderHistoryStore } from './orderHistory'

export const useOrderStore = defineStore('order', () => {
  const menuStore = useMenuStore()
  const currentOrder = ref<Order | null>(null)
  const orderHistory = ref<Order[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // カートの合計金額
  const totalAmount = computed(() => {
    if (!currentOrder.value) return 0
    return currentOrder.value.items.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  })

  // カートの商品数
  const itemCount = computed(() => {
    if (!currentOrder.value) return 0
    return currentOrder.value.items.reduce((total, item) => {
      return total + item.quantity
    }, 0)
  })

  // 新しい注文の作成
  const createOrder = (tableNumber: number) => {
    currentOrder.value = {
      id: `order-${Date.now()}`,
      items: [],
      totalAmount: 0,
      status: OrderStatus.PENDING,
      tableNumber,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  // カートに商品を追加
  const addToCart = (item: OrderItem) => {
    if (!currentOrder.value) {
      createOrder(1) // デフォルトのテーブル番号
    }

    const existingItem = currentOrder.value!.items.find(i => i.id === item.id)
    if (existingItem) {
      existingItem.quantity += item.quantity
    } else {
      currentOrder.value!.items.push(item)
    }
    
    updateOrderTotal()
  }

  // カートから商品を削除
  const removeFromCart = (itemId: string) => {
    if (!currentOrder.value) return

    currentOrder.value.items = currentOrder.value.items.filter(
      item => item.id !== itemId
    )
    
    updateOrderTotal()
  }

  // 商品の数量を更新
  const updateItemQuantity = (itemId: string, quantity: number) => {
    if (!currentOrder.value) return

    const item = currentOrder.value.items.find(i => i.id === itemId)
    if (item) {
      item.quantity = quantity
      updateOrderTotal()
    }
  }

  // 注文の合計金額を更新
  const updateOrderTotal = () => {
    if (!currentOrder.value) return
    currentOrder.value.totalAmount = totalAmount.value
    currentOrder.value.updatedAt = new Date()
  }

  // 注文を確定（スタブ）
  const confirmOrder = async () => {
    if (!currentOrder.value) return

    isLoading.value = true
    error.value = null

    try {
      // APIコール（スタブ）
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      currentOrder.value.status = OrderStatus.CONFIRMED
      orderHistory.value.push({ ...currentOrder.value })
      currentOrder.value = null
    } catch (e) {
      error.value = '注文の確定に失敗しました'
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  // 注文履歴の取得（スタブ）
  const fetchOrderHistory = async () => {
    isLoading.value = true
    error.value = null

    try {
      // APIコール（スタブ）
      await new Promise(resolve => setTimeout(resolve, 1000))
      // 実際のAPIからデータを取得する
    } catch (e) {
      error.value = '注文履歴の取得に失敗しました'
      console.error(e)
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
    totalAmount,
    itemCount,
    createOrder,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    confirmOrder,
    fetchOrderHistory,
    completeOrder
  }
}) 