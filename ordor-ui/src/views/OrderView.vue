<template>
  <div class="order-view">
    <h1>テーブル {{ tableId }} の注文</h1>

    <div v-if="currentOrder" class="order-details">
      <div class="order-items">
        <div v-for="item in currentOrder.items" :key="item.menuItem.id" class="order-item">
          <h3>{{ item.menuItem.name }}</h3>
          <p>数量: {{ item.quantity }}</p>
          <p>価格: ¥{{ (item.menuItem.price * item.quantity).toLocaleString() }}</p>
          <p v-if="item.specialRequests">特別な要望: {{ item.specialRequests }}</p>
        </div>
      </div>

      <div class="order-summary">
        <h2>合計金額: ¥{{ currentOrder.totalAmount.toLocaleString() }}</h2>
        <button @click="submitOrder" class="submit-button">注文を確定</button>
      </div>
    </div>

    <div v-else class="no-order">
      <p>注文がありません</p>
      <button @click="goToMenu">メニューに戻る</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useOrderStore } from '@/stores/orderStore';

const route = useRoute();
const router = useRouter();
const orderStore = useOrderStore();

const tableId = route.params.tableId as string;

onMounted(() => {
  if (!orderStore.currentOrder) {
    orderStore.createOrder(parseInt(tableId));
  }
});

const currentOrder = orderStore.currentOrder;

const submitOrder = () => {
  orderStore.submitOrder();
  router.push('/management');
};

const goToMenu = () => {
  router.push('/');
};
</script>

<style scoped>
.order-view {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.order-details {
  margin-top: 20px;
}

.order-items {
  margin-bottom: 20px;
}

.order-item {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
}

.order-item h3 {
  margin: 0 0 10px 0;
}

.order-summary {
  border-top: 2px solid #ddd;
  padding-top: 20px;
  text-align: right;
}

.submit-button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-size: 1.1em;
  cursor: pointer;
  margin-top: 10px;
}

.submit-button:hover {
  background: #45a049;
}

.no-order {
  text-align: center;
  margin-top: 40px;
}

button {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #45a049;
}
</style> 