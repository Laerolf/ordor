<template>
  <div class="order-history-detail">
    <div class="header">
      <h2>注文詳細</h2>
      <button class="close-button" @click="$emit('close')">×</button>
    </div>
    
    <div class="order-info">
      <div class="info-row">
        <span class="label">注文ID:</span>
        <span class="value">{{ order.id }}</span>
      </div>
      <div class="info-row">
        <span class="label">注文日時:</span>
        <span class="value">{{ formatDate(order.createdAt) }}</span>
      </div>
      <div class="info-row">
        <span class="label">合計金額:</span>
        <span class="value">{{ formatPrice(order.totalAmount) }}円</span>
      </div>
      <div class="info-row">
        <span class="label">ステータス:</span>
        <span class="value">{{ order.status }}</span>
      </div>
    </div>

    <div class="order-items">
      <h3>注文内容</h3>
      <div v-for="item in order.items" :key="item.id" class="order-item">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-quantity">×{{ item.quantity }}</span>
        <span class="item-price">{{ formatPrice(item.price * item.quantity) }}円</span>
      </div>
    </div>

    <div class="customer-info">
      <h3>お客様情報</h3>
      <div class="info-row">
        <span class="label">お名前:</span>
        <span class="value">{{ order.customerName }}</span>
      </div>
      <div class="info-row">
        <span class="label">電話番号:</span>
        <span class="value">{{ order.customerPhone }}</span>
      </div>
      <div class="info-row">
        <span class="label">メールアドレス:</span>
        <span class="value">{{ order.customerEmail }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { formatDate, formatPrice } from '@/utils/formatters';

const props = defineProps<{
  order: {
    id: string;
    createdAt: string;
    totalAmount: number;
    status: string;
    items: Array<{
      id: string;
      name: string;
      quantity: number;
      price: number;
    }>;
    customerName: string;
    customerPhone: string;
    customerEmail: string;
  };
}>();

defineEmits<{
  (e: 'close'): void;
}>();
</script>

<style scoped>
.order-history-detail {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
}

.info-row {
  display: flex;
  margin-bottom: 10px;
}

.label {
  width: 120px;
  color: #666;
}

.value {
  flex: 1;
}

.order-items {
  margin: 20px 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.item-name {
  flex: 1;
}

.item-quantity {
  margin: 0 20px;
}

.customer-info {
  margin-top: 20px;
}
</style> 