<template>
  <div class="order-history">
    <h1>注文履歴</h1>
    
    <div class="filters">
      <div class="filter-group">
        <label for="status">ステータス:</label>
        <select id="status" v-model="selectedStatus">
          <option value="">すべて</option>
          <option value="pending">処理中</option>
          <option value="completed">完了</option>
          <option value="cancelled">キャンセル</option>
        </select>
      </div>
      
      <div class="filter-group">
        <label for="date">期間:</label>
        <select id="date" v-model="selectedDate">
          <option value="7">過去7日間</option>
          <option value="30">過去30日間</option>
          <option value="90">過去90日間</option>
        </select>
      </div>
    </div>

    <div class="order-list">
      <div v-if="filteredOrders.length === 0" class="no-orders">
        注文履歴がありません。
      </div>
      
      <div v-else v-for="order in filteredOrders" :key="order.id" class="order-card">
        <div class="order-header">
          <div class="order-id">注文ID: {{ order.id }}</div>
          <div class="order-date">{{ formatDate(order.createdAt) }}</div>
        </div>
        
        <div class="order-summary">
          <div class="order-status" :class="order.status">
            {{ getStatusText(order.status) }}
          </div>
          <div class="order-total">
            合計: {{ formatPrice(order.totalAmount) }}円
          </div>
        </div>
        
        <div class="order-items-preview">
          <div v-for="item in order.items.slice(0, 2)" :key="item.id" class="preview-item">
            {{ item.name }} × {{ item.quantity }}
          </div>
          <div v-if="order.items.length > 2" class="more-items">
            +{{ order.items.length - 2 }}件
          </div>
        </div>
        
        <button class="view-detail-button" @click="showOrderDetail(order)">
          詳細を見る
        </button>
      </div>
    </div>

    <OrderHistoryDetail
      v-if="selectedOrder"
      :order="selectedOrder"
      @close="selectedOrder = null"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { formatDate, formatPrice } from '@/utils/formatters';
import { Order, getStatusText } from '@/types/order';
import OrderHistoryDetail from '@/components/OrderHistoryDetail.vue';

// ダミーデータ（実際のアプリケーションではAPIから取得）
const orders = ref<Order[]>([
  {
    id: 'ORD-001',
    createdAt: '2024-03-20T10:30:00',
    totalAmount: 3500,
    status: 'completed',
    items: [
      { id: '1', name: 'ハンバーガー', quantity: 2, price: 800 },
      { id: '2', name: 'フライドポテト', quantity: 1, price: 400 },
      { id: '3', name: 'コーラ', quantity: 2, price: 300 }
    ],
    customerName: '山田太郎',
    customerPhone: '090-1234-5678',
    customerEmail: 'yamada@example.com'
  },
  // 他の注文データ...
]);

const selectedStatus = ref('');
const selectedDate = ref('30');
const selectedOrder = ref<Order | null>(null);

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const statusMatch = !selectedStatus.value || order.status === selectedStatus.value;
    const dateMatch = true; // 実際のアプリケーションでは日付フィルタリングを実装
    return statusMatch && dateMatch;
  });
});

const showOrderDetail = (order: Order) => {
  selectedOrder.value = order;
};
</script>

<style scoped>
.order-history {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-group select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.order-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.order-card {
  background-color: white;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-id {
  font-weight: bold;
}

.order-date {
  color: #666;
}

.order-summary {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.order-status.pending {
  background-color: #fff3cd;
  color: #856404;
}

.order-status.completed {
  background-color: #d4edda;
  color: #155724;
}

.order-status.cancelled {
  background-color: #f8d7da;
  color: #721c24;
}

.order-items-preview {
  margin-bottom: 15px;
  color: #666;
}

.preview-item {
  margin-bottom: 5px;
}

.more-items {
  color: #999;
  font-size: 0.9em;
}

.view-detail-button {
  width: 100%;
  padding: 8px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-detail-button:hover {
  background-color: #0056b3;
}

.no-orders {
  text-align: center;
  padding: 40px;
  color: #666;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style> 