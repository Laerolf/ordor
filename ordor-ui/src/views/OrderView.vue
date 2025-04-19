<template>
  <div class="order-view">
    <h1>注文カート</h1>

    <div v-if="!orderStore.currentTableNumber" class="table-selection">
      <h2>テーブル番号を選択</h2>
      <div class="table-input">
        <input
          v-model="tableNumber"
          type="text"
          placeholder="テーブル番号を入力"
          @keyup.enter="selectTable"
        />
        <button @click="selectTable">選択</button>
      </div>
    </div>

    <div v-else class="order-content">
      <div class="table-info">
        <h2>テーブル {{ orderStore.currentTableNumber }}</h2>
        <button class="change-table" @click="changeTable">テーブルを変更</button>
      </div>

      <div v-if="currentTableItems.length === 0" class="empty-cart">
        <p>カートに商品がありません</p>
        <router-link to="/" class="browse-menu">メニューを見る</router-link>
      </div>

      <div v-else class="cart-items">
        <div v-for="item in currentTableItems" :key="item.menuItem.id" class="cart-item">
          <div class="item-info">
            <h3>{{ item.menuItem.name }}</h3>
            <p class="price">¥{{ item.menuItem.price.toLocaleString() }}</p>
          </div>

          <div class="quantity-control">
            <button @click="updateQuantity(item.menuItem.id, item.quantity - 1)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="updateQuantity(item.menuItem.id, item.quantity + 1)">+</button>
          </div>

          <button class="remove-button" @click="removeItem(item.menuItem.id)">削除</button>
        </div>

        <div class="order-summary">
          <div class="summary-row">
            <span>合計数量:</span>
            <span>{{ orderStore.totalItems }}個</span>
          </div>
          <div class="summary-row total">
            <span>合計金額:</span>
            <span>¥{{ orderStore.totalAmount.toLocaleString() }}</span>
          </div>
        </div>

        <div class="order-actions">
          <button class="submit-order" @click="submitOrder">注文を確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'

const router = useRouter()
const orderStore = useOrderStore()
const tableNumber = ref('')

const currentTableItems = computed(() => {
  if (!orderStore.currentTableNumber) return []
  return orderStore.itemsByTable[orderStore.currentTableNumber] || []
})

const selectTable = () => {
  if (tableNumber.value.trim()) {
    orderStore.setTableNumber(tableNumber.value.trim())
  }
}

const changeTable = () => {
  orderStore.setTableNumber('')
  tableNumber.value = ''
}

const updateQuantity = (menuItemId: string, newQuantity: number) => {
  if (newQuantity < 1) return
  orderStore.updateQuantity(menuItemId, orderStore.currentTableNumber!, newQuantity)
}

const removeItem = (menuItemId: string) => {
  orderStore.removeItem(menuItemId, orderStore.currentTableNumber!)
}

const submitOrder = () => {
  if (currentTableItems.value.length === 0) return

  orderStore.submitOrder(orderStore.currentTableNumber!)
  router.push('/')
}
</script>

<style scoped>
.order-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.table-selection {
  text-align: center;
  margin: 2rem 0;
}

.table-input {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.table-input input {
  padding: 0.5rem;
  font-size: 1.2rem;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.table-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.change-table {
  background: #f44336;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

.empty-cart {
  text-align: center;
  padding: 3rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.browse-menu {
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: #4caf50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.cart-items {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-info {
  flex-grow: 1;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 1rem;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: #f5f5f5;
  color: #333;
}

.remove-button {
  background: #f44336;
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
}

.order-summary {
  margin-top: 2rem;
  padding: 1rem;
  background: #f5f5f5;
  border-radius: 4px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #ddd;
}

.order-actions {
  margin-top: 2rem;
  text-align: center;
}

.submit-order {
  background: #4caf50;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 4px;
  width: 100%;
}

button {
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.3s ease;
}

button:hover {
  opacity: 0.9;
}
</style>
