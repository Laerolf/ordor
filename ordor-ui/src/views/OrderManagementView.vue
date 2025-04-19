<template>
  <div class="management-view">
    <h1>注文管理</h1>

    <div class="orders-list">
      <div v-for="order in activeOrders" :key="order.id" class="order-card">
        <div class="order-header">
          <h2>テーブル {{ order.tableNumber }}</h2>
          <span class="order-time">{{ formatDate(order.createdAt) }}</span>
        </div>

        <div class="order-items">
          <div v-for="item in order.items" :key="item.menuItem.id" class="order-item">
            <span class="item-name">{{ item.menuItem.name }}</span>
            <span class="item-quantity">x{{ item.quantity }}</span>
          </div>
        </div>

        <div class="order-footer">
          <span class="total-amount">合計: ¥{{ order.totalAmount.toLocaleString() }}</span>
          <div class="status-controls">
            <select v-model="order.status" @change="updateStatus(order.id, order.status)">
              <option v-for="status in orderStatuses" :key="status" :value="status">
                {{ getStatusName(status) }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore'
import { OrderStatus } from '@/types/order'

const orderStore = useOrderStore()
const activeOrders = orderStore.activeOrders
const orderStatuses = Object.values(OrderStatus)

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString('ja-JP')
}

const getStatusName = (status: OrderStatus): string => {
  const names: Record<OrderStatus, string> = {
    [OrderStatus.NEW]: '新規',
    [OrderStatus.PREPARING]: '準備中',
    [OrderStatus.SERVED]: '提供済み',
    [OrderStatus.PAID]: '会計済み'
  }
  return names[status]
}

const updateStatus = (orderId: string, status: OrderStatus) => {
  orderStore.updateOrderStatus(orderId, status)
}
</script>

<style scoped>
.management-view {
  padding: 20px;
}

.orders-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.order-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  background: white;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.order-header h2 {
  margin: 0;
}

.order-time {
  color: #666;
  font-size: 0.9em;
}

.order-items {
  margin-bottom: 16px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.order-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.total-amount {
  font-weight: bold;
  font-size: 1.1em;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
}

select:focus {
  outline: none;
  border-color: #4caf50;
}
</style>
